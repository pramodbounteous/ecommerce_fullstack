import prisma from "../config/prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";

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

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  });

  return { user, accessToken, refreshToken };
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

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  });

  return { user, accessToken, refreshToken };
}