import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimit.js";
import { validateBody } from "../middleware/validate.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  forgotPasswordSchema,
  loginSchema,
  refreshSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validators/auth.validators.js";

const router = Router();

router.post("/register", authLimiter, validateBody(registerSchema), asyncHandler(authController.registerHandler));
router.post("/login", authLimiter, validateBody(loginSchema), asyncHandler(authController.loginHandler));
router.post("/refresh", authLimiter, validateBody(refreshSchema), asyncHandler(authController.refreshHandler));
router.post("/logout", validateBody(refreshSchema), asyncHandler(authController.logoutHandler));
router.post("/forgot-password", authLimiter, validateBody(forgotPasswordSchema), asyncHandler(authController.forgotPasswordHandler));
router.post("/reset-password", authLimiter, validateBody(resetPasswordSchema), asyncHandler(authController.resetPasswordHandler));
router.get("/me", requireAuth, asyncHandler(authController.meHandler));

export default router;
