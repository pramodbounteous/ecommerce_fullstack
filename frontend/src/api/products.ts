import api from "@/lib/api"

export interface Product {
  id: number
  title: string
  description: string
  image: string
  price: number
  stock: number
  createdAt?: string
}

export interface ProductListResponse {
  page: number
  limit: number
  total: number
  products: Product[]
}

export const getProducts = async ({
  pageParam = 1,
  search = "",
  limit = 8
}: {
  pageParam?: number
  search?: string
  limit?: number
}) => {
  const res = await api.get("/products", {
    params: {
      page: pageParam,
      limit,
      search
    }
  })

  return res.data.data as ProductListResponse
}

export const getProduct = async (id: string) => {
  const res = await api.get(`/products/${id}`)

  return res.data.data as Product
}

export const getFeaturedProducts = async () => {
  const res = await api.get("/products/featured")

  return res.data.data as Product[]
}
