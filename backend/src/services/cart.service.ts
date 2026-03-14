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

  if (product.stock <= 0) {
    throw new AppError("Not in stock", 400);
  }

  if (product.stock < quantity) {
    throw new AppError(`Not enough stock. Only ${product.stock} left.`, 400);
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
    const nextQuantity = existingItem.quantity + quantity

    if (product.stock < nextQuantity) {
      throw new AppError(
        product.stock <= 0
          ? "Not in stock"
          : `Not enough stock. Only ${product.stock} available.`,
        400
      );
    }

    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: nextQuantity
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

  const item = await prisma.cartItem.findUnique({
    where: { id: itemId },
    include: {
      product: true
    }
  });

  if (!item) {
    throw new AppError("Cart item not found", 404);
  }

  if (item.product.stock <= 0) {
    throw new AppError("Not in stock", 400);
  }

  if (item.product.stock < quantity) {
    throw new AppError(
      `Not enough stock. Only ${item.product.stock} available.`,
      400
    );
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
