import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import AuthCard from "@/components/ui/auth/AuthCard"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { registerUser } from "@/api/auth"
import { useToast } from "@/components/providers/ToastProvider"

export default function RegisterPage() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await registerUser({
        name,
        email,
        password
      })

      toast({
        title: "Account created",
        description: "You can now sign in.",
        variant: "success"
      })

      navigate("/login")
    } catch {
      toast({
        title: "Registration failed",
        description: "Please review your details and try again.",
        variant: "error"
      })
    }
  }

  return (
    <AuthCard
      title="Create account"
      subtitle="Set up your account to save orders and shop faster"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="register-name">Name</Label>
          <Input
            id="register-name"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 rounded-xl bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-email">Email</Label>
          <Input
            id="register-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-xl bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-password">Password</Label>
          <Input
            id="register-password"
            type="password"
            placeholder="Create a secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 rounded-xl bg-white"
          />
        </div>

        <Button className="h-11 w-full rounded-xl">
          Register
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-foreground hover:text-primary"
        >
          Login
        </Link>
      </p>
    </AuthCard>
  )
}
