"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, BookmarkCheck, User, FileText, Clock, CheckCircle2, XCircle, Eye } from "lucide-react"
import Link from "next/link"
import { mockApplications, mockSavedJobs, mockJobs } from "@/lib/mock-data"

export default function DashboardPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "shortlisted":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
      case "reviewing":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
      case "rejected":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
      default:
        return ""
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "shortlisted":
        return <CheckCircle2 className="w-4 h-4" />
      case "reviewing":
        return <Eye className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <ProtectedRoute requiredRole="job_seeker">
      <div className="min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">My Dashboard</h1>
              <p className="text-muted-foreground">Track your applications and manage your job search</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Applications</p>
                      <p className="text-2xl font-bold">{mockApplications.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Shortlisted</p>
                      <p className="text-2xl font-bold">
                        {mockApplications.filter((app) => app.status === "shortlisted").length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Under Review</p>
                      <p className="text-2xl font-bold">
                        {mockApplications.filter((app) => app.status === "reviewing").length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Eye className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Saved Jobs</p>
                      <p className="text-2xl font-bold">{mockSavedJobs.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <BookmarkCheck className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="applications" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              {/* Applications Tab */}
              <TabsContent value="applications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {mockApplications.length > 0 ? (
                      <div className="space-y-4">
                        {mockApplications.map((application) => {
                          const job = mockJobs.find((j) => j.id === application.jobId)
                          return (
                            <div
                              key={application.id}
                              className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg hover:border-primary/50 transition-colors"
                            >
                              <div className="flex-1 space-y-2">
                                <div className="flex items-start gap-3">
                                  <Briefcase className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{application.jobTitle}</h3>
                                    <p className="text-sm text-muted-foreground">{application.company}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Applied on {new Date(application.appliedDate).toLocaleDateString("en-GB")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Badge className={`${getStatusColor(application.status)} capitalize gap-1.5`}>
                                  {getStatusIcon(application.status)}
                                  {application.status}
                                </Badge>
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/jobs/${application.jobId}`}>View Job</Link>
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">You haven't applied to any jobs yet</p>
                        <Button asChild>
                          <Link href="/jobs">Browse Jobs</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Saved Jobs Tab */}
              <TabsContent value="saved" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Jobs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {mockSavedJobs.length > 0 ? (
                      <div className="space-y-4">
                        {mockSavedJobs.map((job) => (
                          <div
                            key={job.id}
                            className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg hover:border-primary/50 transition-colors"
                          >
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start gap-3">
                                <BookmarkCheck className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg">{job.title}</h3>
                                  <p className="text-sm text-muted-foreground">{job.company}</p>
                                  <p className="text-sm font-medium text-primary mt-1">{job.salary}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/jobs/${job.id}`}>View Details</Link>
                              </Button>
                              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                                <Link href={`/jobs/${job.id}`}>Apply</Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <BookmarkCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">You haven't saved any jobs yet</p>
                        <Button asChild>
                          <Link href="/jobs">Browse Jobs</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Priya Sharma</h3>
                        <p className="text-muted-foreground">priya.sharma@example.com</p>
                        <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">About</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          Motivated student seeking part-time opportunities in content writing and digital marketing.
                          Passionate about creating engaging content and learning new skills.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Content Writing</Badge>
                          <Badge variant="secondary">Social Media</Badge>
                          <Badge variant="secondary">MS Office</Badge>
                          <Badge variant="secondary">Communication</Badge>
                          <Badge variant="secondary">Time Management</Badge>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Availability</h4>
                        <p className="text-muted-foreground">Weekdays: 4-8 PM | Weekends: Flexible</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Preferred Job Types</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="capitalize">
                            Remote
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            Hybrid
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full md:w-auto" asChild>
                      <Link href="/dashboard/edit-profile">Edit Profile</Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
