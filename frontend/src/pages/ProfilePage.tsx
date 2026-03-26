import { MapPinHouse, Pencil, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import type { Order } from "@/api/orders"
import type { SavedAddress, SavedAddressInput } from "@/api/addresses"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { updateProfile } from "@/api/users"
import { useOrders } from "@/hooks/useOrders"
import {
  useDeleteAddress,
  useSaveAddress,
  useSavedAddresses
} from "@/hooks/useSavedAddresses"
import { useToast } from "@/components/providers/ToastProvider"

interface AddressFormState {
  id?: number
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

const emptyAddressForm: AddressFormState = {
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

export default function ProfilePage() {
  const { user, setUser } = useAuth()
  const { toast } = useToast()
  const { data: orders = [] } = useOrders()
  const { data: savedAddresses = [] } = useSavedAddresses(Boolean(user?.id))
  const saveAddressMutation = useSaveAddress()
  const deleteAddressMutation = useDeleteAddress()
  const [name, setName] = useState(user?.name ?? "")
  const [email, setEmail] = useState(user?.email ?? "")
  const [addressForm, setAddressForm] = useState<AddressFormState>({
    ...emptyAddressForm,
    fullName: user?.name ?? "",
    email: user?.email ?? ""
  })

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (nextUser) => {
      setUser(nextUser)
      toast({
        title: "Profile updated",
        description: "Your account details were saved.",
        variant: "success"
      })
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "Profile changes could not be saved.",
        variant: "error"
      })
    }
  })

  const recentOrders = orders.slice(0, 3)
  const hasAddressDraft =
    addressForm.label.trim().length > 0 ||
    addressForm.addressLine1.trim().length > 0 ||
    addressForm.city.trim().length > 0

  useEffect(() => {
    if (!user?.id) {
      return
    }

    setAddressForm((current) => ({
      ...current,
      fullName: user.name,
      email: user.email
    }))
  }, [user?.email, user?.id, user?.name])

  const updateAddressForm = <K extends keyof AddressFormState>(key: K, value: AddressFormState[K]) => {
    setAddressForm((current) => ({
      ...current,
      [key]: value
    }))
  }

  const resetAddressForm = () => {
    setAddressForm({
      ...emptyAddressForm,
      fullName: user?.name ?? "",
      email: user?.email ?? ""
    })
  }

  const handleSaveAddress = () => {
    if (!user?.id) {
      return
    }

    if (
      addressForm.label.trim().length < 2 ||
      addressForm.fullName.trim().length < 2 ||
      addressForm.phone.trim().length < 10 ||
      addressForm.addressLine1.trim().length < 5 ||
      addressForm.city.trim().length < 2 ||
      addressForm.state.trim().length < 2 ||
      addressForm.country.trim().length < 2 ||
      addressForm.pincode.trim().length < 4
    ) {
      toast({
        title: "Address incomplete",
        description: "Fill in all required delivery address fields before saving.",
        variant: "error"
      })
      return
    }

    const payload: SavedAddressInput = {
      label: addressForm.label.trim(),
      fullName: addressForm.fullName.trim(),
      email: addressForm.email.trim(),
      phone: addressForm.phone.trim(),
      addressLine1: addressForm.addressLine1.trim(),
      addressLine2: addressForm.addressLine2.trim(),
      city: addressForm.city.trim(),
      state: addressForm.state.trim(),
      country: addressForm.country.trim(),
      pincode: addressForm.pincode.trim()
    }

    saveAddressMutation.mutate(
      {
        id: addressForm.id,
        data: payload
      },
      {
        onSuccess: () => {
          resetAddressForm()
        }
      }
    )
  }

  useEffect(() => {
    if (!addressForm.id) {
      return
    }

    const selectedAddressExists = savedAddresses.some((address) => address.id === addressForm.id)

    if (!selectedAddressExists) {
      resetAddressForm()
    }
  }, [addressForm.id, savedAddresses, user?.email, user?.name])

  const handleEditAddress = (address: SavedAddress) => {
    setAddressForm({
      id: address.id,
      label: address.label,
      fullName: address.fullName,
      email: address.email,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 ?? "",
      city: address.city,
      state: address.state,
      country: address.country,
      pincode: address.pincode
    })
  }

  const handleRemoveAddress = (addressId: number) => {
    if (!user?.id) {
      return
    }

    deleteAddressMutation.mutate(addressId)
  }

  return (
    <div className="page-shell flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="page-section py-8 md:py-10">
          <div className="mb-8">
            <p className="section-kicker">Profile</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Manage your account</h1>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-white/70 bg-white/85 py-0 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.45)]">
            <CardHeader className="border-b bg-background/80 py-5">
              <CardTitle className="text-xl">My Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <Input className="h-11 rounded-xl bg-white" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <Input
                    type="email"
                    className="h-11 rounded-xl bg-white"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="mt-1 font-medium">{user?.role ?? "BUYER"}</p>
                </div>
                <div className="rounded-xl border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">Member since</p>
                  <p className="mt-1 font-medium">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "Recently"}
                  </p>
                </div>
              </div>
              <Button
                className="w-full rounded-xl sm:w-auto"
                onClick={() => mutation.mutate({ name, email })}
                disabled={mutation.isPending}
              >
              {mutation.isPending ? "Saving..." : "Save changes"}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-white/70 bg-white/85 py-0 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.45)]">
            <CardHeader className="border-b bg-background/80 py-5">
              <CardTitle className="text-xl">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {recentOrders.length === 0 ? (
                <p className="text-sm text-muted-foreground">You have not placed any orders yet.</p>
              ) : (
                recentOrders.map((order: Order) => (
                  <div key={order.id} className="rounded-2xl border bg-white/70 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {order.items.length} item{order.items.length === 1 ? "" : "s"}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
          </div>

          <Card className="mt-6 border-white/70 bg-white/85 py-0 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.45)]">
            <CardHeader className="border-b bg-background/80 py-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-accent p-3 text-accent-foreground">
                    <MapPinHouse className="size-5" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Saved Addresses</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">Store delivery addresses for faster checkout.</p>
                  </div>
                </div>
                <Button variant="outline" className="rounded-full bg-white" onClick={resetAddressForm}>
                  <Plus className="size-4" />
                  New address
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-6 xl:grid-cols-[1fr_1.15fr]">
                <div className="space-y-4">
                  {savedAddresses.length === 0 ? (
                    <div className="rounded-[1.5rem] border border-dashed bg-muted/20 p-6 text-sm text-muted-foreground">
                      No saved addresses yet. Add one below to reuse it during checkout.
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
                      {savedAddresses.map((address) => (
                        <div key={address.id} className="rounded-[1.75rem] border bg-white/80 p-5 shadow-sm">
                          <span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-accent-foreground">
                            {address.label}
                          </span>
                          <div className="mt-4 space-y-2 text-sm">
                            <p className="font-medium text-slate-950">{address.fullName}</p>
                            <p className="text-muted-foreground">{address.addressLine1}</p>
                            {address.addressLine2 ? (
                              <p className="text-muted-foreground">{address.addressLine2}</p>
                            ) : null}
                            <p className="text-muted-foreground">{address.city}, {address.state}</p>
                            <p className="text-muted-foreground">{address.country} - {address.pincode}</p>
                            <p className="text-muted-foreground">{address.phone}</p>
                          </div>
                          <div className="mt-5 flex flex-wrap gap-3">
                            <Button variant="outline" className="rounded-full bg-white" onClick={() => handleEditAddress(address)}>
                              <Pencil className="size-4" />
                              Edit
                            </Button>
                            <Button variant="outline" className="rounded-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleRemoveAddress(address.id)}>
                              <Trash2 className="size-4" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-[1.75rem] border bg-white/80 p-5">
                  <div className="mb-5">
                    <h3 className="text-lg font-semibold">
                      {addressForm.id ? "Edit address" : "Add a new address"}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">These details will be available in checkout.</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address-label">Address label</Label>
                      <Input id="address-label" className="h-11 rounded-xl bg-white" value={addressForm.label} onChange={(event) => updateAddressForm("label", event.target.value)} placeholder="Home, Office, Parents' house" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address-fullName">Full name</Label>
                      <Input id="address-fullName" className="h-11 rounded-xl bg-white" value={addressForm.fullName} onChange={(event) => updateAddressForm("fullName", event.target.value)} placeholder="Recipient full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address-email">Email</Label>
                      <Input id="address-email" type="email" className="h-11 rounded-xl bg-white" value={addressForm.email} onChange={(event) => updateAddressForm("email", event.target.value)} placeholder="Email address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address-phone">Phone</Label>
                      <Input id="address-phone" className="h-11 rounded-xl bg-white" value={addressForm.phone} onChange={(event) => updateAddressForm("phone", event.target.value)} placeholder="Phone number" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address-line1">Address line 1</Label>
                      <Input id="address-line1" className="h-11 rounded-xl bg-white" value={addressForm.addressLine1} onChange={(event) => updateAddressForm("addressLine1", event.target.value)} placeholder="Street address, house number" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address-line2">Address line 2</Label>
                      <Input id="address-line2" className="h-11 rounded-xl bg-white" value={addressForm.addressLine2} onChange={(event) => updateAddressForm("addressLine2", event.target.value)} placeholder="Apartment, suite, landmark" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address-city">City</Label>
                      <Input id="address-city" className="h-11 rounded-xl bg-white" value={addressForm.city} onChange={(event) => updateAddressForm("city", event.target.value)} placeholder="City" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address-state">State</Label>
                      <Input id="address-state" className="h-11 rounded-xl bg-white" value={addressForm.state} onChange={(event) => updateAddressForm("state", event.target.value)} placeholder="State" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address-country">Country</Label>
                      <Input id="address-country" className="h-11 rounded-xl bg-white" value={addressForm.country} onChange={(event) => updateAddressForm("country", event.target.value)} placeholder="Country" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address-pincode">Pincode</Label>
                      <Input id="address-pincode" className="h-11 rounded-xl bg-white" value={addressForm.pincode} onChange={(event) => updateAddressForm("pincode", event.target.value)} placeholder="Postal code" />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button className="rounded-xl" onClick={handleSaveAddress}>
                      {saveAddressMutation.isPending
                        ? "Saving..."
                        : addressForm.id
                          ? "Update address"
                          : "Save address"}
                    </Button>
                    {hasAddressDraft ? (
                      <Button variant="outline" className="rounded-xl bg-white" onClick={resetAddressForm}>
                        Clear
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  )
}
