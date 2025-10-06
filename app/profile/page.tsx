"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, FileText } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("parttimematch_token")
      if (!token) {
        router.push("/login")
        return
      }

      try {
        const res = await fetch("http://localhost:4000/api/v1/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error("Failed to fetch profile")

        const data = await res.json()
        const profileUser = data.user || data

        if (!profileUser.profileCompleted) {
          router.push("/profile/create")
          return
        }

        setUser(profileUser)
      } catch (err: any) {
        console.error(err)
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  // if (loading)
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="w-16 h-16 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
  //     </div>
  //   )

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    )

  if (!user) return null

  return (
    <ProtectedRoute requiredRole="job_seeker">
      <div className="min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold cursor-pointer"
            >
              My Profile
            </motion.h1>

            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="cursor-pointer">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                    {user.photoUrl ? (
                      <img
                        src={user.photoUrl}
                        alt={user.name}
                        className="w-28 h-28 rounded-full object-cover cursor-pointer"
                      />
                    ) : (
                      <User className="w-12 h-12 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                    {user.phone && <p className="text-muted-foreground">{user.phone}</p>}
                    {user.location && <p className="text-muted-foreground">{user.location}</p>}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* About */}
            {user.about && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="cursor-pointer">
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{user.about}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Skills */}
            {user.skills?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="cursor-pointer">
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {user.skills.map((skill: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="cursor-pointer">
                        {skill}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Availability */}
            {user.availability && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="cursor-pointer">
                  <CardHeader>
                    <CardTitle>Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{user.availability}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Documents */}
            {user.documents?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="cursor-pointer">
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {user.documents.map((doc: any) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-2 border rounded hover:border-primary/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                          <p className="text-sm">{doc.name}</p>
                        </div>
                        {doc.verified ? (
                          <Badge className="bg-green-500/10 text-green-700 border-green-500/20 cursor-pointer">
                            Verified
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-500/20 cursor-pointer">
                            Pending
                          </Badge>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Edit Profile Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-end"
            >
              <Button asChild className="cursor-pointer">
                <Link href="/dashboard/edit-profile">Edit Profile</Link>
              </Button>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
