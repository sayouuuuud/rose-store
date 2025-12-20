"use client"

import { Heart } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

export default function FavoritesPage() {
  const { t, isRTL } = useLanguage()

  return (
    <main className="min-h-screen bg-rose-50/50" dir={isRTL ? "rtl" : "ltr"}>
      <div className="pb-32">
        <header className="px-4 pt-6 pb-4 flex items-start justify-between">
          <div>
            <h1 className="font-serif text-3xl text-rose-900">{t.favorites}</h1>
            <p className="text-rose-600/70 mt-1">{isRTL ? "ترتيباتك المحفوظة" : "Your saved arrangements"}</p>
          </div>
          <LanguageSwitcher />
        </header>

        <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-rose-400" />
          </div>
          <h2 className="font-serif text-xl text-rose-900 mb-2">{isRTL ? "لا توجد مفضلات بعد" : "No favorites yet"}</h2>
          <p className="text-rose-600/70 mb-6 max-w-xs">
            {isRTL
              ? "ابدأ باستكشاف مجموعتنا واحفظ ترتيباتك المفضلة هنا."
              : "Start exploring our collection and save your favorite arrangements here."}
          </p>
          <Link
            href="/shop"
            className="bg-rose-400 hover:bg-rose-500 text-white font-medium px-6 py-3 rounded-full transition-colors"
          >
            {t.exploreCollection}
          </Link>
        </div>
      </div>
      <Footer />
      <BottomNav />
    </main>
  )
}
