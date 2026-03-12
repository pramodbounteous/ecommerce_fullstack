import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

import CartItem from "@/components/cart/CartItem"
import CartSummary from "@/components/cart/CartSummary"

import { useCart } from "@/hooks/useCart"

export default function CartPage() {

  const { data, isLoading } = useCart()

  if (isLoading) {
    return <div className="p-10">Loading cart...</div>
  }

  const items = data.items || []

  return (

    <div>

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-3 gap-10">

        <div className="col-span-2 space-y-4">

          <h1 className="text-2xl font-semibold mb-4">
            My Cart
          </h1>

          {items.map((item: any) => (

            <CartItem
              key={item.id}
              item={item}
            />

          ))}

        </div>

        <CartSummary items={items} />

      </div>

      <Footer />

    </div>

  )

}