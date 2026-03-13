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

    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-grow">

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">

        <h1 className="text-2xl font-semibold">
          My Orders
        </h1>

        {orders.length === 0 && (

          <p className="text-gray-500">
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