import { Request, Response } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  getFeaturedProducts
} from "../services/product.service";

export async function create(req: Request, res: Response) {

  const product = await createProduct(req.body);

  res.status(201).json({
    success: true,
    data: product
  });
}

export async function list(req: Request, res: Response) {

  const products = await getProducts(req.query);

  res.json({
    success: true,
    data: products
  });
}

export async function details(req: Request, res: Response) {

  const product = await getProductById(Number(req.params.id));

  res.json({
    success: true,
    data: product
  });
}

export async function featured(req: Request, res: Response) {

  const products = await getFeaturedProducts();

  res.json({
    success: true,
    data: products
  });
}