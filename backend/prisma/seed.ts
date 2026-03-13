import "dotenv/config"

import { PrismaClient, Role } from "@prisma/client"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcrypt"
import fetch from "node-fetch"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
  adapter
})

async function main() {

  console.log("Starting seed...")

  /*
  CLEAR DATABASE
  */

  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.featuredProduct.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  console.log("Old data cleared")

  /*
  CREATE USERS
  */

  const users = []

  for (let i = 1; i <= 20; i++) {

    const hashedPassword = await bcrypt.hash(
      `user${i}password`,
      10
    )

    users.push({
      name: `user${i}`,
      email: `user${i}@gmail.com`,
      password: hashedPassword,
      role: i >= 15 ? Role.SELLER : Role.BUYER
    })

  }

  await prisma.user.createMany({
    data: users
  })

  console.log("Users seeded")

  /*
  FETCH PRODUCTS FROM DUMMYJSON
  */

  const res = await fetch(
    "https://dummyjson.com/products?limit=100"
  )

  const data: any = await res.json()

  const products = data.products.map((p: any) => ({
    title: p.title,
    description: p.description,
    image: p.thumbnail,
    price: p.price,
    stock: p.stock
  }))

  await prisma.product.createMany({
    data: products
  })

  console.log("Products seeded")

  /*
  CREATE FEATURED PRODUCTS
  */

  const allProducts = await prisma.product.findMany({
    select: { id: true }
  })

  const featured = allProducts
    .sort(() => 0.5 - Math.random())
    .slice(0, 20)

  await prisma.featuredProduct.createMany({
    data: featured.map((p) => ({
      productId: p.id
    }))
  })

  console.log("Featured products seeded")

  console.log("Seed complete")

}

main()
  .catch((e) => {

    console.error(e)
    process.exit(1)

  })
  .finally(async () => {

    await prisma.$disconnect()
    await pool.end()

  })