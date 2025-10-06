'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ApplyDialog } from '@/components/apply-dialog'
import { LoadingSpinner } from '@/components/loading-spinner'
import { toast } from '@/hooks/use-toast'

import {
  MapPin,
  Briefcase,
  Clock,
  CheckCircle2,
  Building2,
  Calendar,
  Users,
  ArrowLeft,
  Share2,
  Bookmark,
} from 'lucide-react'

import { useAuth } from '@/lib/auth-context'
import { useLanguage } from '@/lib/language-context'
import { mockJobs } from '@/lib/mock-data'

interface JobDetailsPageProps {
  params: { id: string }
}

export default function JobDetailsPage({ params: paramsProp }: JobDetailsPageProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { t } = useLanguage()

  const params = paramsProp
  const { id } = params

  const [isSaved, setIsSaved] = useState(false)
  const [isLoadingAction, setIsLoadingAction] = useState(false)
  const [postedDateStr, setPostedDateStr] = useState('')

  const job = mockJobs.find((j) => j.id === id)

  // Compute days ago safely
  useEffect(() => {
    if (job) {
      const daysAgo = Math.floor(
        (new Date().getTime() - new Date(job.postedDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
      setPostedDateStr(daysAgo === 0 ? t('jobs.today') : `${daysAgo} days ago`)
    }
  }, [job, t])

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) router.push('/login')
  }, [user, isLoading, router])

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <LoadingSpinner size="lg" />
  //     </div>
  //   )
  // }

  if (!user) return null
  if (!job)
    return <p className="text-center py-20 text-lg">{t('jobs.notFound') || 'Job not found.'}</p>

  const handleSave = async () => {
    setIsLoadingAction(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsSaved(!isSaved)
    setIsLoadingAction(false)

    toast({
      title: isSaved ? t('jobs.unsaved') : t('jobs.saved'),
      description: isSaved
        ? t('jobs.removedFromSaved')
        : t('jobs.addedToSaved'),
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job: ${job.title} at ${job.company}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: t('common.linkCopied'),
        description: t('jobs.linkCopiedDesc'),
      })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-slate-50 to-white">
      <Navigation />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6 -ml-4">
            <Link href="/jobs" className="flex items-center gap-2 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4" />
              {t('common.back')}
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Header */}
              <Card>
                <CardHeader>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                            {job.title}
                          </h1>
                          {job.isVerified && (
                            <CheckCircle2
                              className="w-6 h-6 text-green-600"
                              aria-label="Verified employer"
                            />
                          )}
                        </div>
                        <p className="text-lg text-muted-foreground font-medium">{job.company}</p>
                      </div>
                      <Badge variant="secondary" className="capitalize text-sm">
                        {job.type}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.category}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>Posted {postedDateStr}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>{job.applicants} {t('jobs.applicants')}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="text-2xl font-bold text-primary">{job.salary}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Job Description */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">{t('jobs.description')}</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground leading-relaxed">{job.description}</p>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">{t('jobs.requirements')}</h2>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.requirements?.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardContent className="pt-6 space-y-4">
                  <ApplyDialog jobTitle={job.title} company={job.company} />
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={handleSave}
                    disabled={isLoadingAction}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isSaved ? 'fill-primary text-primary' : ''}`}
                    />
                    {isSaved ? t('jobs.saved') : t('jobs.save')}
                  </Button>
                  <Button variant="ghost" className="w-full gap-2" onClick={handleShare}>
                    <Share2 className="w-4 h-4" />
                    {t('common.share')}
                  </Button>

                  <Separator />

                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span>{t('jobs.company')}: {job.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{t('jobs.posted')}: {new Date(job.postedDate).toLocaleDateString('en-IN')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{job.applicants} {t('jobs.applied')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
