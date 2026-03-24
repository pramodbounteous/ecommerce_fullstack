import api from "@/lib/api"
import type { Product } from "@/api/products"

export interface CartItem {
  id: number
  quantity: number
  product: Product
}

export interface Cart {
  id: number
  items: CartItem[]
}

export const getCart = async () => {

  const res = await api.get("/cart")

  return res.data.data as Cart

}

export const addToCart = async (
  productId: number,
  quantity: number
) => {

  const res = await api.post("/cart", {
    productId,
    quantity
  })

  return res.data 

}

export const updateCartItem = async (
  itemId: number,
  quantity: number
) => {

  const res = await api.patch(`/cart/${itemId}`, {
    quantity
  })

  return res.data

}

export const removeCartItem = async (
  itemId: number
) => {

  const res = await api.delete(`/cart/${itemId}`)

  return res.data

}
