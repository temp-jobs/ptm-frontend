export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "remote" | "on-site" | "hybrid"
  category: string
  salary: string
  description: string
  requirements: string[]
  postedDate: string
  applicants: number
  isVerified: boolean
}

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Content Writer",
    company: "Digital Marketing Agency",
    location: "Mumbai, Maharashtra",
    type: "remote",
    category: "Content Writing",
    salary: "₹15,000 - ₹25,000/month",
    description:
      "We are looking for a creative content writer to produce engaging blog posts, articles, and social media content.",
    requirements: ["Excellent writing skills", "1+ years experience", "SEO knowledge"],
    postedDate: "2024-01-15",
    applicants: 12,
    isVerified: true,
  },
  {
    id: "2",
    title: "Customer Support Executive",
    company: "E-commerce Startup",
    location: "Bangalore, Karnataka",
    type: "hybrid",
    category: "Customer Service",
    salary: "₹12,000 - ₹18,000/month",
    description:
      "Handle customer queries via phone, email, and chat. Provide excellent customer service and resolve issues promptly.",
    requirements: ["Good communication skills", "Problem-solving ability", "Flexible schedule"],
    postedDate: "2024-01-14",
    applicants: 24,
    isVerified: true,
  },
  {
    id: "3",
    title: "Graphic Designer",
    company: "Creative Studio",
    location: "Delhi, NCR",
    type: "on-site",
    category: "Design",
    salary: "₹20,000 - ₹30,000/month",
    description:
      "Create visual content for social media, websites, and marketing materials. Work with a dynamic creative team.",
    requirements: ["Adobe Creative Suite", "Portfolio required", "Creative thinking"],
    postedDate: "2024-01-13",
    applicants: 18,
    isVerified: true,
  },
  {
    id: "4",
    title: "Data Entry Operator",
    company: "Financial Services",
    location: "Pune, Maharashtra",
    type: "on-site",
    category: "Data Entry",
    salary: "₹10,000 - ₹15,000/month",
    description: "Accurate data entry and management. Maintain databases and ensure data quality.",
    requirements: ["Fast typing speed", "Attention to detail", "MS Excel knowledge"],
    postedDate: "2024-01-12",
    applicants: 31,
    isVerified: false,
  },
  {
    id: "5",
    title: "Online Tutor - Mathematics",
    company: "EdTech Platform",
    location: "Remote",
    type: "remote",
    category: "Teaching",
    salary: "₹18,000 - ₹28,000/month",
    description:
      "Teach mathematics to students in grades 8-12. Conduct online classes and provide personalized guidance.",
    requirements: ["Strong math background", "Teaching experience", "Good internet connection"],
    postedDate: "2024-01-11",
    applicants: 15,
    isVerified: true,
  },
  {
    id: "6",
    title: "Social Media Manager",
    company: "Fashion Brand",
    location: "Mumbai, Maharashtra",
    type: "hybrid",
    category: "Marketing",
    salary: "₹22,000 - ₹35,000/month",
    description:
      "Manage social media accounts, create content calendars, and engage with followers. Grow our online presence.",
    requirements: ["Social media expertise", "Content creation skills", "Analytics knowledge"],
    postedDate: "2024-01-10",
    applicants: 27,
    isVerified: true,
  },
  {
    id: "7",
    title: "Sales Associate",
    company: "Retail Chain",
    location: "Hyderabad, Telangana",
    type: "on-site",
    category: "Sales",
    salary: "₹14,000 - ₹20,000/month",
    description:
      "Assist customers, process transactions, and maintain store presentation. Weekend availability required.",
    requirements: ["Customer service skills", "Sales experience preferred", "Flexible hours"],
    postedDate: "2024-01-09",
    applicants: 22,
    isVerified: false,
  },
  {
    id: "8",
    title: "Virtual Assistant",
    company: "Consulting Firm",
    location: "Remote",
    type: "remote",
    category: "Admin Support",
    salary: "₹16,000 - ₹24,000/month",
    description: "Provide administrative support including email management, scheduling, and document preparation.",
    requirements: ["Organizational skills", "MS Office proficiency", "Self-motivated"],
    postedDate: "2024-01-08",
    applicants: 19,
    isVerified: true,
  },
  {
    id: "9",
    title: "UI/UX Designer",
    company: "Tech Startup",
    location: "Bangalore, Karnataka",
    type: "remote",
    category: "Design",
    salary: "₹25,000 - ₹40,000/month",
    description: "Design user interfaces and experiences for web and mobile applications. Collaborate with developers.",
    requirements: ["Figma/Sketch expertise", "Portfolio required", "User research skills"],
    postedDate: "2024-01-07",
    applicants: 33,
    isVerified: true,
  },
  {
    id: "10",
    title: "Content Moderator",
    company: "Social Media Platform",
    location: "Chennai, Tamil Nadu",
    type: "on-site",
    category: "Customer Service",
    salary: "₹13,000 - ₹19,000/month",
    description: "Review and moderate user-generated content. Ensure community guidelines are followed.",
    requirements: ["Good judgment", "Attention to detail", "Flexible schedule"],
    postedDate: "2024-01-06",
    applicants: 28,
    isVerified: true,
  },
  {
    id: "11",
    title: "Digital Marketing Executive",
    company: "Healthcare Startup",
    location: "Remote",
    type: "remote",
    category: "Marketing",
    salary: "₹18,000 - ₹30,000/month",
    description:
      "Execute digital marketing campaigns across various channels. Analyze performance and optimize strategies.",
    requirements: ["Digital marketing knowledge", "Google Ads experience", "Analytics skills"],
    postedDate: "2024-01-05",
    applicants: 21,
    isVerified: true,
  },
  {
    id: "12",
    title: "Freelance Writer",
    company: "Publishing House",
    location: "Remote",
    type: "remote",
    category: "Content Writing",
    salary: "₹12,000 - ₹22,000/month",
    description: "Write articles, blog posts, and web content on various topics. Flexible deadlines and work hours.",
    requirements: ["Strong writing portfolio", "Research skills", "Meet deadlines"],
    postedDate: "2024-01-04",
    applicants: 16,
    isVerified: false,
  },
]

