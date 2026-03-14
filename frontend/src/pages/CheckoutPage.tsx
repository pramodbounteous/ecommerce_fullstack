import { CreditCard, MapPin, ShieldCheck } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import type { CartItem } from "@/api/cart"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useCart } from "@/hooks/useCart"
import { useCheckout } from "@/hooks/useCheckout"

export default function CheckoutPage() {
  const navigate = useNavigate()

  const { data } = useCart()

  const checkoutMutation = useCheckout()

  const [address, setAddress] = useState("")

  const items = data?.items || []
  const trimmedAddress = address.trim()
  const canCheckout =
    items.length > 0 &&
    trimmedAddress.length >= 10 &&
    !checkoutMutation.isPending

  const total = items.reduce(
    (acc: number, item: CartItem) =>
      acc + item.product.price * item.quantity,
    0
  )

  const handleCheckout = async () => {
    if (!canCheckout) {
      return
    }

    await checkoutMutation.mutateAsync({
      paymentMethod: "COD",
      shippingAddress: trimmedAddress
    })

    navigate("/orders")

  }

  return (
    <div className="page-shell flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="page-section py-8 md:py-10">
          <div className="mb-8">
            <p className="section-kicker">Checkout</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Complete your order with confidence</h1>
            <p className="mt-2 text-sm text-muted-foreground">Add your shipping details and place your order securely.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="section-panel space-y-6 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-accent p-2 text-accent-foreground">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Shipping Address</h2>
                  <p className="text-sm text-muted-foreground">Enter a full address with at least 10 characters.</p>
                </div>
              </div>

              <Input
                placeholder="Enter shipping address"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                className="h-12 rounded-xl bg-white"
              />

              <div className="rounded-2xl border border-dashed bg-muted/30 p-4 text-sm text-muted-foreground">
                Cash on delivery is available for this order.
              </div>
            </div>

            <div className="section-panel h-fit space-y-5 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-accent p-2 text-accent-foreground">
                  <CreditCard className="size-4" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    Order Summary
                  </h2>
                  <p className="text-sm text-muted-foreground">Payment method: COD</p>
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border bg-muted/30 p-4">
                <div className="flex justify-between text-sm">
                  <span>Items</span>
                  <span>{items.length}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-dashed bg-white/70 p-4 text-sm text-muted-foreground">
                <ShieldCheck className="mt-0.5 size-4 text-primary" />
                <p>Double-check your address and total before placing the order.</p>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full rounded-xl py-6"
                disabled={!canCheckout}
              >
                {checkoutMutation.isPending ? "Placing Order..." : "Place Order"}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
