import { MapPinHouse } from "lucide-react"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import type { Order } from "@/api/orders"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { updateProfile } from "@/api/users"
import { useOrders } from "@/hooks/useOrders"
import { useToast } from "@/components/providers/ToastProvider"

export default function ProfilePage() {
  const { user, setUser } = useAuth()
  const { toast } = useToast()
  const { data: orders = [] } = useOrders()
  const [name, setName] = useState(user?.name ?? "")
  const [email, setEmail] = useState(user?.email ?? "")

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
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-accent p-3 text-accent-foreground">
                  <MapPinHouse className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-xl">Address Entry</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">Delivery addresses are entered manually during checkout for each order.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="rounded-[1.5rem] border border-dashed bg-muted/20 p-6 text-sm text-muted-foreground">
                Saved addresses have been removed from the app. You can still place orders normally by entering your shipping address during checkout.
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  )
}
