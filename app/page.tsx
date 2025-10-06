"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Briefcase, Users, Clock, MapPin, TrendingUp, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import router from "next/router"

const FEATURES = [
  { title: "Easy Job Search", description: "Filter by location, category, and schedule to find jobs that fit your lifestyle.", icon: Search, color: "primary" },
  { title: "Flexible Hours", description: "Work on your own schedule with opportunities designed for part-time availability.", icon: Clock, color: "accent" },
  { title: "Verified Employers", description: "Apply with confidence to jobs from verified companies and trusted employers.", icon: Shield, color: "primary" },
  { title: "Quick Applications", description: "Apply to multiple jobs in minutes with your saved profile and resume.", icon: Zap, color: "accent" },
  { title: "Local Opportunities", description: "Find part-time jobs in your city or explore remote work options.", icon: MapPin, color: "primary" },
  { title: "Career Growth", description: "Build skills and experience while earning with diverse part-time roles.", icon: TrendingUp, color: "accent" },
]

const STEPS = [
  { title: "Create Your Profile", description: "Sign up and build your profile with your skills, experience, and availability.", color: "primary" },
  { title: "Browse & Apply", description: "Search for jobs that match your interests and apply with one click.", color: "accent" },
  { title: "Get Hired", description: "Connect with employers, schedule interviews, and start your new part-time job.", color: "primary" },
]

const CATEGORIES = [
  { name: "Customer Service", count: 45, icon: Users },
  { name: "Content Writing", count: 38, icon: Briefcase },
  { name: "Data Entry", count: 52, icon: Briefcase },
  { name: "Teaching", count: 29, icon: Users },
  { name: "Sales", count: 41, icon: TrendingUp },
  { name: "Design", count: 23, icon: Briefcase },
  { name: "Marketing", count: 35, icon: TrendingUp },
  { name: "Admin Support", count: 31, icon: Users },
]



export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()

  const navigate = (path: string) => user ? router.push(path) : router.push("/login")

  useEffect(() => {
    const user = localStorage.getItem('parttimematch_user')
    if (user) {
      // User is logged in, redirect based on role
      const parsedUser = JSON.parse(user)
      if (parsedUser.role === 'employer') router.replace('/employer/dashboard')
      else router.replace('/dashboard')
    }
  }, [router])

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 -z-10" />
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Find Your Perfect <span className="text-primary">Part-Time</span> Opportunity
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
            Connect with flexible job opportunities tailored for students, homemakers, and freelancers across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/jobs")} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Browse Jobs
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/post-job")}>
              Post a Job
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">2000+</div>
              <div className="text-sm text-muted-foreground">Job Seekers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">150+</div>
              <div className="text-sm text-muted-foreground">Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Why Choose PartTimeMatch?</h2>
          <p className="text-muted-foreground leading-relaxed">We make finding and posting part-time jobs simple, fast, and effective.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 bg-${feature.color}/10 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 text-${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">How It Works</h2>
          <p className="text-muted-foreground leading-relaxed">Get started in three simple steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {STEPS.map((step, idx) => (
            <div key={idx} className="text-center space-y-4">
              <div className={`w-16 h-16 bg-${step.color} rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-${step.color}-foreground`}>
                {idx + 1}
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Popular Categories</h2>
          <p className="text-muted-foreground leading-relaxed">Explore opportunities across various industries</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={`/jobs?category=${cat.name.toLowerCase().replace(" ", "-")}`}
              className="group"
            >
              <Card className="border-2 hover:border-primary transition-colors cursor-pointer">
                <CardContent className="pt-6 pb-6 text-center space-y-6">
                  <cat.icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-1">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">{cat.count} jobs</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="pt-12 pb-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Ready to Start Your Journey?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Join thousands of job seekers and employers finding success on PartTimeMatch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/signup">Sign Up Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/jobs">Explore Jobs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
