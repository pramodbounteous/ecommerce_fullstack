import { Router } from "express";
import {
  create,
  list,
  details,
  featured
} from "../controllers/product.controller";

import { validate } from "../middlewares/validate.middleware";
import { createProductSchema } from "../validators/product.schema";

import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/role.middleware";

import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(list));

router.get("/featured", asyncHandler(featured));

router.get("/:id", asyncHandler(details));

router.post(
  "/",
  authMiddleware,
  authorizeRole("SELLER"),
  validate(createProductSchema),
  asyncHandler(create)
);

export default router;