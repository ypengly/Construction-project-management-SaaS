import { RoleName } from "@prisma/client";
import { Router } from "express";
import * as orgController from "../controllers/organization.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/rbac.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(orgController.getHandler));
router.patch("/", requireRole(RoleName.OWNER), asyncHandler(orgController.updateHandler));
router.get("/onboarding", asyncHandler(orgController.onboardingStatusHandler));

export default router;
