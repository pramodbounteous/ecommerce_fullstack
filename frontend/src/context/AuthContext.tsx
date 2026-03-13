import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"

import { getProfile } from "@/api/users"
import { logoutUser as logoutRequest } from "@/api/auth"
import {
  clearStoredSession,
  getStoredSession,
  setStoredSession,
  type SessionUser
} from "@/lib/auth-storage"
import { bindUnauthorizedHandler } from "@/lib/api"

interface AuthContextType {
  token: string | null
  user: SessionUser | null
  isAuthenticated: boolean
  isReady: boolean
  login: (session: {
    accessToken: string
    refreshToken: string
    user: SessionUser
  }) => void
  logout: () => Promise<void>
  setUser: (user: SessionUser) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const session = getStoredSession()
  const [token, setToken] = useState<string | null>(session?.accessToken ?? null)
  const [user, setUserState] = useState<SessionUser | null>(session?.user ?? null)
  const [isReady, setIsReady] = useState(false)

  const login = (nextSession: {
    accessToken: string
    refreshToken: string
    user: SessionUser
  }) => {
    setStoredSession(nextSession)
    setToken(nextSession.accessToken)
    setUserState(nextSession.user)
  }

  const logout = async () => {
    const current = getStoredSession()

    if (current?.refreshToken) {
      try {
        await logoutRequest(current.refreshToken)
      } catch {
        // Ignore logout failures and clear local state regardless.
      }
    }

    clearStoredSession()
    setToken(null)
    setUserState(null)
  }

  const setUser = (nextUser: SessionUser) => {
    const current = getStoredSession()
    if (current) {
      setStoredSession({
        ...current,
        user: nextUser
      })
    }
    setUserState(nextUser)
  }

  useEffect(() => {
    bindUnauthorizedHandler(() => {
      void logout()
    })

    if (!token) {
      setIsReady(true)
      return
    }

    getProfile()
      .then((profile) => {
        setUser(profile)
      })
      .catch(() => {
        void logout()
      })
      .finally(() => {
        setIsReady(true)
      })
  }, [])

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      isReady,
      login,
      logout,
      setUser
    }),
    [isReady, token, user]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("AuthContext not found")
  return context
}
