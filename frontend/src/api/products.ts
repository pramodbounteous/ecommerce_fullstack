import api from "@/lib/api"

export const getProducts = async () => {

  const res = await api.get("/products")

  return res.data.data.products

}
export const getProduct = async (id: string) => {

  const res = await api.get(`/products/${id}`)

  return res.data.data

}