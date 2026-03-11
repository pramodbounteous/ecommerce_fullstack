import { Router } from "express";
import {
  getCart,
  addItem,
  updateItem,
  removeItem
} from "../controllers/cart.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get(
  "/",
  authMiddleware,
  asyncHandler(getCart)
);

router.post(
  "/",
  authMiddleware,
  asyncHandler(addItem)
);

router.patch(
  "/:itemId",
  authMiddleware,
  asyncHandler(updateItem)
);

router.delete(
  "/:itemId",
  authMiddleware,
  asyncHandler(removeItem)
);

export default router;