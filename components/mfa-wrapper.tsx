"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { MFAVerification } from "@/components/mfa-verification"

export function MFAWrapper({ children }: { children: React.ReactNode }) {
  const { requireMFA } = useAuth()

  // Show MFA verification screen if required
  if (requireMFA) {
    return <MFAVerification />
  }

  return <>{children}</>
}
