import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import AuthCard from "@/components/ui/auth/AuthCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { registerUser } from "@/api/auth"

export default function RegisterPage() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await registerUser({
      name,
      email,
      password
    })

    navigate("/login")
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

        <Button className="w-full bg-slate-800 text-white">
          Register
        </Button>

      </form>

      <p className="text-sm text-center text-gray-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-purple-600 font-medium"
        >
          Login
        </Link>
      </p>

    </AuthCard>

  )
}