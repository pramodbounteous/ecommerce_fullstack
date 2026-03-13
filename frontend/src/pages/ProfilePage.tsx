import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
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
    <div className="flex min-h-screen flex-col bg-muted/20">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:px-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-border/70 py-0">
            <CardHeader className="border-b bg-background/80 py-5">
              <CardTitle className="text-xl">My Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <Input value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <Input
                    type="email"
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
                className="w-full sm:w-auto"
                onClick={() => mutation.mutate({ name, email })}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Saving..." : "Save changes"}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/70 py-0">
            <CardHeader className="border-b bg-background/80 py-5">
              <CardTitle className="text-xl">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {recentOrders.length === 0 ? (
                <p className="text-sm text-muted-foreground">You have not placed any orders yet.</p>
              ) : (
                recentOrders.map((order: any) => (
                  <div key={order.id} className="rounded-xl border p-4">
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
        </section>
      </main>
      <Footer />
    </div>
  )
}
