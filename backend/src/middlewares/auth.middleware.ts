import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  const token = authHeader.split(" ")[1];

  try {

    const payload: any = verifyAccessToken(token);

    (req as any).user = payload;

    next();

  } catch {

    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });

  }
}