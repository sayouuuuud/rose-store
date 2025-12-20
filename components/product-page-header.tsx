"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "./language-switcher"

export function ProductPageHeader() {
  const { isRTL } = useLanguage()
  const BackArrow = isRTL ? ArrowRight : ArrowLeft

  return (
    <header
      className="sticky top-0 z-40 bg-rose-50/95 backdrop-blur-sm px-4 py-4 flex items-center justify-between"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Link href="/shop" className="inline-flex items-center gap-2 text-rose-700 hover:text-rose-900 transition-colors">
        <BackArrow className="w-5 h-5" />
        <span className="font-medium">{isRTL ? "العودة للمتجر" : "Back to Shop"}</span>
      </Link>
      <LanguageSwitcher />
    </header>
  )
}
