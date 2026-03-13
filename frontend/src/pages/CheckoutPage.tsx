import { useState } from "react"
import { useNavigate } from "react-router-dom"

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

  const total = items.reduce(
    (acc: number, item: any) =>
      acc + item.product.price * item.quantity,
    0
  )

  const handleCheckout = async () => {

    await checkoutMutation.mutateAsync({
      paymentMethod: "COD",
      shippingAddress: address
    })

    navigate("/orders")

  }

  return (

    <div className="min-h-screen flex flex-col">

      <Navbar />

       <main className="flex-grow">

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 gap-10">

        <div className="space-y-6">

          <h1 className="text-2xl font-semibold">
            Shipping Address
          </h1>

          <Input
            placeholder="Enter shipping address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          />

        </div>

        <div className="bg-white p-6 rounded-xl shadow space-y-4 h-fit">

          <h2 className="text-lg font-semibold">
            Order Summary
          </h2>

          <div className="flex justify-between">

            <span>Total</span>

            <span>${total}</span>

          </div>

          <Button
            onClick={handleCheckout}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
          >
            Place Order
          </Button>

        </div>

      </div>

      </main>

      <Footer />

    </div>

  )

}