import api from "@/lib/api"
import type { Product } from "@/api/products"

export interface OrderItem {
  id: number
  quantity: number
  totalPrice: number
  product: Product
}

export interface Order {
  id: number
  paymentMethod: string
  shippingAddress: string
  expectedDelivery: string
  createdAt: string
  items: OrderItem[]
}

export const checkout = async (
  paymentMethod: string,
  shippingAddress: string
) => {

  const res = await api.post("/orders/checkout", {
    paymentMethod,
    shippingAddress
  })

  return res.data
}

export const getOrders = async () => {

  const res = await api.get("/orders")

  return res.data.data as Order[]

}
