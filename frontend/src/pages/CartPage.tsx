import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

import CartItem from "@/components/cart/CartItem"
import CartSkeleton from "@/components/cart/CartSkeleton"
import CartSummary from "@/components/cart/CartSummary"

import { useCart } from "@/hooks/useCart"

export default function CartPage() {

  const { data, isLoading } = useCart()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/20">
        <Navbar />
        <main className="mx-auto max-w-7xl flex-grow px-4 py-8 md:px-6">
          <CartSkeleton />
        </main>
        <Footer />
      </div>
    )
  }

  const items = data.items || []

  return (

    <div className="min-h-screen flex flex-col bg-muted/20">

      <Navbar />
        <main className="flex-grow">

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:px-6 lg:grid-cols-[1.4fr_0.8fr]">

        <div className="space-y-4">

          <h1 className="text-2xl font-semibold mb-4">
            My Cart
          </h1>

          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed bg-background py-16 text-center text-muted-foreground">
              Your cart is empty.
            </div>
          ) : null}

          {items.map((item: any) => (

            <CartItem
              key={item.id}
              item={item}
            />

          ))}

        </div>

        <CartSummary items={items} />

      </div>
      </main>

      <Footer />

    </div>

  )

}
