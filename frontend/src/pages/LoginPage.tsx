import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import AuthCard from "@/components/ui/auth/AuthCard"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { loginUser } from "@/api/auth"
import { useToast } from "@/components/providers/ToastProvider"
import { useAuth } from "@/context/AuthContext"

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const { toast } = useToast()
  const redirectTo =
    typeof location.state === "object" &&
    location.state !== null &&
    "from" in location.state &&
    typeof location.state.from === "string"
      ? location.state.from
      : "/"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const session = await loginUser({
        email,
        password
      })

      login(session)
      toast({
        title: "Login successful",
        description: "You are now signed in.",
        variant: "success"
      })

      navigate(redirectTo)
    } catch {
      toast({
        title: "Login failed",
        description: "Check your email and password and try again.",
        variant: "error"
      })
    }
  }

  return (
    <AuthCard
      title="Sign in"
      subtitle="Continue to your account and resume shopping"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-xl bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <Input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 rounded-xl bg-white"
          />
        </div>

        <Button className="h-11 w-full rounded-xl">
          Continue
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-foreground hover:text-primary"
        >
          Register
        </Link>
      </p>
    </AuthCard>
  )
}
