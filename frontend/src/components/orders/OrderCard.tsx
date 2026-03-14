import { PackageCheck } from "lucide-react"

import type { Order } from "@/api/orders"

interface Props {
  order: Order
}

export default function OrderCard({ order }: Props) {

  return (

    <div className="section-panel space-y-5 p-6">

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-accent p-2 text-accent-foreground">
            <PackageCheck className="size-4" />
          </div>
          <div>
            <h3 className="font-semibold">
              Order #{order.id}
            </h3>
            <p className="text-sm text-muted-foreground">
              {order.items.length} item{order.items.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <span className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
          {new Date(order.createdAt).toLocaleDateString()}
        </span>

      </div>

      <div className="space-y-2 rounded-2xl border bg-white/70 p-4">

        {order.items.map((item) => (

          <div
            key={item.id}
            className="flex justify-between gap-4 text-sm"
          >

            <span>
              {item.product.title} x {item.quantity}
            </span>

            <span>${item.totalPrice.toFixed(2)}</span>

          </div>

        ))}

      </div>

    </div>

  )

}

