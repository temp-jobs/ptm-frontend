"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Briefcase, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { signup } = useAuth()

  const [role, setRole] = useState<"job_seeker" | "employer">("job_seeker")
  const [isLoading, setIsLoading] = useState(false)

  // Separate state for each role
  const [jobSeekerName, setJobSeekerName] = useState("")
  const [employerName, setEmployerName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const name = role === "job_seeker" ? jobSeekerName : employerName

      await signup(name, email, password, role)

      toast({
        title: "Account created successfully!",
        description: "Welcome to PartTimeMatch!",
      })

      // Redirect based on role
      router.push(role === "job_seeker" ? "/profile/create" : "/employer/dashboard")
    } catch (error: any) {
      console.error("Signup failed:", error)
      toast({
        title: "Signup failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center px-4 py-12 bg-muted/30">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">Join PartTimeMatch and start your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={role}
              onValueChange={(value) => setRole(value as "job_seeker" | "employer")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="job_seeker" className="gap-2">
                  <User className="h-4 w-4" />
                  Job Seeker
                </TabsTrigger>
                <TabsTrigger value="employer" className="gap-2">
                  <Briefcase className="h-4 w-4" />
                  Employer
                </TabsTrigger>
              </TabsList>

              {/* Job Seeker Form */}
              <TabsContent value="job_seeker">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={jobSeekerName}
                      onChange={(e) => setJobSeekerName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Sign up as Job Seeker"}
                  </Button>
                </form>
              </TabsContent>

              {/* Employer Form */}
              <TabsContent value="employer">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-employer">Company Name</Label>
                    <Input
                      id="name-employer"
                      type="text"
                      placeholder="Your Company"
                      value={employerName}
                      onChange={(e) => setEmployerName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-employer">Email</Label>
                    <Input
                      id="email-employer"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-employer">Password</Label>
                    <Input
                      id="password-employer"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Sign up as Employer"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
