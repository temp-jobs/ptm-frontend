'use client'

import * as React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Briefcase, User } from 'lucide-react'

import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/hooks/use-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'job_seeker' | 'employer'>('job_seeker')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login(email, password, role)
      toast({
        title: 'Login successful',
        description: 'Welcome back to PartTimeMatch!',
      })
      router.push(role === 'job_seeker' ? '/dashboard' : '/employer/dashboard')
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error?.message || 'Please check your credentials and try again.',
        variant: 'destructive',
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
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">Login to your PartTimeMatch account</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={role} onValueChange={(val) => setRole(val as 'job_seeker' | 'employer')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="job_seeker" className="gap-2">
                  <User className="h-4 w-4" /> Job Seeker
                </TabsTrigger>
                <TabsTrigger value="employer" className="gap-2">
                  <Briefcase className="h-4 w-4" /> Employer
                </TabsTrigger>
              </TabsList>

              {['job_seeker', 'employer'].map((tab) => (
                <TabsContent key={tab} value={tab}>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`email-${tab}`}>Email</Label>
                      <Input
                        id={`email-${tab}`}
                        type="email"
                        placeholder={tab === 'employer' ? 'you@company.com' : 'you@example.com'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`password-${tab}`}>Password</Label>
                      <Input
                        id={`password-${tab}`}
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Logging in...' : `Login as ${tab === 'employer' ? 'Employer' : 'Job Seeker'}`}
                    </Button>
                  </form>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              {"Don't have an account? "}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
