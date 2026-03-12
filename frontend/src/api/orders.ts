import api from "@/lib/api"

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

  return res.data.data

}