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
      <section id="catalog" className="page-section py-8 pb-12 md:py-10 md:pb-16">
        <div className="section-panel mb-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Catalog</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Browse the full collection</h2>
            <p className="mt-2 text-sm text-muted-foreground">Responsive search and infinite browsing, optimized for product discovery.</p>
          </div>
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search products" className="h-11 rounded-xl border-white/70 bg-white pl-9 shadow-sm" disabled />
          </div>
        </div>
        <ProductGridSkeleton />
      </section>
    )
  }

  return (

    <section id="catalog" className="page-section py-8 pb-12 md:py-10 md:pb-16">
      <div className="section-panel mb-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">Catalog</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Browse the full collection</h2>
          <p className="text-sm text-muted-foreground">
            {products.length} product{products.length === 1 ? "" : "s"} surfaced with live search.
          </p>
        </div>
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products"
            className="h-11 rounded-xl border-white/70 bg-white pl-9 shadow-sm"
          />
        </div>
      </div>

      {products.length === 0 ? (
        <div className="section-panel rounded-[1.75rem] border-dashed py-16 text-center text-muted-foreground">
          No products found. Try a broader search term.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
