import { Request, Response } from "express";
import {
  getProfile,
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress
} from "../services/user.service";

export async function profile(req: Request, res: Response) {

  const user = (req as any).user;

  const result = await getProfile(user.userId);

  res.json({
    success: true,
    data: result
  });

}

export async function createAddress(req: Request, res: Response) {

  const user = (req as any).user;

  const address = await addAddress(user.userId, req.body);

  res.status(201).json({
    success: true,
    data: address
  });

}

export async function listAddresses(req: Request, res: Response) {

  const user = (req as any).user;

  const addresses = await getAddresses(user.userId);

  res.json({
    success: true,
    data: addresses
  });

}

export async function editAddress(req: Request, res: Response) {

  const id = Number(req.params.id);

  const address = await updateAddress(id, req.body);

  res.json({
    success: true,
    data: address
  });

}

export async function removeAddress(req: Request, res: Response) {

  const id = Number(req.params.id);

  await deleteAddress(id);

  res.json({
    success: true,
    message: "Address deleted"
  });

}