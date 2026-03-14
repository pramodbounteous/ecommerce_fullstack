import type { CartItem } from "@/api/cart"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowRight, ReceiptText, ShieldCheck } from "lucide-react"

interface Props {
  items: CartItem[]
}

export default function CartSummary({ items }: Props) {
  const total = items.reduce(
    (acc, item) =>
      acc + item.product.price * item.quantity,
    0
  )

  return (
    <div className="section-panel h-fit space-y-5 p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-accent p-2 text-accent-foreground">
          <ReceiptText className="size-4" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            Order Summary
          </h2>
          <p className="text-sm text-muted-foreground">A clearer snapshot before checkout.</p>
        </div>
      </div>

      <div className="space-y-3 rounded-2xl border bg-muted/30 p-4 text-sm">
        <div className="flex justify-between">
          <span>Items</span>
          <span>{items.length}</span>
        </div>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed bg-white/70 p-4 text-sm text-muted-foreground">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 size-4 text-primary" />
          <p>Review your subtotal before placing the order.</p>
        </div>
      </div>

      {items.length === 0 ? (
        <Button className="w-full rounded-xl py-6" disabled>
          Checkout
        </Button>
      ) : (
        <Link to="/checkout">
          <Button className="w-full rounded-xl py-6">
            Checkout
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      )}
    </div>
  )
}
