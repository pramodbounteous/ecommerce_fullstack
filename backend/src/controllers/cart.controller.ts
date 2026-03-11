import { Request, Response } from "express";
import {
  getUserCart,
  addToCart,
  updateCartItem,
  removeCartItem
} from "../services/cart.service";

export async function getCart(req: Request, res: Response) {

  const user = (req as any).user;

  const cart = await getUserCart(user.userId);

  res.json({
    success: true,
    data: cart
  });
}

export async function addItem(req: Request, res: Response) {

  const user = (req as any).user;

  const { productId, quantity } = req.body;

  const item = await addToCart(user.userId, productId, quantity);

  res.status(201).json({
    success: true,
    data: item
  });
}

export async function updateItem(req: Request, res: Response) {

  const itemId = Number(req.params.itemId);

  const { quantity } = req.body;

  const item = await updateCartItem(itemId, quantity);

  res.json({
    success: true,
    data: item
  });
}

export async function removeItem(req: Request, res: Response) {

  const itemId = Number(req.params.itemId);

  await removeCartItem(itemId);

  res.json({
    success: true,
    message: "Item removed from cart"
  });
}