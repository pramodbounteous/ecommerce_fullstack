import express from "express";
import cors from "cors";

import routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

const allowedOrigins = ["https://ecommerce-fullstack-9xgnomlop-pramods-projects-4ae07df9.vercel.app"];
 
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin.startsWith("http://localhost") ||
        origin.startsWith("http://127.0.0.1") ||
        allowedOrigins.includes(origin)
      ) {
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