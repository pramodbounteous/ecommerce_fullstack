import { Router } from "express";
import {
  register,
  login,
  refreshToken,
  logout
} from "../controllers/auth.controller";

import { validate } from "../middlewares/validate.middleware";
import { registerSchema, loginSchema } from "../validators/auth.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(register)
);

router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(login)
);

router.post(
  "/refresh",
  asyncHandler(refreshToken)
);

router.post(
  "/logout",
  asyncHandler(logout)
);

export default router;