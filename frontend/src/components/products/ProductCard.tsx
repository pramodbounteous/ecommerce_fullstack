import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Props {
  title: string
  price: number
  image: string
}

export default function ProductCard({
  title,
  price,
  image
}: Props) {

  return (

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

  )
}