export const categories = [
  "All Categories",
  "Content Writing",
  "Customer Service",
  "Design",
  "Data Entry",
  "Teaching",
  "Marketing",
  "Sales",
  "Admin Support",
]

export const locations = [
  "All Locations",
  "Remote",
  "Mumbai, Maharashtra",
  "Bangalore, Karnataka",
  "Delhi, NCR",
  "Pune, Maharashtra",
  "Hyderabad, Telangana",
  "Chennai, Tamil Nadu",
]

export const jobTypes = ["All Types", "remote", "on-site", "hybrid"]

export interface Application {
  id: string
  jobId: string
  jobTitle: string
  company: string
  appliedDate: string
  status: "pending" | "reviewing" | "shortlisted" | "rejected"
}

export const mockApplications: Application[] = [
  {
    id: "app1",
    jobId: "1",
    jobTitle: "Content Writer",
    company: "Digital Marketing Agency",
    appliedDate: "2024-01-14",
    status: "reviewing",
  },
  {
    id: "app2",
    jobId: "5",
    jobTitle: "Online Tutor - Mathematics",
    company: "EdTech Platform",
    appliedDate: "2024-01-12",
    status: "shortlisted",
  },
  {
    id: "app3",
    jobId: "8",
    jobTitle: "Virtual Assistant",
    company: "Consulting Firm",
    appliedDate: "2024-01-10",
    status: "pending",
  },
  {
    id: "app4",
    jobId: "11",
    jobTitle: "Digital Marketing Executive",
    company: "Healthcare Startup",
    appliedDate: "2024-01-08",
    status: "rejected",
  },
]

export const mockSavedJobs = [mockJobs[2], mockJobs[6], mockJobs[9]]

export interface Notification {
  id: string
  type: "application" | "match" | "message" | "system"
  title: string
  message: string
  date: string
  read: boolean
  jobId?: string
}

export const mockNotifications: Notification[] = [
  {
    id: "notif1",
    type: "application",
    title: "Application Update",
    message: "Your application for Content Writer has been shortlisted!",
    date: "2024-01-15T10:30:00",
    read: false,
    jobId: "1",
  },
  {
    id: "notif2",
    type: "match",
    title: "New Job Match",
    message: "3 new jobs match your profile and preferences",
    date: "2024-01-15T09:00:00",
    read: false,
  },
  {
    id: "notif3",
    type: "application",
    title: "Application Received",
    message: "Your application for Virtual Assistant has been received",
    date: "2024-01-14T16:45:00",
    read: true,
    jobId: "8",
  },
  {
    id: "notif4",
    type: "system",
    title: "Profile Completion",
    message: "Complete your profile to get better job recommendations",
    date: "2024-01-14T08:00:00",
    read: true,
  },
]

export const salaryRanges = [
  "All Ranges",
  "₹10,000 - ₹15,000",
  "₹15,000 - ₹20,000",
  "₹20,000 - ₹25,000",
  "₹25,000 - ₹30,000",
  "₹30,000+",
]

