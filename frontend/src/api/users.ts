import api from "@/lib/api"
import type { SessionUser } from "@/lib/auth-storage"

export interface UpdateProfileInput {
  name: string
  email: string
}

export const getProfile = async () => {
  const res = await api.get("/users/me")
  return res.data.data as SessionUser
}

export const updateProfile = async (data: UpdateProfileInput) => {
  const res = await api.patch("/users/me", data)
  return res.data.data as SessionUser
}
