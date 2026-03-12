import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Props {
  title: string
  price: number
  description: string
}

export default function ProductInfo({
  title,
  price,
  description
}: Props) {

  const [qty, setQty] = useState(1)

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-semibold">
        {title}
      </h1>

      <p className="text-xl font-medium text-gray-700">
        ${price}
      </p>

      <p className="text-gray-500">
        {description}
      </p>

      <div className="flex items-center gap-4">

        <button
          className="px-3 py-1 border rounded"
          onClick={() => setQty(Math.max(1, qty - 1))}
        >
          -
        </button>

        <span>{qty}</span>

        <button
          className="px-3 py-1 border rounded"
          onClick={() => setQty(qty + 1)}
        >
          +
        </button>

      </div>

      <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        Add to Cart
      </Button>

    </div>

  )

}