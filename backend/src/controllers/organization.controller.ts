import type { Request, Response } from "express";
import * as orgService from "../services/organization.service.js";
import { recordAudit } from "../utils/audit.js";
import { AppError } from "../utils/errors.js";

export async function getHandler(req: Request, res: Response) {
  if (!req.auth) throw AppError.unauthorized();
  const org = await orgService.getOrganization(req.auth.organizationId);
  res.json(org);
}

export async function updateHandler(req: Request, res: Response) {
  if (!req.auth) throw AppError.unauthorized();
  const org = await orgService.updateOrganization(req.auth.organizationId, req.body);
  await recordAudit({
    organizationId: req.auth.organizationId,
    userId: req.auth.userId,
    action: "ORGANIZATION_UPDATED",
    entityType: "Organization",
    entityId: req.auth.organizationId,
  });
  res.json(org);
}

export async function onboardingStatusHandler(req: Request, res: Response) {
  if (!req.auth) throw AppError.unauthorized();
  const status = await orgService.getOnboardingStatus(req.auth.organizationId);
  res.json(status);
}
