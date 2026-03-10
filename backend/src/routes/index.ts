import { Router } from "express";
import authRoutes from "./auth.routes";
import productRoutes from "./product.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);

router.get("/health", (req, res) => {
  res.json({ status: "API running" });
});

export default router;