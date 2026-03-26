import { Request, Response } from "express";
import {
  checkout,
  getUserOrders,
  getOrderDetails
} from "../services/order.service";

export async function createOrder(req: Request, res: Response) {

  const user = (req as any).user;

  const { paymentMethod, shippingAddress } = req.body;

  const order = await checkout(user.userId, paymentMethod, shippingAddress);

  res.status(201).json({
    success: true,
    data: order
  });
}

export async function orderHistory(req: Request, res: Response) {

  const user = (req as any).user;

  const orders = await getUserOrders(user.userId);

  res.json({
    success: true,
    data: orders
  });
}

export async function orderDetails(req: Request, res: Response) {

  const user = (req as any).user;
  const order = await getOrderDetails(user.userId, Number(req.params.id));

  res.json({
    success: true,
    data: order
  });
}
