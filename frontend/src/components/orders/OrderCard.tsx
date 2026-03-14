import { MapPin, PackageCheck, Truck } from "lucide-react"

import type { Order } from "@/api/orders"

interface Props {
  order: Order
}

export default function OrderCard({ order }: Props) {
  const subtotal = order.items.reduce((total, item) => total + item.totalPrice, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  return (
    <div className="section-panel space-y-6 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <p className="section-kicker text-[0.78rem]">Order ID</p>
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
              #{order.id}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 lg:items-end">
          <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.24em] text-accent-foreground">
            Pending
          </span>
          <p className="text-3xl font-semibold text-slate-950">${total.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          <div className="rounded-[1.6rem] border bg-white/75 p-4">
            <div className="mb-3 flex items-center gap-3">
              <MapPin className="size-4 text-primary" />
              <p className="font-medium text-slate-950">Shipping Address</p>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">{order.shippingAddress}</p>
          </div>

          <div className="space-y-3 rounded-[1.6rem] border bg-white/75 p-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border bg-white p-3"
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="size-20 rounded-2xl border bg-white object-cover"
                  onError={(event) => {
                    event.currentTarget.src = "https://placehold.co/160x160?text=Product"
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-lg font-medium text-slate-950">{item.product.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  <p className="mt-2 text-lg font-medium text-primary">${item.totalPrice.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.6rem] border bg-white/75 p-5">
          <div className="mb-5 flex items-center gap-3">
            <PackageCheck className="size-4 text-primary" />
            <p className="text-xl font-semibold text-slate-950">Order Summary</p>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{order.items.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="mt-3 border-t pt-4 text-base font-semibold text-slate-950">
              <div className="flex justify-between">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-dashed bg-accent/40 p-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <Truck className="mt-0.5 size-4 text-primary" />
              <p>
                Expected delivery by{" "}
                {new Date(order.expectedDelivery).toLocaleDateString()}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

