"use client"

import { useState, useMemo } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Users, Eye, MapPin, Clock, Search, Filter, TrendingUp, CheckCircle, Bell } from "lucide-react"
import Link from "next/link"
import { mockEmployerJobs, mockApplicants, mockEmployerNotifications, type ExtendedJob } from "@/lib/mock-data"
import { PostJobDialog } from "@/components/post-job-dialog"
import { EditJobDialog } from "@/components/edit-job-dialog"
import { DeleteJobDialog } from "@/components/delete-job-dialog"
import { useLanguage } from "@/lib/language-context"
import { useToast } from "@/hooks/use-toast"
import { JobCardSkeleton } from "@/components/job-card-skeleton"
import { ApplicantsModal } from "@/components/applicants-modal"
import { NotificationsPanel } from "@/components/notifications-panel"

export default function EmployerDashboardPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [jobs, setJobs] = useState<ExtendedJob[]>(mockEmployerJobs)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "closed">("all")
  const [sortBy, setSortBy] = useState<"newest" | "applicants" | "views">("newest")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedJobForApplicants, setSelectedJobForApplicants] = useState<ExtendedJob | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)

  // Analytics calculations
  const analytics = useMemo(() => {
    const activeJobs = jobs.filter((job) => job.status === "active").length
    const totalApplicants = jobs.reduce((sum, job) => sum + job.applicants, 0)
    const totalViews = jobs.reduce((sum, job) => sum + job.views, 0)
    const jobsFilled = jobs.filter((job) => job.status === "closed").length
    return { activeJobs, totalApplicants, totalViews, jobsFilled }
  }, [jobs])

  // Filter & sort jobs
  const filteredJobs = useMemo(() => {
    let filtered = jobs

    if (statusFilter !== "all") filtered = filtered.filter((job) => job.status === statusFilter)
    if (searchQuery)
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )

    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "newest") return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      if (sortBy === "applicants") return b.applicants - a.applicants
      if (sortBy === "views") return b.views - a.views
      return 0
    })

    return filtered
  }, [jobs, searchQuery, statusFilter, sortBy])

  const handleJobPosted = (newJob: ExtendedJob) => setJobs([newJob, ...jobs])
  const handleJobUpdated = (updatedJob: ExtendedJob) => setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)))
  const handleDeleteJob = (jobId: string) => setJobs(jobs.filter((job) => job.id !== jobId))

  const handleToggleJobStatus = (jobId: string) => {
    setJobs(
      jobs.map((job) => {
        if (job.id === jobId) {
          const newStatus = job.status === "active" ? "closed" : "active"
          toast({
            title: newStatus === "closed" ? "Job Closed" : "Job Reopened",
            description: `The job has been ${newStatus}.`,
          })
          return { ...job, status: newStatus }
        }
        return job
      }),
    )
  }

  const unreadNotifications = mockEmployerNotifications.filter((n) => !n.read).length

  return (
    <ProtectedRoute requiredRole="employer">
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navigation />

        <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{t("employer.dashboard")}</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{t("employer.manageJobs")}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {unreadNotifications}
                    </span>
                  )}
                </Button>
                <PostJobDialog onJobPosted={handleJobPosted} />
              </div>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: t("employer.activeJobs"), value: analytics.activeJobs, icon: <Briefcase className="w-6 h-6 text-teal-600" />, bg: "bg-teal-50", color: "text-teal-600" },
                { label: t("employer.totalApplicants"), value: analytics.totalApplicants, icon: <Users className="w-6 h-6 text-orange-600" />, bg: "bg-orange-50", color: "text-orange-600" },
                { label: t("employer.totalViews"), value: analytics.totalViews, icon: <Eye className="w-6 h-6 text-blue-600" />, bg: "bg-blue-50", color: "text-blue-600" },
                { label: t("employer.jobsFilled"), value: analytics.jobsFilled, icon: <CheckCircle className="w-6 h-6 text-green-600" />, bg: "bg-green-50", color: "text-green-600" },
              ].map((card, idx) => (
                <Card
                  key={idx}
                  className={`border-2 border-gray-200 dark:border-gray-700 hover:border-opacity-60 transition-all duration-300 hover:shadow-lg hover:scale-105`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{card.label}</p>
                        <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
                      </div>
                      <div className={`w-12 h-12 ${card.bg} rounded-lg flex items-center justify-center`}>{card.icon}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="jobs" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="jobs">{t("employer.myJobs")}</TabsTrigger>
                <TabsTrigger value="applicants">{t("employer.applicants")}</TabsTrigger>
              </TabsList>

              {/* Jobs Tab */}
              <TabsContent value="jobs" className="space-y-4">
                {/* Filters */}
                <Card className="shadow-sm border border-gray-200 dark:border-gray-700">
                  <CardContent className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder={t("employer.searchJobs")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                      <SelectTrigger className="w-full md:w-[180px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("employer.allJobs")}</SelectItem>
                        <SelectItem value="active">{t("employer.activeOnly")}</SelectItem>
                        <SelectItem value="closed">{t("employer.closedOnly")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                      <SelectTrigger className="w-full md:w-[180px]">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">{t("employer.newestFirst")}</SelectItem>
                        <SelectItem value="applicants">{t("employer.mostApplicants")}</SelectItem>
                        <SelectItem value="views">{t("employer.mostViews")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Jobs List */}
                <Card className="shadow-sm border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>{t("employer.postedJobs")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isLoading ? (
                      [1, 2, 3].map((i) => <JobCardSkeleton key={i} />)
                    ) : filteredJobs.length > 0 ? (
                      filteredJobs.map((job) => (
                        <div
                          key={job.id}
                          className="group flex flex-col gap-4 p-5 border rounded-lg border-gray-200 dark:border-gray-700 hover:border-primary-400 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start gap-3">
                                <Briefcase className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="flex items-start gap-2 flex-wrap">
                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{job.title}</h3>
                                    <Badge variant={job.status === "active" ? "default" : "secondary"} className="capitalize">
                                      {t(`status.${job.status}`)}
                                    </Badge>
                                  </div>
                                  <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-3.5 h-3.5" />
                                      <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-3.5 h-3.5" />
                                      <span>
                                        {Math.floor((Date.now() - new Date(job.postedDate).getTime()) / (1000 * 60 * 60 * 24))} days ago
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-sm font-medium text-primary mt-2">{job.salary}</p>
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline" className="capitalize">
                              {job.type}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1.5">
                                <Users className="w-4 h-4" />
                                <span>{job.applicants} applicants</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Eye className="w-4 h-4" />
                                <span>{job.views} views</span>
                              </div>
                            </div>
                            <div className="flex gap-2 ml-auto flex-wrap">
                              <Button variant="outline" size="sm" onClick={() => setSelectedJobForApplicants(job)} disabled={job.applicants === 0}>
                                <Users className="w-4 h-4 mr-1.5" />
                                {t("employer.viewApplicants")}
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/jobs/${job.id}`}>
                                  <Eye className="w-4 h-4 mr-1.5" />
                                  View
                                </Link>
                              </Button>
                              <EditJobDialog job={job} onJobUpdated={handleJobUpdated} />
                              <Button variant="outline" size="sm" onClick={() => handleToggleJobStatus(job.id)}>
                                {job.status === "active" ? t("employer.closeJob") : t("employer.reopenJob")}
                              </Button>
                              <DeleteJobDialog jobId={job.id} jobTitle={job.title} onDelete={handleDeleteJob} />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">{searchQuery || statusFilter !== "all" ? t("jobs.noJobs") : t("employer.noJobs")}</p>
                        {!searchQuery && statusFilter === "all" && <PostJobDialog onJobPosted={handleJobPosted} />}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Applicants Tab */}
              <TabsContent value="applicants" className="space-y-4">
                <Card className="shadow-sm border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>{t("employer.recentApplicants")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockApplicants.length > 0 ? (
                      mockApplicants.slice(0, 6).map((applicant) => {
                        const job = jobs.find((j) => j.id === applicant.jobId)
                        return (
                          <div
                            key={applicant.id}
                            className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 border rounded-lg border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Users className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900 dark:text-white">{applicant.name}</h3>
                                  <p className="text-sm text-gray-500">{applicant.email}</p>
                                  <p className="text-sm text-gray-500">{applicant.phone}</p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {t("employer.appliedOn")}: <span className="font-medium">{job?.title}</span>
                                  </p>
                                  <p className="text-xs text-gray-400">{new Date(applicant.appliedDate).toLocaleDateString("en-GB")}</p>
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {applicant.skills.slice(0, 3).map((skill) => (
                                      <Badge key={skill} variant="secondary" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge
                                variant={
                                  applicant.status === "accepted"
                                    ? "default"
                                    : applicant.status === "rejected"
                                      ? "destructive"
                                      : "secondary"
                                }
                                className="capitalize"
                              >
                                {t(`status.${applicant.status}`)}
                              </Badge>
                              <Button variant="outline" size="sm">
                                {t("employer.viewProfile")}
                              </Button>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="text-center py-12">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">{t("employer.noApplicants")}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />

        {/* Modals */}
        {selectedJobForApplicants && <ApplicantsModal job={selectedJobForApplicants} onClose={() => setSelectedJobForApplicants(null)} />}
        {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
      </div>
    </ProtectedRoute>
  )
}
