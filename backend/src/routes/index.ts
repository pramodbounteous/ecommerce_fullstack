import { Router } from "express";
import authRoutes from "./auth.routes";
import productRoutes from "./product.routes";
import cartRoutes from "./cart.routes";
import orderRoutes from "./order.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/users", userRoutes);

router.get("/health", (req, res) => {
  res.json({ status: "API running" });
});

export default router;