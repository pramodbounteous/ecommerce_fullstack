import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

export async function createProduct(data: any) {
  return prisma.product.create({ data });
}

export async function getProducts(query: any) {

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const search = query.search || "";
  const minPrice = query.minPrice ? Number(query.minPrice) : undefined;
  const maxPrice = query.maxPrice ? Number(query.maxPrice) : undefined;

  const where: any = {};

  if (search) {
    where.title = {
      contains: search,
      mode: "insensitive"
    };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {
      gte: minPrice,
      lte: maxPrice
    };
  }

  const products = await prisma.product.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" }
  });

  const total = await prisma.product.count({ where });

  return {
    page,
    limit,
    total,
    products
  };
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
    include: { product: true }
  });

  return featured.map((f) => f.product);
}

export async function addFeatured(productId: number) {

  return prisma.featuredProduct.create({
    data: { productId }
  });
}

export async function removeFeatured(productId: number) {

  return prisma.featuredProduct.deleteMany({
    where: { productId }
  });
}