"use client"

import { PostJobDialog } from "@/components/post-job-dialog"
import type { ExtendedJob } from "@/lib/mock-data"

interface EditJobDialogProps {
  job: ExtendedJob
  onJobUpdated: (job: ExtendedJob) => void
}

export function EditJobDialog({ job, onJobUpdated }: EditJobDialogProps) {
  return <PostJobDialog job={job} onJobUpdated={onJobUpdated} />
}
