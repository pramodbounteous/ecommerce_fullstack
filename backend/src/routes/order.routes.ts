import { Router } from "express";
import {
  createOrder,
  orderHistory,
  orderDetails
} from "../controllers/order.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middlewares/validate.middleware";
import { checkoutSchema } from "../validators/order.schema";

const router = Router();

router.post(
  "/checkout",
  authMiddleware,
  validate(checkoutSchema),
  asyncHandler(createOrder)
);

router.get(
  "/",
  authMiddleware,
  asyncHandler(orderHistory)
);

router.get(
  "/:id",
  authMiddleware,
  asyncHandler(orderDetails)
);

export default router;
