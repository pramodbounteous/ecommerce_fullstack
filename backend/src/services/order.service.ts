import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

export async function checkout(userId: number, paymentMethod: string, shippingAddress: string) {
  return prisma.$transaction(async (tx) => {
    const cart = await tx.cart.findUnique({
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

    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        throw new AppError(`Not enough stock for ${item.product.title}`, 400);
      }
    }

    const order = await tx.order.create({
      data: {
        userId,
        paymentMethod,
        shippingAddress,
        expectedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      }
    });

    for (const item of cart.items) {
      const updatedProduct = await tx.product.updateMany({
        where: {
          id: item.productId,
          stock: {
            gte: item.quantity
          }
        },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });

      if (updatedProduct.count === 0) {
        throw new AppError(`Not enough stock for ${item.product.title}`, 400);
      }

      await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.product.price,
          totalPrice: item.product.price * item.quantity
        }
      });
    }

    await tx.cartItem.deleteMany({
      where: { cartId: cart.id }
    });

    return order;
  });
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

export async function getOrderDetails(userId: number, orderId: number) {

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: { product: true }
      }
    }
  });

  if (!order || order.userId !== userId) {
    throw new AppError("Order not found", 404);
  }

  return order;
}
