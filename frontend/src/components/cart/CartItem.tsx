import { Minus, Plus, Trash2 } from "lucide-react"

import type { CartItem as CartItemType } from "@/api/cart"
import { Button } from "@/components/ui/button"
import { useUpdateCartItem } from "@/hooks/useUpdateCartItem"
import { useRemoveCartItem } from "@/hooks/useRemoveCartItem"

interface Props {
  item: CartItemType
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
    <div className="section-panel flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6">
      <img
        src={product.image}
        alt={product.title}
        className="h-24 w-24 rounded-lg object-cover"
        onError={(event) => {
          event.currentTarget.src = "https://placehold.co/200x200?text=Product"
        }}
      />
      <div className="flex-1">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-semibold">
              {product.title}
            </h3>

            <p className="text-sm text-muted-foreground">
              ${product.price.toFixed(2)} each
            </p>
          </div>
          <p className="font-medium sm:hidden">
            ${(product.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <div className="mt-4 inline-flex items-center gap-3 rounded-full border bg-white p-1 shadow-sm">
          <button
            className="rounded-full p-2 transition hover:bg-muted"
            onClick={decreaseQty}
            aria-label="Decrease quantity"
          >
            <Minus className="size-4" />
          </button>

          <span className="min-w-8 text-center font-medium">{item.quantity}</span>

          <button
            className="rounded-full p-2 transition hover:bg-muted"
            onClick={increaseQty}
            aria-label="Increase quantity"
          >
            <Plus className="size-4" />
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
          className="rounded-full bg-white"
          onClick={removeItem}
          disabled={removeMutation.isPending || updateMutation.isPending}
        >
          <Trash2 className="size-4" />
          Remove
        </Button>
      </div>
    </div>
  )
}
