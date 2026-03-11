import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

export async function getUserCart(userId: number) {

  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
  }

  return cart;
}

export async function addToCart(userId: number, productId: number, quantity: number) {

  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  if (product.stock < quantity) {
    throw new AppError("Not enough stock", 400);
  }

  let cart = await prisma.cart.findUnique({
    where: { userId }
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId }
    });
  }

  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId
      }
    }
  });

  if (existingItem) {

    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + quantity
      }
    });

  }

  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity
    }
  });
}

export async function updateCartItem(itemId: number, quantity: number) {

  if (quantity <= 0) {
    throw new AppError("Quantity must be greater than zero", 400);
  }

  return prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity }
  });
}

export async function removeCartItem(itemId: number) {

  return prisma.cartItem.delete({
    where: { id: itemId }
  });
}