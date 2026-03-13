import prisma from "../config/prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} from "../utils/jwt";
import { AppError } from "../utils/AppError";

function serializeUser(user: {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  };
}

export async function registerUser(data: any) {

  const existing = await prisma.user.findUnique({
    where: { email: data.email }
  });

  if (existing) {
    throw new AppError("Email already exists", 400);
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword
    }
  });

  const payload = {
    userId: user.id,
    role: user.role
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  });

  return {
    user: serializeUser(user),
    accessToken,
    refreshToken
  };
}

export async function loginUser(data: any) {

  const user = await prisma.user.findUnique({
    where: { email: data.email }
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const valid = await comparePassword(data.password, user.password);

  if (!valid) {
    throw new AppError("Invalid credentials", 401);
  }

  const payload = {
    userId: user.id,
    role: user.role
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  });

  return {
    user: serializeUser(user),
    accessToken,
    refreshToken
  };
}

export async function refreshAccessToken(token: string) {
  if (!token) {
    throw new AppError("Refresh token is required", 401);
  }

  const payload: any = verifyRefreshToken(token);

  const storedToken = await prisma.refreshToken.findFirst({
    where: { token }
  });

  if (!storedToken) {
    throw new AppError("Invalid refresh token", 401);
  }

  if (storedToken.expiresAt < new Date()) {
    await prisma.refreshToken.delete({
      where: { id: storedToken.id }
    });
    throw new AppError("Refresh token expired", 401);
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const newAccessToken = generateAccessToken({
    userId: payload.userId,
    role: payload.role
  });

  return {
    user: serializeUser(user),
    accessToken: newAccessToken,
    refreshToken: token
  };
}

export async function logoutUser(token: string) {

  await prisma.refreshToken.deleteMany({
    where: { token }
  });

  return { message: "Logged out successfully" };
}
