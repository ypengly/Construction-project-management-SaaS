import type { Request, Response } from "express";
import * as authService from "../services/auth.service.js";
import { recordAudit } from "../utils/audit.js";

export async function registerHandler(req: Request, res: Response) {
  const result = await authService.register(req.body);
  await recordAudit({
    organizationId: result.organization.id,
    userId: result.user.id,
    action: "ORGANIZATION_REGISTERED",
    entityType: "Organization",
    entityId: result.organization.id,
  });
  res.status(201).json(result);
}

export async function loginHandler(req: Request, res: Response) {
  const result = await authService.login(req.body);
  await recordAudit({
    organizationId: result.user.organizationId,
    userId: result.user.id,
    action: "USER_LOGIN",
    entityType: "User",
    entityId: result.user.id,
  });
  res.json(result);
}

export async function refreshHandler(req: Request, res: Response) {
  const tokens = await authService.refresh(req.body.refreshToken);
  res.json(tokens);
}

export async function logoutHandler(req: Request, res: Response) {
  await authService.logout(req.body.refreshToken);
  res.status(204).send();
}

export async function forgotPasswordHandler(req: Request, res: Response) {
  const resetToken = await authService.forgotPassword(req.body.email);
  // Generic response either way; resetToken (when present) would normally
  // be emailed rather than returned here.
  res.json({
    message: "If an account with that email exists, a reset link has been sent.",
    ...(process.env.NODE_ENV !== "production" && resetToken ? { devResetToken: resetToken } : {}),
  });
}

export async function resetPasswordHandler(req: Request, res: Response) {
  await authService.resetPassword(req.body.token, req.body.password);
  res.json({ message: "Password updated. Please log in again." });
}

export async function meHandler(req: Request, res: Response) {
  res.json({ auth: req.auth });
}
