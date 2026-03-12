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

    <Link to={`/products/${id}`}>

  <Card className="p-4 space-y-3">

    <img
      src={image}
      className="h-40 w-full object-cover rounded"
    />

    <h3 className="font-medium">
      {title}
    </h3>

    <p className="text-gray-500">
      ${price}
    </p>

    <Button className="w-full bg-slate-800 text-white">
      Add to Cart
    </Button>

  </Card>

</Link>

  )
}