import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import type { MouseEvent } from "react"

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
  image
}: Props) {
  const { mutate, isPending } = useAddToCart()

  return (

    <Card className="h-full border-border/70 py-0 transition duration-200 hover:-translate-y-1 hover:shadow-xl">

      <Link to={`/products/${id}`} className="block overflow-hidden rounded-t-xl bg-muted/20">

        <img
          src={image}
          alt={title}
          className="aspect-square w-full object-cover transition duration-300 hover:scale-[1.03]"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/400x400?text=Product"
          }}
        />

      </Link>

      <div className="space-y-3 px-4 pb-4">
      <Link to={`/products/${id}`}>

        <h3 className="line-clamp-2 text-base font-medium tracking-tight hover:underline">
          {title}
        </h3>

      </Link>

      <p className="text-sm font-semibold text-foreground">
        ${price.toFixed(2)}
      </p>

      <Button
        className="w-full"
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          e.preventDefault()
          mutate({
            productId: id,
            quantity: 1
          })
        }}
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add to Cart"}
      </Button>
      </div>

    </Card>

  )
}
