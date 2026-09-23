import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { prisma } from "../utils/prisma.js";

/**
 * Verifies the bearer access token and attaches req.auth.
 *
 * organizationId and role are taken from the token (which we signed
 * server-side at login, from the DB row) — never from any header,
 * query param, or body the client sends. This is what makes tenant
 * isolation enforceable: every downstream query filters by
 * req.auth.organizationId, and that value cannot be spoofed.
 */
export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      throw AppError.unauthorized("Missing bearer token");
    }
    const token = header.slice("Bearer ".length);
    const payload = verifyAccessToken(token);

    // Confirm the user still exists and is active — a revoked/deactivated
    // user shouldn't keep working just because their token hasn't expired.
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, isActive: true, organizationId: true, role: { select: { name: true } } },
    });
    if (!user || !user.isActive) {
      throw AppError.unauthorized("Account is not active");
    }

    req.auth = {
      userId: user.id,
      organizationId: user.organizationId,
      role: user.role.name,
    };
    next();
  } catch (err) {
    if (err instanceof AppError) return next(err);
    next(AppError.unauthorized("Invalid or expired token"));
  }
}
