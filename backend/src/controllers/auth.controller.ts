import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export async function register(req: Request, res: Response) {

  const result = await registerUser(req.body);

  res.json({
    success: true,
    data: result
  });
}

export async function login(req: Request, res: Response) {

  const result = await loginUser(req.body);

  res.json({
    success: true,
    data: result
  });
}