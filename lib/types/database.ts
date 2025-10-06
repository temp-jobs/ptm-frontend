export type UserRole = "job_seeker" | "employer"
export type JobType = "part_time" | "freelance" | "contract" | "temporary"
export type JobStatus = "active" | "closed" | "draft"
export type ApplicationStatus = "pending" | "reviewed" | "accepted" | "rejected"

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  phone: string | null
  location: string | null
  avatar_url: string | null
  bio: string | null
  created_at: string
  updated_at: string
}

export interface Company {
  id: string
  user_id: string
  name: string
  description: string | null
  industry: string | null
  website: string | null
  logo_url: string | null
  location: string | null
  created_at: string
  updated_at: string
}

export interface Job {
  id: string
  company_id: string
  employer_id: string
  title: string
  description: string
  job_type: JobType
  category: string
  location: string
  salary_min: number | null
  salary_max: number | null
  salary_currency: string
  requirements: string[] | null
  benefits: string[] | null
  status: JobStatus
  views_count: number
  applications_count: number
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  job_id: string
  applicant_id: string
  status: ApplicationStatus
  cover_letter: string | null
  resume_url: string | null
  created_at: string
  updated_at: string
}

export interface SavedJob {
  id: string
  user_id: string
  job_id: string
  created_at: string
}
