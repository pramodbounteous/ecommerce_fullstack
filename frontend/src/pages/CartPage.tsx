import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

import type { CartItem as CartItemType } from "@/api/cart"
import CartItem from "@/components/cart/CartItem"
import CartSkeleton from "@/components/cart/CartSkeleton"
import CartSummary from "@/components/cart/CartSummary"

import { useCart } from "@/hooks/useCart"

export default function CartPage() {
  const { data, isLoading } = useCart()

  if (isLoading) {
    return (
      <div className="page-shell">
        <Navbar />
        <main className="page-section flex-grow py-8 md:py-10">
          <CartSkeleton />
        </main>
        <Footer />
      </div>
    )
  }

  const items = data?.items || []

  return (
    <div className="page-shell flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="page-section py-8 md:py-10">
          <div className="mb-8">
            <p className="section-kicker">Cart</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Review items before checkout</h1>
            <p className="mt-2 text-sm text-muted-foreground">Check your favorites, update quantities, and head to checkout.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="space-y-4">
          {items.length === 0 ? (
            <div className="section-panel rounded-[1.75rem] border-dashed py-16 text-center text-muted-foreground">
              Your cart is empty.
            </div>
          ) : null}

          {items.map((item: CartItemType) => (

            <CartItem
              key={item.id}
              item={item}
            />

          ))}

            </div>
            <CartSummary items={items} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
