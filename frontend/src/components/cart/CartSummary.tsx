import { Button } from "@/components/ui/button"

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

    <div className="bg-white p-6 rounded-xl shadow space-y-4">

      <h2 className="text-lg font-semibold">
        Order Summary
      </h2>

      <div className="flex justify-between text-sm">

        <span>Subtotal</span>

        <span>${total}</span>

      </div>

      <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        Checkout
      </Button>

    </div>

  )

}