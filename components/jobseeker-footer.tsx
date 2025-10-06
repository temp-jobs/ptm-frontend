"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function JobSeekerFooter() {
  const { t } = useLanguage()

  return (
    <footer className="border-t bg-muted/30 mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-xl">PartTimeMatch</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("footer.tagline")}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.forJobSeekers")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jobs" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.browseJobs")}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.myApplications")}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/edit-profile"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("footer.profile")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.forEmployers")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/post-job" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.postJob")}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.pricing")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.company")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} PartTimeMatch. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
