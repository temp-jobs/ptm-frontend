"use client"

import { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Mail, Phone, CheckCircle, XCircle, Search, Filter, Calendar, Award } from "lucide-react"
import { mockApplicants, type ExtendedJob, type Applicant } from "@/lib/mock-data"
import { useLanguage } from "@/lib/language-context"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ApplicantsModalProps {
  job: ExtendedJob
  onClose: () => void
}

export function ApplicantsModal({ job, onClose }: ApplicantsModalProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [applicants, setApplicants] = useState<Applicant[]>(
    mockApplicants.filter((applicant) => applicant.jobId === job.id),
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "applied" | "accepted" | "rejected">("all")

  // Filter applicants
  const filteredApplicants = useMemo(() => {
    let filtered = applicants

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((applicant) => applicant.status === statusFilter)
    }

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(
        (applicant) =>
          applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          applicant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          applicant.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    return filtered
  }, [applicants, searchQuery, statusFilter])

  const handleApprove = async (applicantId: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setApplicants(
      applicants.map((applicant) =>
        applicant.id === applicantId ? { ...applicant, status: "accepted" as const } : applicant,
      ),
    )

    const applicant = applicants.find((a) => a.id === applicantId)
    toast({
      title: t("employer.applicantApproved"),
      description: `${applicant?.name} has been approved for ${job.title}`,
    })
  }

  const handleReject = async (applicantId: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setApplicants(
      applicants.map((applicant) =>
        applicant.id === applicantId ? { ...applicant, status: "rejected" as const } : applicant,
      ),
    )

    const applicant = applicants.find((a) => a.id === applicantId)
    toast({
      title: t("employer.applicantRejected"),
      description: `${applicant?.name}'s application has been rejected`,
      variant: "destructive",
    })
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-2xl">
            {t("employer.applicantsFor")} "{job.title}"
          </DialogTitle>
          <DialogDescription>
            {applicants.length} {applicants.length === 1 ? "applicant" : "applicants"} for this position
          </DialogDescription>
        </DialogHeader>

        {/* Filters */}
        <div className="px-6 py-4 border-b bg-muted/30">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("employer.searchApplicants")}
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
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="applied">{t("status.applied")}</SelectItem>
                <SelectItem value="accepted">{t("status.accepted")}</SelectItem>
                <SelectItem value="rejected">{t("status.rejected")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Applicants List */}
        <ScrollArea className="h-[500px] px-6">
          {filteredApplicants.length > 0 ? (
            <div className="space-y-4 py-4">
              {filteredApplicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="group p-4 border-2 rounded-lg hover:border-primary/50 transition-all duration-300 hover:shadow-md space-y-4"
                >
                  {/* Applicant Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg">{applicant.name}</h3>
                        <div className="flex flex-col gap-1 mt-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">{applicant.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{applicant.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        applicant.status === "accepted"
                          ? "default"
                          : applicant.status === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                      className="capitalize flex-shrink-0"
                    >
                      {t(`status.${applicant.status}`)}
                    </Badge>
                  </div>

                  {/* Applicant Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{t("employer.experience")}:</span>
                        <span className="text-muted-foreground">{applicant.experience}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{t("employer.appliedOn")}:</span>
                        <span className="text-muted-foreground">
                          {new Date(applicant.appliedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">{t("employer.skills")}:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {applicant.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
                      {t("employer.viewProfile")}
                    </Button>
                    {applicant.status === "applied" && (
                      <>
                        <Button
                          size="sm"
                          className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleApprove(applicant.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1.5" />
                          {t("employer.approve")}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex-1 sm:flex-none"
                          onClick={() => handleReject(applicant.id)}
                        >
                          <XCircle className="w-4 h-4 mr-1.5" />
                          {t("employer.reject")}
                        </Button>
                      </>
                    )}
                    {applicant.status === "accepted" && (
                      <Badge variant="default" className="ml-auto">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approved
                      </Badge>
                    )}
                    {applicant.status === "rejected" && (
                      <Badge variant="destructive" className="ml-auto">
                        <XCircle className="w-3 h-3 mr-1" />
                        Rejected
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery || statusFilter !== "all"
                  ? "No applicants match your filters"
                  : t("employer.noApplicants")}
              </p>
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredApplicants.length} of {applicants.length} applicants
            </div>
            <Button variant="outline" onClick={onClose}>
              {t("common.close")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
