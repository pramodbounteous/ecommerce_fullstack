import api from "@/lib/api"

export interface AuthPayload {
  user: {
    id: number
    name: string
    email: string
    role: string
    createdAt?: string
  }
  accessToken: string
  refreshToken: string
}

export const registerUser = async (data: {
  name: string
  email: string
  password: string
}) => {
  const res = await api.post("/auth/register", data)
  return res.data.data as AuthPayload
}

export const loginUser = async (data: {
  email: string
  password: string
}) => {
  const res = await api.post("/auth/login", data)
  return res.data.data as AuthPayload
}

export const refreshSession = async (refreshToken: string) => {
  const res = await api.post("/auth/refresh", { refreshToken })
  return res.data.data as AuthPayload
}

export const logoutUser = async (refreshToken: string) => {
  const res = await api.post("/auth/logout", { refreshToken })
  return res.data
}
