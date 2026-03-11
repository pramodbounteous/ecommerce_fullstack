import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

export async function checkout(userId: number, paymentMethod: string, shippingAddress: string) {

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true }
      }
    }
  });

  if (!cart || cart.items.length === 0) {
    throw new AppError("Cart is empty", 400);
  }

  let total = 0;

  for (const item of cart.items) {
    if (item.product.stock < item.quantity) {
      throw new AppError(`Not enough stock for ${item.product.title}`, 400);
    }

    total += item.product.price * item.quantity;
  }

  const order = await prisma.order.create({
    data: {
      userId,
      paymentMethod,
      shippingAddress,
      expectedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }
  });

  for (const item of cart.items) {

    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.product.price,
        totalPrice: item.product.price * item.quantity
      }
    });

    await prisma.product.update({
      where: { id: item.productId },
      data: {
        stock: item.product.stock - item.quantity
      }
    });

  }

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id }
  });

  return order;
}

export async function getUserOrders(userId: number) {

  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: { product: true }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

}

export async function getOrderDetails(orderId: number) {

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: { product: true }
      }
    }
  });

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return order;
}