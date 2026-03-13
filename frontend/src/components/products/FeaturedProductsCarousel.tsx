import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

import ProductCard from "@/components/products/ProductCard"
import FeaturedCarouselSkeleton from "@/components/products/FeaturedCarouselSkeleton"
import { Button } from "@/components/ui/button"
import { useFeaturedProducts } from "@/hooks/useProducts"

export default function FeaturedProductsCarousel() {
  const { data, isLoading } = useFeaturedProducts()
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollRef.current) {
      return
    }

    scrollRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth"
    })
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Featured Products</h2>
          <p className="text-sm text-muted-foreground">Popular picks curated from the catalog.</p>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <Button variant="outline" size="icon" onClick={() => scrollByAmount("left")}>
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => scrollByAmount("right")}>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <FeaturedCarouselSkeleton />
      ) : !data?.length ? null : (
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {data.map((product) => (
            <div key={product.id} className="min-w-[260px] max-w-[300px] flex-1 snap-start">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