export const hoursOptions = ["All Hours", "Part-time (< 20 hrs/week)", "Part-time (20-30 hrs/week)", "Flexible"]

export const skillsOptions = [
  "All Skills",
  "Content Writing",
  "Communication",
  "MS Office",
  "Design",
  "Teaching",
  "Marketing",
  "Sales",
  "Data Entry",
]

export const availabilityOptions = ["All Availability", "Weekdays", "Weekends", "Evenings", "Flexible"]

export interface Applicant {
  id: string
  name: string
  email: string
  phone: string
  appliedDate: string
  status: "applied" | "accepted" | "rejected"
  jobId: string
  skills: string[]
  experience: string
  avatar?: string
  resumeUrl?: string
}

export const mockApplicants: Applicant[] = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    appliedDate: "2024-01-14",
    status: "applied",
    jobId: "1",
    skills: ["Content Writing", "SEO", "Social Media"],
    experience: "2 years",
  },
  {
    id: "2",
    name: "Rahul Kumar",
    email: "rahul.kumar@example.com",
    phone: "+91 98765 43211",
    appliedDate: "2024-01-13",
    status: "accepted",
    jobId: "1",
    skills: ["Content Writing", "Blogging", "Research"],
    experience: "3 years",
  },
  {
    id: "3",
    name: "Anita Desai",
    email: "anita.desai@example.com",
    phone: "+91 98765 43212",
    appliedDate: "2024-01-12",
    status: "applied",
    jobId: "2",
    skills: ["Customer Service", "Communication", "Problem Solving"],
    experience: "1 year",
  },
  {
    id: "4",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 98765 43213",
    appliedDate: "2024-01-11",
    status: "rejected",
    jobId: "2",
    skills: ["Customer Support", "CRM"],
    experience: "6 months",
  },
  {
    id: "5",
    name: "Sneha Patel",
    email: "sneha.patel@example.com",
    phone: "+91 98765 43214",
    appliedDate: "2024-01-10",
    status: "applied",
    jobId: "3",
    skills: ["Graphic Design", "Adobe Photoshop", "Illustrator"],
    experience: "2 years",
  },
  {
    id: "6",
    name: "Arjun Mehta",
    email: "arjun.mehta@example.com",
    phone: "+91 98765 43215",
    appliedDate: "2024-01-09",
    status: "accepted",
    jobId: "3",
    skills: ["UI/UX Design", "Figma", "Adobe XD"],
    experience: "4 years",
  },
]

export interface EmployerNotification {
  id: string
  type: "new_application" | "job_status" | "applicant_action" | "system"
  title: string
  message: string
  date: string
  read: boolean
  jobId?: string
  applicantId?: string
}

export const mockEmployerNotifications: EmployerNotification[] = [
  {
    id: "emp_notif1",
    type: "new_application",
    title: "New Application",
    message: "Priya Sharma applied for Content Writer position",
    date: "2024-01-15T10:30:00",
    read: false,
    jobId: "1",
    applicantId: "1",
  },
  {
    id: "emp_notif2",
    type: "new_application",
    title: "New Application",
    message: "Sneha Patel applied for Graphic Designer position",
    date: "2024-01-15T09:15:00",
    read: false,
    jobId: "3",
    applicantId: "5",
  },
  {
    id: "emp_notif3",
    type: "job_status",
    title: "Job Post Active",
    message: "Your Content Writer job post is now live",
    date: "2024-01-14T16:00:00",
    read: true,
    jobId: "1",
  },
  {
    id: "emp_notif4",
    type: "applicant_action",
    title: "Applicant Accepted Offer",
    message: "Rahul Kumar accepted your job offer",
    date: "2024-01-14T14:30:00",
    read: true,
    jobId: "1",
    applicantId: "2",
  },
  {
    id: "emp_notif5",
    type: "system",
    title: "Profile Views",
    message: "Your job posts received 45 views this week",
    date: "2024-01-14T08:00:00",
    read: true,
  },
]

export type JobStatus = "active" | "closed" | "draft"

export interface ExtendedJob extends Job {
  status: JobStatus
  views: number
  hoursPerWeek?: string
  contactEmail?: string
}

export const mockEmployerJobs: ExtendedJob[] = mockJobs.slice(0, 5).map((job, index) => ({
  ...job,
  status: index === 4 ? "closed" : "active",
  views: job.applicants * 3,
  hoursPerWeek: "20-30 hours",
  contactEmail: "hr@company.com",
}))
