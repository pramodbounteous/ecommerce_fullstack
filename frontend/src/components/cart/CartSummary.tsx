import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface Props {
  items: any[]
}

export default function CartSummary({ items }: Props) {

  const total = items.reduce(
    (acc, item) =>
      acc + item.product.price * item.quantity,
    0
  )

  return (

    <div className="h-fit space-y-4 rounded-xl border bg-background p-6 shadow-sm">

      <h2 className="text-lg font-semibold">
        Order Summary
      </h2>

      <div className="flex justify-between text-sm">

        <span>Subtotal</span>

        <span>${total.toFixed(2)}</span>

      </div>

      {items.length === 0 ? (
        <Button className="w-full" disabled>
          Checkout
        </Button>
      ) : (
        <Link to="/checkout">
          <Button className="w-full">
            Checkout
          </Button>
        </Link>
      )}

    </div>

  )

}
