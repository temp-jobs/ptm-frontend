"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

export type UserRole = "job_seeker" | "employer"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  phone?: string
  about?: string
  skills?: string[]
  availability?: string
  preferredJobTypes?: string[]
  location?: string
  avatar?: string
  mfaEnabled?: boolean
  mfaVerified?: boolean
  profileCompleted?: boolean
  dateOfBirth?: string
  age?: number
  resumeUrl?: string
  photoUrl?: string
  documents?: {
    id: string
    name: string
    type: string
    url: string
    verified: boolean
    uploadedAt: string
  }[] | null
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<void>
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  isLoading: boolean
  requireMFA: boolean
  setRequireMFA: (value: boolean) => void
  verifyMFA: (code: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [requireMFA, setRequireMFA] = useState(false)
  const router = useRouter()

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("parttimematch_user")
    if (storedUser) setUser(JSON.parse(storedUser))
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string, role: UserRole) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Login failed")

      localStorage.setItem("parttimematch_user", JSON.stringify(data.user))
      localStorage.setItem("parttimematch_token", data.token)
      setUser(data.user)

      // Redirect based on role
      if (data.user.role === "employer") router.push("/employer/dashboard")
      else if(data.user.profileCompleted === true){
        router.push('/dashboard');
      } else router.push('/profile/create');
    } catch (error: any) {
      // console.error(error)
      alert(error.message)
    }
  }

  // Signup function
  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Signup failed")

      localStorage.setItem("parttimematch_user", JSON.stringify(data.user))
      localStorage.setItem("parttimematch_token", data.token)
      setUser(data.user)

      if (data.user.role === "employer") router.push("/employer/dashboard")
      else router.push("/profile/create")
    } catch (error: any) {
      console.error(error)
      alert(error.message)
    }
  }

  // MFA Verification
  const verifyMFA = async (code: string): Promise<boolean> => {
    if (code.length !== 6) return false

    const pendingUser = localStorage.getItem("parttimematch_pending_user")
    if (!pendingUser) return false

    const user = JSON.parse(pendingUser)
    user.mfaVerified = true

    localStorage.removeItem("parttimematch_pending_user")
    localStorage.setItem("parttimematch_user", JSON.stringify(user))
    setUser(user)
    setRequireMFA(false)

    // Redirect based on profile completion
    // if (!user.profileCompleted) {
    //   if (user.role === "employer") router.push("/employer/dashboard")
    //   else router.push("/profile/create")
    // } else {
    //   if (user.role === "employer") router.push("/employer/dashboard")
    //   else router.push("/dashboard")
    // }
    return true
  }

  // Logout
  const logout = () => {
    localStorage.removeItem("parttimematch_user")
    localStorage.removeItem("parttimematch_token")
    setUser(null)
    setRequireMFA(false)
    router.push("/")
  }

  // Update profile
  const updateProfile = (updates: Partial<User>) => {
    if (!user) return
    const updatedUser = { ...user, ...updates }
    localStorage.setItem("parttimematch_user", JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, updateProfile, isLoading, requireMFA, setRequireMFA, verifyMFA }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
