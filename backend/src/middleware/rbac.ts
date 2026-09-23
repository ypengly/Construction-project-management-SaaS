import type { RoleName } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors.js";

/**
 * Restricts a route to a fixed set of roles. Use for coarse checks
 * ("only Owner/Accountant can void an invoice"). Finer-grained,
 * per-resource checks (e.g. a Site Supervisor may only touch their
 * assigned projects) belong in the controller/service layer, where
 * the specific resource is loaded and can be checked against req.auth.
 */
export function requireRole(...roles: RoleName[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.auth) return next(AppError.unauthorized());
    if (!roles.includes(req.auth.role)) {
      return next(AppError.forbidden(`Requires one of: ${roles.join(", ")}`));
    }
    next();
  };
}
