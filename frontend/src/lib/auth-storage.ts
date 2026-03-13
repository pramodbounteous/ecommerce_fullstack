export interface SessionUser {
  id: number
  name: string
  email: string
  role: string
  createdAt?: string
}

export interface AuthSession {
  accessToken: string
  refreshToken: string
  user: SessionUser
}

const ACCESS_TOKEN_KEY = "token"
const REFRESH_TOKEN_KEY = "refreshToken"
const USER_KEY = "authUser"

export function getStoredSession(): AuthSession | null {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
  const rawUser = localStorage.getItem(USER_KEY)

  if (!accessToken || !refreshToken || !rawUser) {
    return null
  }

  try {
    return {
      accessToken,
      refreshToken,
      user: JSON.parse(rawUser) as SessionUser
    }
  } catch {
    clearStoredSession()
    return null
  }
}

export function setStoredSession(session: AuthSession) {
  localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken)
  localStorage.setItem(USER_KEY, JSON.stringify(session.user))
}

export function clearStoredSession() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}
