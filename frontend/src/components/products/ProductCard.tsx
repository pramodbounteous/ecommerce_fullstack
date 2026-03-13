import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface Props {
  id: string
  title: string
  price: number
  image: string
}

export default function ProductCard({
  id,
  title,
  price,
  image
}: Props) {

  return (

    <Card className="p-4 space-y-3 hover:shadow-lg transition">

      <Link to={`/products/${id}`}>

        <img
          src={image}
          alt={title}
          className="h-40 w-full object-cover rounded"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/400x400?text=Product"
          }}
        />

      </Link>

      <Link to={`/products/${id}`}>

        <h3 className="font-medium hover:underline">
          {title}
        </h3>

      </Link>

      <p className="text-gray-500">
        ${price}
      </p>

      <Button
        className="w-full bg-slate-800 text-white"
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        Add to Cart
      </Button>

    </Card>

  )
}