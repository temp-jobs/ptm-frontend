"use client"

import type React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase, Clock, CheckCircle2, Bookmark, Heart } from "lucide-react"
import type { Job } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const daysAgo = Math.floor((new Date().getTime() - new Date(job.postedDate).getTime()) / (1000 * 60 * 60 * 24))

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to save jobs",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsSaved(!isSaved)
    setIsLoading(false)

    toast({
      title: isSaved ? "Job Unsaved" : "Job Saved",
      description: isSaved ? "Removed from your saved jobs" : "Added to your saved jobs",
    })
  }

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to like jobs",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsLiked(!isLiked)
    setIsLoading(false)
  }

  const handleViewDetails = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to view job details",
        variant: "destructive",
      })
      router.push("/login")
      return
    }
    router.push(`/jobs/${job.id}`)
  }

  return (
    <Card className="hover:border-primary/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              {job.isVerified && <CheckCircle2 className="w-5 h-5 text-primary" aria-label="Verified employer" />}
            </div>
            <p className="text-muted-foreground font-medium">{job.company}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              disabled={isLoading}
              className="hover:scale-110 transition-transform"
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              disabled={isLoading}
              className="hover:scale-110 transition-transform"
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? "fill-primary text-primary" : ""}`} />
            </Button>
            <Badge variant="secondary" className="capitalize">
              {job.type}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span>{job.category}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{daysAgo === 0 ? "Today" : `${daysAgo}d ago`}</span>
          </div>
        </div>

        <p className="text-foreground line-clamp-2 leading-relaxed">{job.description}</p>

        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="font-semibold text-primary">{job.salary}</p>
            <p className="text-xs text-muted-foreground">{job.applicants} applicants</p>
          </div>
          <Button onClick={handleViewDetails} className="hover:scale-105 transition-transform">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
