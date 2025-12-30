"use client"

import { useLanguage } from "@/lib/language-context"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "ar" : "en")}
      className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-rose-200/50 transition-colors"
    >
      <Globe className="w-4 h-4 text-rose-700" />
      <span className="text-sm font-medium text-rose-800 font-arabic">{locale === "en" ? "العربية" : "EN"}</span>
    </button>
  )
}
