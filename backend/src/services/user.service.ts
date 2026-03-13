import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

export async function getProfile(userId: number) {

  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });

}

export async function updateProfile(userId: number, data: {
  name: string;
  email: string;
}) {
  const existing = await prisma.user.findFirst({
    where: {
      email: data.email,
      NOT: { id: userId }
    }
  });

  if (existing) {
    throw new AppError("Email already exists", 400);
  }

  return prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      email: data.email
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });
}

export async function addAddress(userId: number, data: any) {

  return prisma.address.create({
    data: {
      ...data,
      userId
    }
  });

}

export async function getAddresses(userId: number) {

  return prisma.address.findMany({
    where: { userId }
  });

}

export async function updateAddress(id: number, data: any) {

  return prisma.address.update({
    where: { id },
    data
  });

}

export async function deleteAddress(id: number) {

  return prisma.address.delete({
    where: { id }
  });

}
