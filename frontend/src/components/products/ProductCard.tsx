import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import type { MouseEvent } from "react"
import { ArrowRight, ShoppingCart, Sparkles } from "lucide-react"

import { useAddToCart } from "@/hooks/useAddToCart"

interface Props {
  id: number
  title: string
  price: number
  image: string
  description?: string
  stock?: number
}

export default function ProductCard({
  id,
  title,
  price,
  image,
  description,
  stock = 0
}: Props) {
  const { addItem, isPending } = useAddToCart()
  const isOutOfStock = stock <= 0

  return (
    <Card className="h-full border-white/70 bg-white/85 py-0 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.55)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-32px_rgba(37,99,235,0.28)]">
      <Link to={`/products/${id}`} className="group block overflow-hidden rounded-t-xl bg-[linear-gradient(180deg,rgba(226,232,240,0.7),rgba(255,255,255,0.95))]">
        <img
          src={image}
          alt={title}
          className="aspect-[1/0.92] w-full object-contain p-6 transition duration-500 group-hover:scale-[1.04]"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/400x400?text=Product"
          }}
        />
      </Link>

      <div className="space-y-4 px-5 pb-5">
        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-foreground">
            <Sparkles className="size-3" />
            {isOutOfStock ? "Not in stock" : `${stock} in stock`}
          </span>
          <p className="text-lg font-semibold text-foreground">${price.toFixed(2)}</p>
        </div>

        <Link to={`/products/${id}`} className="block space-y-2">
          <h3 className="line-clamp-2 text-base font-semibold tracking-tight hover:text-primary">
            {title}
          </h3>
          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
            {description ?? "Shop a standout pick chosen for everyday style and value."}
          </p>
        </Link>

        <div className="flex gap-2">
          <Button
            className="flex-1 rounded-xl"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault()
              addItem({
                productId: id,
                quantity: 1
              })
            }}
            disabled={isPending || isOutOfStock}
          >
            <ShoppingCart className="size-4" />
            {isOutOfStock ? "Not in Stock" : isPending ? "Adding..." : "Add to Cart"}
          </Button>
          <Button asChild variant="outline" className="rounded-xl bg-white">
            <Link to={`/products/${id}`}>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}
