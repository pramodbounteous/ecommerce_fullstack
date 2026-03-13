import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios"

import {
  clearStoredSession,
  getAccessToken,
  getRefreshToken,
  setStoredSession
} from "@/lib/auth-storage"

const api = axios.create({
  baseURL: "https://ecommerce-fullstack-backend-ak7d.onrender.com/api"
})

let refreshPromise: Promise<string> | null = null
let unauthorizedHandler: (() => void) | null = null

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

export function bindUnauthorizedHandler(handler: () => void) {
  unauthorizedHandler = handler
}

api.interceptors.request.use((config) => {
  const token = getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string }>) => {
    const originalRequest = error.config as RetryRequestConfig | undefined

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error)
    }

    const refreshToken = getRefreshToken()

    if (!refreshToken) {
      clearStoredSession()
      unauthorizedHandler?.()
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .post("http://localhost:5000/api/auth/refresh", { refreshToken })
          .then((response) => {
            const session = response.data.data
            setStoredSession(session)
            return session.accessToken as string
          })
          .finally(() => {
            refreshPromise = null
          })
      }

      const accessToken = await refreshPromise
      originalRequest.headers.Authorization = `Bearer ${accessToken}`
      return api(originalRequest)
    } catch (refreshError) {
      clearStoredSession()
      unauthorizedHandler?.()
      return Promise.reject(refreshError)
    }
  }
)

export default api
