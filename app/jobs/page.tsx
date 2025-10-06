'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { JobCard } from '@/components/job-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LoadingSpinner } from '@/components/loading-spinner'

import { Search, SlidersHorizontal, X } from 'lucide-react'
import { mockJobs, categories, locations, jobTypes } from '@/lib/mock-data'
import { useAuth } from '@/lib/auth-context'

export default function JobsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [selectedType, setSelectedType] = useState('All Types')
  const [showFilters, setShowFilters] = useState(false)

  // Redirect unauthenticated users
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

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === 'All Categories' || job.category === selectedCategory

    const matchesLocation =
      selectedLocation === 'All Locations' ||
      job.location.includes(selectedLocation) ||
      (selectedLocation === 'Remote' && job.type === 'remote')

    const matchesType = selectedType === 'All Types' || job.type === selectedType

    return matchesSearch && matchesCategory && matchesLocation && matchesType
  })

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All Categories')
    setSelectedLocation('All Locations')
    setSelectedType('All Types')
  }

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All Categories' ||
    selectedLocation !== 'All Locations' ||
    selectedType !== 'All Types'

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Your Perfect Job</h1>
            <p className="text-muted-foreground">
              Browse {mockJobs.length} part-time opportunities across India
            </p>
          </div>

          {/* Search & Filters */}
          <div className="space-y-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by job title, company, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Mobile Filter Toggle */}
            <div className="flex items-center justify-between md:hidden">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>

              {hasActiveFilters && (
                <Button variant="ghost" onClick={clearFilters} className="gap-2">
                  <X className="w-4 h-4" />
                  Clear
                </Button>
              )}
            </div>

            {/* Filters */}
            <div
              className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden md:grid'
                }`}
            >
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger id="location">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Job Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type} className="capitalize">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {hasActiveFilters && (
                <div className="space-y-2 hidden md:flex md:items-end">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full gap-2 bg-transparent"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredJobs.length} of {mockJobs.length} jobs
          </p>

          {/* Job Listings */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No jobs found matching your criteria
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
