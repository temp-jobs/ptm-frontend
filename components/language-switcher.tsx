"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { Languages } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "hi" : "en")}
      className="gap-2"
      aria-label="Switch language"
    >
      <Languages className="h-4 w-4" />
      <span className="text-sm font-medium">{language === "en" ? "हिं" : "EN"}</span>
    </Button>
  )
}
