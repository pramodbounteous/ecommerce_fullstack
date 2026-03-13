import { Router } from "express";
import {
  profile,
  editProfile,
  createAddress,
  listAddresses,
  editAddress,
  removeAddress
} from "../controllers/user.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { addressSchema } from "../validators/address.schema";
import { updateProfileSchema } from "../validators/user.schema";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get(
  "/me",
  authMiddleware,
  asyncHandler(profile)
);

router.patch(
  "/me",
  authMiddleware,
  validate(updateProfileSchema),
  asyncHandler(editProfile)
);

router.post(
  "/address",
  authMiddleware,
  validate(addressSchema),
  asyncHandler(createAddress)
);

router.get(
  "/address",
  authMiddleware,
  asyncHandler(listAddresses)
);

router.patch(
  "/address/:id",
  authMiddleware,
  validate(addressSchema),
  asyncHandler(editAddress)
);

router.delete(
  "/address/:id",
  authMiddleware,
  asyncHandler(removeAddress)
);

export default router;
