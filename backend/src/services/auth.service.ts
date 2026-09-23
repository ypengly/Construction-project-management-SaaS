import { RoleName } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { AppError } from "../utils/errors.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { prisma } from "../utils/prisma.js";

const REFRESH_TOKEN_TTL_DAYS = 7;

// Default permission sets, per the role definitions in the product spec.
// Stored as JSON on Role so they can be fine-tuned per organization later
// without a schema change.
const DEFAULT_PERMISSIONS: Record<RoleName, string[]> = {
  OWNER: ["*"],
  PROJECT_MANAGER: [
    "projects:*", "tasks:*", "workers:*", "materials:*", "expenses:*", "documents:*",
  ],
  SITE_SUPERVISOR: [
    "projects:read:assigned", "tasks:*:assigned", "workers:assign", "site-reports:*", "materials:use",
  ],
  ACCOUNTANT: ["estimates:*", "expenses:*", "invoices:*", "payments:*", "reports:financial"],
  WORKER: ["projects:read:assigned", "tasks:read:assigned", "schedule:read:assigned"],
  CLIENT: ["projects:read:own", "invoices:read:own", "payments:read:own", "documents:read:own", "estimates:read:own"],
};

async function ensureDefaultRoles(organizationId: string) {
  await Promise.all(
    Object.values(RoleName).map((name) =>
      prisma.role.upsert({
        where: { organizationId_name: { organizationId, name } },
        update: {},
        create: { organizationId, name, permissions: DEFAULT_PERMISSIONS[name] },
      })
    )
  );
}

function issueTokenPair(user: { id: string; organizationId: string; role: { name: RoleName } }) {
  const accessToken = signAccessToken({
    userId: user.id,
    organizationId: user.organizationId,
    role: user.role.name,
  });
  const refreshToken = signRefreshToken({ userId: user.id });
  return { accessToken, refreshToken };
}

async function storeRefreshToken(userId: string, refreshToken: string) {
  const tokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
  await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000),
    },
  });
}

export async function register(input: {
  organizationName: string;
  fullName: string;
  email: string;
  password: string;
}) {
  const passwordHash = await bcrypt.hash(input.password, 12);

  const result = await prisma.$transaction(async (tx) => {
    const organization = await tx.organization.create({
      data: { name: input.organizationName },
    });

    await ensureDefaultRoles(organization.id);

    const ownerRole = await tx.role.findUniqueOrThrow({
      where: { organizationId_name: { organizationId: organization.id, name: RoleName.OWNER } },
    });

    const user = await tx.user.create({
      data: {
        organizationId: organization.id,
        roleId: ownerRole.id,
        fullName: input.fullName,
        email: input.email.toLowerCase(),
        passwordHash,
      },
      include: { role: true },
    });

    return { organization, user };
  }).catch((err) => {
    if (err.code === "P2002") {
      throw AppError.conflict("An account with this email already exists");
    }
    throw err;
  });

  const tokens = issueTokenPair(result.user);
  await storeRefreshToken(result.user.id, tokens.refreshToken);

  return {
    organization: result.organization,
    user: { id: result.user.id, fullName: result.user.fullName, email: result.user.email, role: result.user.role.name },
    ...tokens,
  };
}

export async function login(input: { email: string; password: string }) {
  const user = await prisma.user.findFirst({
    where: { email: input.email.toLowerCase(), isActive: true },
    include: { role: true },
  });
  // Same error for "no such user" and "wrong password" — don't leak which one.
  if (!user) throw AppError.unauthorized("Invalid email or password");

  const valid = await bcrypt.compare(input.password, user.passwordHash);
  if (!valid) throw AppError.unauthorized("Invalid email or password");

  const tokens = issueTokenPair(user);
  await storeRefreshToken(user.id, tokens.refreshToken);

  return {
    user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role.name, organizationId: user.organizationId },
    ...tokens,
  };
}

export async function refresh(refreshToken: string) {
  let payload: { userId: string };
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw AppError.unauthorized("Invalid refresh token");
  }

  const tokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
  const stored = await prisma.refreshToken.findFirst({
    where: { userId: payload.userId, tokenHash, revokedAt: null },
  });
  if (!stored || stored.expiresAt < new Date()) {
    throw AppError.unauthorized("Refresh token expired or revoked");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: payload.userId },
    include: { role: true },
  });

  // Rotate: revoke the used token, issue a fresh pair.
  await prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } });
  const tokens = issueTokenPair(user);
  await storeRefreshToken(user.id, tokens.refreshToken);

  return tokens;
}

export async function logout(refreshToken: string) {
  const tokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
  await prisma.refreshToken.updateMany({
    where: { tokenHash, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

// Simplified reset flow: issue a short-lived signed token and hand it back.
// In production this gets emailed rather than returned to the caller.
export async function forgotPassword(email: string) {
  const user = await prisma.user.findFirst({ where: { email: email.toLowerCase() } });
  // Always succeed with no user-existence signal — the controller returns
  // a generic message regardless of whether we found an account.
  if (!user) return null;

  const resetToken = signRefreshToken({ userId: user.id }); // reuse refresh secret/shape for a bearer reset token
  return resetToken;
}

export async function resetPassword(token: string, newPassword: string) {
  let payload: { userId: string };
  try {
    payload = verifyRefreshToken(token);
  } catch {
    throw AppError.badRequest("Invalid or expired reset token");
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await prisma.$transaction([
    prisma.user.update({ where: { id: payload.userId }, data: { passwordHash } }),
    // Invalidate all existing sessions on password reset.
    prisma.refreshToken.updateMany({ where: { userId: payload.userId, revokedAt: null }, data: { revokedAt: new Date() } }),
  ]);
}
