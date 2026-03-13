import { Search } from "lucide-react"
import { useMemo, useState } from "react"

import ProductCard from "./ProductCard"
import ProductGridSkeleton from "./ProductGridSkeleton"
import { Input } from "@/components/ui/input"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import { useFeaturedProducts, useInfiniteProducts } from "@/hooks/useProducts"

export default function ProductGrid() {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebouncedValue(search)
  const { data: featuredProducts = [] } = useFeaturedProducts()
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteProducts(debouncedSearch)

  const featuredIds = useMemo(
    () => new Set(featuredProducts.map((product) => product.id)),
    [featuredProducts]
  )

  const products = useMemo(
    () =>
      (data?.pages.flatMap((page) => page.products) ?? []).filter(
        (product) => !featuredIds.has(product.id)
      ),
    [data?.pages, featuredIds]
  )

  const loadMoreRef = useInfiniteScroll({
    enabled: !isLoading,
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
    onLoadMore: () => fetchNextPage()
  })

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">All Products</h2>
            <p className="text-sm text-muted-foreground">Browse the full catalog with live search.</p>
          </div>
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search products" className="pl-9" disabled />
          </div>
        </div>
        <ProductGridSkeleton />
      </section>
    )
  }

  return (

    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">All Products</h2>
          <p className="text-sm text-muted-foreground">
            Browse the full catalog with live search.
          </p>
        </div>
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products"
            className="pl-9"
          />
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed py-16 text-center text-muted-foreground">
          No products found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div ref={loadMoreRef} className="py-6">
            {isFetchingNextPage ? <ProductGridSkeleton count={4} /> : null}
          </div>
        </>
      )}
    </section>

  )
}
