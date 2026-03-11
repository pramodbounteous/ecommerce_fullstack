import { Router } from "express";
import {
  createOrder,
  orderHistory,
  orderDetails
} from "../controllers/order.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post(
  "/checkout",
  authMiddleware,
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