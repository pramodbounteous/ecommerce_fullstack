import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser
} from "../services/auth.service";

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

export async function refreshToken(req: Request, res: Response) {

  const { refreshToken: token } = req.body;

  const result = await refreshAccessToken(token);

  res.json({
    success: true,
    data: result
  });
}

export async function logout(req: Request, res: Response) {

  const { refreshToken } = req.body;

  const result = await logoutUser(refreshToken);

  res.json({
    success: true,
    data: result
  });
}