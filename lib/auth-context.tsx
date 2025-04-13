"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  role: string
  profileImage?: string
  country?: string
  educationLevel?: string
  fieldOfStudy?: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: {
    name?: string
    email?: string
    country?: string
    educationLevel?: string
    fieldOfStudy?: string
  }) => Promise<void>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Session refresh interval in milliseconds (15 minutes)
const SESSION_REFRESH_INTERVAL = 15 * 60 * 1000

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error("Authentication check failed:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Set up session refresh interval
  useEffect(() => {
    if (!user) return

    // Initial refresh to extend session
    refreshSession()

    // Set up interval for periodic session refresh
    const intervalId = setInterval(refreshSession, SESSION_REFRESH_INTERVAL)

    // Clean up interval on unmount
    return () => clearInterval(intervalId)
  }, [user])

  // Add event listeners for user activity to refresh session
  useEffect(() => {
    if (!user) return

    const activityEvents = ["mousedown", "keydown", "scroll", "touchstart"]
    let activityTimeout: NodeJS.Timeout | null = null

    const handleUserActivity = () => {
      // Debounce the refresh calls to avoid too many requests
      if (activityTimeout) clearTimeout(activityTimeout)
      activityTimeout = setTimeout(refreshSession, 5000)
    }

    // Add event listeners
    activityEvents.forEach((event) => {
      window.addEventListener(event, handleUserActivity)
    })

    // Clean up event listeners
    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleUserActivity)
      })
      if (activityTimeout) clearTimeout(activityTimeout)
    }
  }, [user])

  const refreshSession = async () => {
    if (!user) return

    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Session refresh failed")
      }

      // Session successfully refreshed
      console.log("Session refreshed")
    } catch (error) {
      console.error("Session refresh failed:", error)
      // Don't log out the user immediately on refresh failure
      // The next API call will handle authentication issues
    }
  }

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      setUser(data.user)

      // The redirect is now handled in the login page component
      return data.user
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed")
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      setUser(data.user)
      router.push("/dashboard")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed")
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Logout failed")
      }

      setUser(null)

      // Ensure we redirect to home page after logout
      router.push("/")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Logout failed")
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (data: {
    name?: string
    email?: string
    country?: string
    educationLevel?: string
    fieldOfStudy?: string
  }) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || "Profile update failed")
      }

      setUser((prev) => (prev ? { ...prev, ...data } : null))
    } catch (error) {
      setError(error instanceof Error ? error.message : "Profile update failed")
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, updateProfile, refreshSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
