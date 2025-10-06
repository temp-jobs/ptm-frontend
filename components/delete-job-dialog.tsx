"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useToast } from "@/hooks/use-toast"

interface DeleteJobDialogProps {
  jobId: string
  jobTitle: string
  onDelete: (jobId: string) => void
}

export function DeleteJobDialog({ jobId, jobTitle, onDelete }: DeleteJobDialogProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { t } = useLanguage()
  const { toast } = useToast()

  const handleDelete = async () => {
    setIsDeleting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onDelete(jobId)

    toast({
      title: t("employer.jobDeleted"),
      description: `"${jobTitle}" has been removed from your job postings.`,
    })

    setIsDeleting(false)
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Job Posting</AlertDialogTitle>
          <AlertDialogDescription>
            {t("employer.confirmDelete")}
            <br />
            <br />
            <span className="font-semibold text-foreground">"{jobTitle}"</span>
            <br />
            <br />
            This action cannot be undone. All applicant data for this job will be preserved but the job will no longer
            be visible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>{t("common.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            {isDeleting ? "Deleting..." : t("common.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
