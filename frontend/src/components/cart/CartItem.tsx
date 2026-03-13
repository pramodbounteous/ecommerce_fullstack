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

    <div className="flex flex-col gap-4 rounded-xl border bg-background p-4 sm:flex-row sm:gap-6">

      <img
        src={product.image}
        className="h-24 w-24 rounded-lg object-cover"
        onError={(event) => {
          event.currentTarget.src = "https://placehold.co/200x200?text=Product"
        }}
      />

      <div className="flex-1">

        <h3 className="font-semibold">
          {product.title}
        </h3>

        <p className="text-sm text-muted-foreground">
          ${product.price.toFixed(2)}
        </p>

        <div className="flex items-center gap-3 mt-3">

          <button
            className="rounded-lg border px-3 py-1"
            onClick={decreaseQty}
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            className="rounded-lg border px-3 py-1"
            onClick={increaseQty}
          >
            +
          </button>

        </div>

      </div>

      <div className="flex flex-row items-start justify-between gap-4 sm:flex-col sm:items-end">

        <p className="font-medium">
          ${(product.price * item.quantity).toFixed(2)}
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
