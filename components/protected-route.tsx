"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { Spinner } from "./ui/spinner"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [hydrated, setHydrated] = useState(false)

  // Ensure client-side hydration
  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return

    if (!user && !isLoading) {
      router.push("/login")
      return
    }

    if (requiredRole && user?.role !== requiredRole) {
      const redirectPath = user?.role === "employer" ? "/employer/dashboard" : "/dashboard"
      router.push(redirectPath)
      return
    }

    if (user?.role === "job_seeker" && !user.profileCompleted) {
      if (window.location.pathname !== "/profile/create") {
        router.push("/profile/create")
      }
    }
  }, [user, isLoading, requiredRole, router, hydrated])

  if (!hydrated || isLoading || !user) {
    // Safe client-only loading fallback
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  return <>{children}</>
}
