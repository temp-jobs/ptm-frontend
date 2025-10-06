import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth-context"
import { LanguageProvider } from "@/lib/language-context"
import { ThemeProvider } from "@/lib/theme-context"
import { MFAWrapper } from "@/components/mfa-wrapper"
import "./globals.css"

export const metadata: Metadata = {
  title: "PartTimeMatch - Find Your Perfect Part-Time Job",
  description:
    "Connect with flexible part-time opportunities tailored for students, homemakers, and freelancers across India.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <MFAWrapper>
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              </MFAWrapper>
              <Toaster />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
