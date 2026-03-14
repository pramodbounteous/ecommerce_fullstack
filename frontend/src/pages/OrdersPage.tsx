import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

import type { Order } from "@/api/orders"
import OrderCard from "@/components/orders/OrderCard"
import { Skeleton } from "@/components/ui/skeleton"

import { useOrders } from "@/hooks/useOrders"

export default function OrdersPage() {
  const { data, isLoading } = useOrders()

  if (isLoading) {
    return (
      <div className="page-shell">
        <Navbar />
        <main className="page-section py-8 md:py-10">
          <div className="mb-8">
            <p className="section-kicker">Orders</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Your order history</h1>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="section-panel space-y-4 p-6">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-16 w-full rounded-2xl" />
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const orders = data || []

  return (
    <div className="page-shell flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="page-section space-y-6 py-8 md:py-10">
          <div>
            <p className="section-kicker">Orders</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Your order history
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Track your recent purchases and past orders in one place.</p>
          </div>

        {orders.length === 0 && (
          <div className="section-panel rounded-[1.75rem] py-16 text-center text-muted-foreground">
            No orders yet
          </div>
        )}

        {orders.map((order: Order) => (

          <OrderCard
            key={order.id}
            order={order}
          />

        ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
