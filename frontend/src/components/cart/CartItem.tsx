import { Button } from "@/components/ui/button"
import { useUpdateCartItem } from "@/hooks/useUpdateCartItem"
import { useRemoveCartItem } from "@/hooks/useRemoveCartItem"

interface Props {
  item: any
}

export default function CartItem({ item }: Props) {

  const product = item.product

  const updateMutation = useUpdateCartItem()
  const removeMutation = useRemoveCartItem()

  const increaseQty = () => {

    updateMutation.mutate({
      itemId: item.id,
      quantity: item.quantity + 1
    })

  }

  const decreaseQty = () => {

    if (item.quantity <= 1) return

    updateMutation.mutate({
      itemId: item.id,
      quantity: item.quantity - 1
    })

  }

  const removeItem = () => {

    removeMutation.mutate(item.id)

  }

  return (

    <div className="flex gap-6 border-b py-6">

      <img
        src={product.productImg}
        className="w-24 h-24 object-cover rounded"
      />

      <div className="flex-1">

        <h3 className="font-semibold">
          {product.title}
        </h3>

        <p className="text-gray-500 text-sm">
          ${product.price}
        </p>

        <div className="flex items-center gap-3 mt-3">

          <button
            className="px-3 py-1 border rounded"
            onClick={decreaseQty}
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            className="px-3 py-1 border rounded"
            onClick={increaseQty}
          >
            +
          </button>

        </div>

      </div>

      <div className="flex flex-col justify-between">

        <p className="font-medium">
          ${product.price * item.quantity}
        </p>

        <Button
          variant="outline"
          size="sm"
          onClick={removeItem}
        >
          Remove
        </Button>

      </div>

    </div>

  )

}