import { useState } from "react"
import { Minus, Plus, ShieldCheck, ShoppingCart, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAddToCart } from "@/hooks/useAddToCart"

interface Props {
  id: number
  title: string
  price: number
  description: string
  stock: number
}

export default function ProductInfo({
  id,
  title,
  price,
  description,
  stock
}: Props) {
  const [qty, setQty] = useState(1)
  const { addItem, isPending } = useAddToCart()
  const isOutOfStock = stock <= 0

  const handleAdd = () => {
    if (isOutOfStock) {
      return
    }

    addItem({
      productId: id,
      quantity: qty
    })
  }

  return (
    <div className="section-panel space-y-6 p-6 sm:p-8">
      <div className="space-y-3">
        <p className="section-kicker">Product details</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-3xl font-semibold text-foreground">
            ${price.toFixed(2)}
          </p>
          <span className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
            {isOutOfStock ? "Not in stock" : `${stock} available`}
          </span>
        </div>
      </div>

      <p className="max-w-xl leading-8 text-muted-foreground">
        {description}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border bg-muted/40 p-4">
          <div className="flex items-center gap-3">
            <Truck className="size-4 text-primary" />
            <p className="font-medium">Fast dispatch</p>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Packed and sent quickly so your order reaches you sooner.</p>
        </div>
        <div className="rounded-2xl border bg-muted/40 p-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-4 text-primary" />
            <p className="font-medium">Reliable purchase flow</p>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Simple checkout and order updates from cart to delivery.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="inline-flex w-fit items-center rounded-full border bg-white p-1 shadow-sm">
          <button
            className="rounded-full p-2 text-foreground transition hover:bg-muted"
            onClick={() => setQty(Math.max(1, qty - 1))}
            aria-label="Decrease quantity"
            disabled={isOutOfStock}
          >
            <Minus className="size-4" />
          </button>

          <span className="min-w-12 text-center text-sm font-semibold">{qty}</span>

          <button
            className="rounded-full p-2 text-foreground transition hover:bg-muted"
            onClick={() => setQty(Math.min(stock, qty + 1))}
            aria-label="Increase quantity"
            disabled={isOutOfStock || qty >= stock}
          >
            <Plus className="size-4" />
          </button>
        </div>

        <Button
          onClick={handleAdd}
          className="w-full rounded-xl py-6 sm:w-auto sm:min-w-48"
          disabled={isPending || isOutOfStock}
        >
          <ShoppingCart className="size-4" />
          {isOutOfStock ? "Not in Stock" : isPending ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </div>
  )
}
