import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

import OrderCard from "@/components/orders/OrderCard"

import { useOrders } from "@/hooks/useOrders"

export default function OrdersPage() {

  const { data, isLoading } = useOrders()

  if (isLoading) {
    return <div className="p-10">Loading orders...</div>
  }

  const orders = data || []

  return (

    <div className="min-h-screen flex flex-col bg-muted/20">

      <Navbar />

      <main className="flex-grow">

      <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 md:px-6">

        <h1 className="text-2xl font-semibold">
          My Orders
        </h1>

        {orders.length === 0 && (

          <p className="text-muted-foreground">
            No orders yet
          </p>

        )}

        {orders.map((order: any) => (

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
