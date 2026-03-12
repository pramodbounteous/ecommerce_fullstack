import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import AuthCard from "@/components/ui/auth/AuthCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { loginUser } from "@/api/auth"
import { useAuth } from "@/context/AuthContext"

export default function LoginPage() {

  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await loginUser({
      email,
      password
    })

    login(res.data.accessToken)

    navigate("/")
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

        <Button className="w-full bg-slate-800 text-white">
          Continue
        </Button>

      </form>

      <p className="text-sm text-center text-gray-500">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-purple-600 font-medium"
        >
          Register
        </Link>
      </p>

    </AuthCard>

  )
}