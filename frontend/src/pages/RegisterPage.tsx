import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import AuthCard from "@/components/ui/auth/AuthCard"
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
      subtitle="Sign up to start shopping"
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          Register
        </Button>

      </form>

      <p className="text-sm text-center text-gray-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-foreground"
        >
          Login
        </Link>
      </p>

    </AuthCard>

  )
}
