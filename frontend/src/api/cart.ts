import api from "@/lib/api"

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

export const getCart = async () => {

  const res = await api.get("/cart")

  return res.data.data

}