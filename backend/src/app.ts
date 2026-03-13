import express from "express";
import cors from "cors";

import routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

const configuredOrigins = (process.env.CORS_ORIGINS ?? process.env.FRONTEND_URL ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = new Set([
  "https://ecommerce-fullstack-phi.vercel.app",
  "https://ecommerce-fullstack-9xgnomlop-pramods-projects-4ae07df9.vercel.app",
  ...configuredOrigins,
]);

function isAllowedOrigin(origin: string) {
  if (
    origin.startsWith("http://localhost") ||
    origin.startsWith("http://127.0.0.1")
  ) {
    return true;
  }

  if (allowedOrigins.has(origin)) {
    return true;
  }

  return /^https:\/\/ecommerce-fullstack-[a-z0-9-]+\.vercel\.app$/i.test(origin);
}
 
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || isAllowedOrigin(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api", routes);

app.use(errorMiddleware);

export default app;
