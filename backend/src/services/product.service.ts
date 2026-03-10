import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

export async function createProduct(data: any) {

  const product = await prisma.product.create({
    data
  });

  return product;
}

export async function getProducts(query: any) {

  const { search } = query;

  const products = await prisma.product.findMany({
    where: search
      ? {
          title: {
            contains: search,
            mode: "insensitive"
          }
        }
      : {},
    orderBy: {
      createdAt: "desc"
    }
  });

  return products;
}

export async function getProductById(id: number) {

  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
}

export async function getFeaturedProducts() {

  const featured = await prisma.featuredProduct.findMany({
    include: {
      product: true
    }
  });

  return featured.map((f) => f.product);
}