import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import AuthCard from "@/components/ui/auth/AuthCard"
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
      subtitle="Sign in or create an account"
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="w-full">
          Continue
        </Button>

      </form>

      <p className="text-sm text-center text-gray-500">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-foreground"
        >
          Register
        </Link>
      </p>

    </AuthCard>

  )
}
