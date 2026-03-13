import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

import { getFeaturedProducts, getProducts } from "@/api/products"

export function useInfiniteProducts(search: string) {
  return useInfiniteQuery({
    queryKey: ["products", search],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getProducts({ pageParam, search }),
    getNextPageParam: (lastPage) => {
      const loadedCount = lastPage.page * lastPage.limit
      return loadedCount < lastPage.total ? lastPage.page + 1 : undefined
    }
  })
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: getFeaturedProducts
  })
}
