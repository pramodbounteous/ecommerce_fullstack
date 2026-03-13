import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAddToCart } from "@/hooks/useAddToCart"

interface Props {
  id: number
  title: string
  price: number
  description: string
}

export default function ProductInfo({
  id,
  title,
  price,
  description
}: Props) {

  const [qty, setQty] = useState(1)

  const { mutate } = useAddToCart()

  const handleAdd = () => {
    mutate({
      productId: id,
      quantity: qty
    })
  }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-semibold tracking-tight">
        {title}
      </h1>

      <p className="text-2xl font-semibold text-foreground">
        ${price.toFixed(2)}
      </p>

      <p className="max-w-xl leading-relaxed text-muted-foreground">
        {description}
      </p>

      <div className="flex items-center gap-4">

        <button
          className="rounded-lg border px-3 py-2"
          onClick={() => setQty(Math.max(1, qty - 1))}
        >
          -
        </button>

        <span className="min-w-8 text-center font-medium">{qty}</span>

        <button
          className="rounded-lg border px-3 py-2"
          onClick={() => setQty(qty + 1)}
        >
          +
        </button>

      </div>

      <Button
        onClick={handleAdd}
        className="w-full sm:w-auto"
      >
        Add to Cart
      </Button>

    </div>

  )
}
