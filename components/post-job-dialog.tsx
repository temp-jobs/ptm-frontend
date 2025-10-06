"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { PlusCircle } from "lucide-react"
import { categories, jobTypes, type ExtendedJob } from "@/lib/mock-data"
import { useLanguage } from "@/lib/language-context"

interface PostJobDialogProps {
  job?: ExtendedJob
  onJobPosted?: (job: ExtendedJob) => void
  onJobUpdated?: (job: ExtendedJob) => void
}

export function PostJobDialog({ job, onJobPosted, onJobUpdated }: PostJobDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { t } = useLanguage()
  const isEditing = !!job

  const API_BASE = "http://localhost:4000/api/v1/jobs"

  const initialForm = {
    title: "",
    company: "",
    category: "",
    jobType: "",
    location: "",
    salary: "",
    description: "",
    requirements: "",
    hoursPerWeek: "",
    contactEmail: "",
  }

  const [formData, setFormData] = useState(initialForm)

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        company: job.company,
        category: job.category,
        jobType: job.type.toUpperCase(),
        location: job.location,
        salary: job.salary,
        description: job.description,
        requirements: job.requirements.join("\n"),
        hoursPerWeek: job.hoursPerWeek || "",
        contactEmail: job.contactEmail || "",
      })
    }
  }, [job])

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const validations: { field: keyof typeof formData; message: string; test?: (val: string) => boolean }[] = [
      { field: "title", message: "Job title is required", test: (v) => !!v.trim() },
      { field: "company", message: "Company name is required", test: (v) => !!v.trim() },
      { field: "category", message: "Please select a category", test: (v) => !!v },
      { field: "jobType", message: "Please select a job type", test: (v) => !!v },
      { field: "location", message: "Location is required", test: (v) => !!v.trim() },
      { field: "salary", message: "Salary range is required", test: (v) => !!v.trim() },
      { field: "description", message: "Job description must be at least 50 characters", test: (v) => v.trim().length >= 50 },
      { field: "requirements", message: "Requirements are required", test: (v) => !!v.trim() },
      { field: "contactEmail", message: "Valid contact email is required", test: (v) => v.includes("@") },
    ]

    for (const v of validations) {
      const value = formData[v.field]
      if (v.test && !v.test(value)) {
        toast({ title: "Validation Error", description: v.message, variant: "destructive" })
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const payload = {
        ...formData,
        requirements: formData.requirements.split("\n").filter((r) => r.trim()),
      }

      const res = await fetch(isEditing ? `${API_BASE}/${job?.id}` : API_BASE, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to post job")
      }

      const savedJob: ExtendedJob = data.job
      if (isEditing) {
        onJobUpdated?.(savedJob)
        toast({ title: t("employer.jobUpdated"), description: "Job updated successfully." })
      } else {
        onJobPosted?.(savedJob)
        toast({ title: t("employer.jobPosted"), description: "Your job is now live." })
        setFormData(initialForm)
      }

      setOpen(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong while saving the job.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputFields: { label: string; field: keyof typeof formData; placeholder: string; type?: string }[] = [
    { label: t("employer.jobTitle"), field: "title", placeholder: "e.g. Content Writer" },
    { label: t("employer.company"), field: "company", placeholder: "Your company name" },
    { label: t("employer.location"), field: "location", placeholder: "e.g. Mumbai or Remote" },
    { label: t("employer.salary"), field: "salary", placeholder: "e.g. ₹15,000 - ₹25,000/month" },
    { label: t("employer.hoursPerWeek"), field: "hoursPerWeek", placeholder: "e.g. 20-30 hours" },
    { label: t("employer.contactEmail"), field: "contactEmail", placeholder: "hr@company.com", type: "email" },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <Button variant="outline" size="sm">{t("common.edit")}</Button>
        ) : (
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
            <PlusCircle className="w-4 h-4" />
            {t("employer.postNewJob")}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? t("employer.updateJob") : t("employer.postJob")}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update your job posting details." : "Fill in the details to create a new job posting."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {inputFields.map((f) => (
            <div key={f.field} className="space-y-2">
              <Label htmlFor={f.field}>{f.label}</Label>
              <Input
                id={f.field}
                type={f.type || "text"}
                placeholder={f.placeholder}
                value={formData[f.field]}
                onChange={(e) => handleChange(f.field, e.target.value)}
              />
            </div>
          ))}

          {/* Category & Job Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">{t("employer.category")}</Label>
              <Select value={formData.category} onValueChange={(v) => handleChange("category", v)}>
                <SelectTrigger id="category"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {categories.slice(1).map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-type">{t("employer.jobType")}</Label>
              <Select value={formData.jobType} onValueChange={(v) => handleChange("jobType", v)}>
                <SelectTrigger id="job-type"><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  {jobTypes.slice(1).map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description & Requirements */}
          {["description", "requirements"].map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field}>{t(`employer.${field}`)}</Label>
              <Textarea
                id={field}
                placeholder={
                  field === "description"
                    ? "Describe the role, responsibilities..."
                    : "List the key requirements (one per line)..."
                }
                rows={4}
                className="resize-none"
                value={formData[field as keyof typeof formData]}
                onChange={(e) => handleChange(field as keyof typeof formData, e.target.value)}
              />
            </div>
          ))}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
              {t("common.cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {isSubmitting
                ? isEditing
                  ? t("employer.updating")
                  : t("employer.posting")
                : isEditing
                ? t("employer.updateJob")
                : t("employer.postJob")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
