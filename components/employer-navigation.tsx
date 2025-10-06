"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut, Briefcase, LayoutDashboard, PlusCircle } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function EmployerNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { t } = useLanguage()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-xl">PartTimeMatch</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {user && (
              <>
                <Link href="/employer/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
                  {t("nav.dashboard")}
                </Link>
                <Link href="/employer/postings" className="text-foreground/80 hover:text-foreground transition-colors">
                  {t("nav.postings")}
                </Link>
                <Link
                  href="/employer/applications"
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  {t("nav.applications")}
                </Link>
              </>
            )}
            <Link href="/about" className="text-foreground/80 hover:text-foreground transition-colors">
              {t("nav.about")}
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
            {user ? (
              <>
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                  <Link href="/post-job">
                    <PlusCircle className="h-4 w-4" />
                    {t("nav.postJob")}
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2">
                      <User className="h-4 w-4" />
                      {user.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>{t("nav.myAccount")}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/employer/dashboard" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        {t("nav.dashboard")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/employer/postings" className="cursor-pointer">
                        <Briefcase className="mr-2 h-4 w-4" />
                        {t("nav.manageJobs")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      {t("nav.logout")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">{t("nav.login")}</Link>
                </Button>
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/signup">{t("nav.signup")}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-4 py-4 space-y-3">
            {user && (
              <>
                <Link
                  href="/employer/dashboard"
                  className="block py-2 text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.dashboard")}
                </Link>
                <Link
                  href="/employer/postings"
                  className="block py-2 text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.postings")}
                </Link>
                <Link
                  href="/employer/applications"
                  className="block py-2 text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.applications")}
                </Link>
              </>
            )}
            <Link
              href="/about"
              className="block py-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.about")}
            </Link>
            <div className="flex items-center gap-2 py-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            <div className="pt-3 space-y-2">
              {user ? (
                <>
                  <Button
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/post-job">
                      <PlusCircle className="h-4 w-4" />
                      {t("nav.postJob")}
                    </Link>
                  </Button>
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Logged in as <span className="font-medium text-foreground">{user.name}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-destructive bg-transparent"
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("nav.logout")}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/login">{t("nav.login")}</Link>
                  </Button>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                    <Link href="/signup">{t("nav.signup")}</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
