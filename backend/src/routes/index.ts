import { Router } from "express";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/auth", authRoutes);

router.get("/health", (req, res) => {
  res.json({ status: "API running" });
});

export default router;