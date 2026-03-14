import { ChevronDown, CreditCard, MapPin, ShieldCheck } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import type { CartItem } from "@/api/cart"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { useAuth } from "@/context/AuthContext"
import { formatSavedAddress, getSavedAddresses, saveAddress, type SavedAddress } from "@/lib/saved-addresses"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useCart } from "@/hooks/useCart"
import { useCheckout } from "@/hooks/useCheckout"

interface CheckoutAddressForm {
  label: string
  fullName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  country: string
  pincode: string
}

const emptyAddressForm: CheckoutAddressForm = {
  label: "",
  fullName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "India",
  pincode: ""
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data } = useCart()
  const checkoutMutation = useCheckout()
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState("")
  const [saveForLater, setSaveForLater] = useState(false)
  const [form, setForm] = useState<CheckoutAddressForm>({
    ...emptyAddressForm,
    fullName: user?.name ?? "",
    email: user?.email ?? ""
  })

  const items = data?.items || []
  const unavailableItems = items.filter(
    (item) => item.product.stock <= 0 || item.quantity > item.product.stock
  )
  const subtotal = items.reduce(
    (acc: number, item: CartItem) =>
      acc + item.product.price * item.quantity,
    0
  )
  const shipping: number = 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax
  const selectedAddress = savedAddresses.find((address) => address.id === selectedAddressId)
  const composedAddress = [
    form.fullName,
    form.email,
    form.phone,
    form.addressLine1,
    form.addressLine2,
    `${form.city}, ${form.state} ${form.pincode}`,
    form.country
  ]
    .filter(Boolean)
    .join(", ")
  const isAddressValid =
    form.fullName.trim().length >= 2 &&
    form.email.trim().length >= 5 &&
    form.phone.trim().length >= 10 &&
    form.addressLine1.trim().length >= 5 &&
    form.city.trim().length >= 2 &&
    form.state.trim().length >= 2 &&
    form.country.trim().length >= 2 &&
    form.pincode.trim().length >= 4
  const canCheckout =
    items.length > 0 &&
    isAddressValid &&
    unavailableItems.length === 0 &&
    !checkoutMutation.isPending

  useEffect(() => {
    if (!user?.id) {
      return
    }

    const nextSavedAddresses = getSavedAddresses(user.id)
    setSavedAddresses(nextSavedAddresses)

    if (nextSavedAddresses.length > 0) {
      const firstAddress = nextSavedAddresses[0]
      setSelectedAddressId(firstAddress.id)
      setForm({
        label: firstAddress.label,
        fullName: firstAddress.fullName,
        email: firstAddress.email,
        phone: firstAddress.phone,
        addressLine1: firstAddress.addressLine1,
        addressLine2: firstAddress.addressLine2 ?? "",
        city: firstAddress.city,
        state: firstAddress.state,
        country: firstAddress.country,
        pincode: firstAddress.pincode
      })
      return
    }

    setSelectedAddressId("")
    setForm({
      ...emptyAddressForm,
      fullName: user?.name ?? "",
      email: user?.email ?? ""
    })
  }, [user?.email, user?.id, user?.name])

  const updateForm = <K extends keyof CheckoutAddressForm>(key: K, value: CheckoutAddressForm[K]) => {
    setForm((current) => ({
      ...current,
      [key]: value
    }))
  }

  const handleSavedAddressChange = (addressId: string) => {
    setSelectedAddressId(addressId)

    const nextAddress = savedAddresses.find((item) => item.id === addressId)

    if (!nextAddress) {
      setForm((current) => ({
        ...current,
        fullName: user?.name ?? current.fullName,
        email: user?.email ?? current.email
      }))
      return
    }

    setForm({
      label: nextAddress.label,
      fullName: nextAddress.fullName,
      email: nextAddress.email,
      phone: nextAddress.phone,
      addressLine1: nextAddress.addressLine1,
      addressLine2: nextAddress.addressLine2 ?? "",
      city: nextAddress.city,
      state: nextAddress.state,
      country: nextAddress.country,
      pincode: nextAddress.pincode
    })
  }

  const handleCheckout = async () => {
    if (!canCheckout) {
      return
    }

    if (user?.id && saveForLater) {
      const nextAddresses = saveAddress(user.id, {
        id: selectedAddressId || `${Date.now()}`,
        label: form.label.trim() || `${form.city} address`,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        addressLine1: form.addressLine1.trim(),
        addressLine2: form.addressLine2.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        country: form.country.trim(),
        pincode: form.pincode.trim()
      })

      setSavedAddresses(nextAddresses)
    }

    await checkoutMutation.mutateAsync({
      paymentMethod: "COD",
      shippingAddress: composedAddress
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

          {unavailableItems.length > 0 ? (
            <div className="mb-6 rounded-[1.5rem] border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
              Some cart items are not in stock in the requested quantity. Please update your cart before placing the order.
            </div>
          ) : null}

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="section-panel space-y-6 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-accent p-2 text-accent-foreground">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Shipping Address</h2>
                  <p className="text-sm text-muted-foreground">Select a saved address or enter delivery details below.</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="saved-address">Use saved address</Label>
                <div className="relative">
                  <select
                    id="saved-address"
                    value={selectedAddressId}
                    onChange={(event) => handleSavedAddressChange(event.target.value)}
                    className="h-12 w-full appearance-none rounded-xl border border-input bg-white px-4 pr-10 text-sm shadow-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <option value="">Choose address</option>
                    {savedAddresses.map((address) => (
                      <option key={address.id} value={address.id}>
                        {address.label} - {address.city}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                {selectedAddress ? (
                  <p className="text-sm text-muted-foreground">
                    {formatSavedAddress(selectedAddress)}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="checkout-label">Address label</Label>
                  <Input
                    id="checkout-label"
                    placeholder="Home, Office, Apartment"
                    value={form.label}
                    onChange={(event) => updateForm("label", event.target.value)}
                    className="h-12 rounded-xl bg-white"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="checkout-name">Full name</Label>
                  <Input
                    id="checkout-name"
                    placeholder="Enter full name"
                    value={form.fullName}
                    onChange={(event) => updateForm("fullName", event.target.value)}
                    className="h-12 rounded-xl bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkout-email">Email</Label>
                  <Input
                    id="checkout-email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(event) => updateForm("email", event.target.value)}
                    className="h-12 rounded-xl bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkout-phone">Phone</Label>
                  <Input
                    id="checkout-phone"
                    placeholder="Enter phone number"
                    value={form.phone}
                    onChange={(event) => updateForm("phone", event.target.value)}
                    className="h-12 rounded-xl bg-white"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="checkout-address-line1">Address line 1</Label>
                  <Input
                    id="checkout-address-line1"
                    placeholder="Street address, house number"
                    value={form.addressLine1}
                    onChange={(event) => updateForm("addressLine1", event.target.value)}
                    className="h-12 rounded-xl bg-white"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="checkout-address-line2">Address line 2</Label>
                  <Input
                    id="checkout-address-line2"
                    placeholder="Apartment, suite, landmark"
                    value={form.addressLine2}
                    onChange={(event) => updateForm("addressLine2", event.target.value)}
                    className="h-12 rounded-xl bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkout-city">City</Label>
                  <Input
                    id="checkout-city"
                    placeholder="City"
                    value={form.city}
                    onChange={(event) => updateForm("city", event.target.value)}
                    className="h-12 rounded-xl bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkout-state">State</Label>
                  <Input
                    id="checkout-state"
                    placeholder="State"
                    value={form.state}
                    onChange={(event) => updateForm("state", event.target.value)}
                    className="h-12 rounded-xl bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkout-country">Country</Label>
                  <Input
                    id="checkout-country"
                    placeholder="Country"
                    value={form.country}
                    onChange={(event) => updateForm("country", event.target.value)}
                    className="h-12 rounded-xl bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkout-pincode">Pincode</Label>
                  <Input
                    id="checkout-pincode"
                    placeholder="Postal / zip code"
                    value={form.pincode}
                    onChange={(event) => updateForm("pincode", event.target.value)}
                    className="h-12 rounded-xl bg-white"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 rounded-2xl border bg-white/70 px-4 py-3 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={saveForLater}
                  onChange={(event) => setSaveForLater(event.target.checked)}
                  className="size-4 rounded border-input"
                />
                Save this address to your profile for future orders
              </label>

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

              <div className="space-y-4 rounded-2xl border bg-white/80 p-4">
                {items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="size-16 rounded-2xl border bg-white object-cover"
                      onError={(event) => {
                        event.currentTarget.src = "https://placehold.co/120x120?text=Product"
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 font-medium">{item.product.title}</p>
                      <p className="text-sm text-muted-foreground">Qty {item.quantity} x ${item.product.price.toFixed(2)}</p>
                    </div>
                    <p className="font-medium">${(item.quantity * item.product.price).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 rounded-2xl border bg-muted/30 p-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-dashed bg-white/70 p-4 text-sm text-muted-foreground">
                <ShieldCheck className="mt-0.5 size-4 text-primary" />
                <p>
                  {unavailableItems.length > 0
                    ? "Checkout is disabled until unavailable items are fixed in the cart."
                    : "Double-check your address and total before placing the order."}
                </p>
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
