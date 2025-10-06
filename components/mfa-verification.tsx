"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { Shield, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function MFAVerification() {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { verifyMFA } = useAuth()
  const { toast } = useToast()

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const success = await verifyMFA(code)

    if (success) {
      toast({
        title: "Verification successful",
        description: "You have been logged in successfully.",
      })
    } else {
      toast({
        title: "Verification failed",
        description: "Invalid verification code. Please try again.",
        variant: "destructive",
      })
      setCode("")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Enter the 6-digit verification code sent to your email or phone to complete login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                maxLength={6}
                className="text-center text-2xl tracking-widest"
                required
              />
              <p className="text-xs text-muted-foreground text-center">For demo purposes, enter any 6-digit code</p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || code.length !== 6}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify & Continue"
              )}
            </Button>

            <div className="text-center">
              <Button type="button" variant="link" className="text-sm">
                Resend Code
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
