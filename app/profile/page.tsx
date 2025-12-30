"use client"

import { User, MapPin, Phone, Mail, Settings } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

export default function ProfilePage() {
  const { t, isRTL } = useLanguage()

  return (
    <main className="min-h-screen bg-rose-50/50" dir={isRTL ? "rtl" : "ltr"}>
      <div className="pb-32">
        <header className="px-4 pt-6 pb-4 flex items-start justify-between">
          <h1 className="font-serif text-3xl text-rose-900">{t.profile}</h1>
          <LanguageSwitcher />
        </header>

        <div className="px-4 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center">
                <User className="w-8 h-8 text-rose-400" />
              </div>
              <div>
                <h2 className="font-semibold text-rose-900">{isRTL ? "مستخدم زائر" : "Guest User"}</h2>
                <p className="text-rose-600/70 text-sm">
                  {isRTL ? "سجل الدخول لتجربة مخصصة" : "Sign in for a personalized experience"}
                </p>
              </div>
            </div>

            <Link
              href="/admin/login"
              className="w-full bg-rose-400 hover:bg-rose-500 text-white font-medium py-3 rounded-full transition-colors flex items-center justify-center"
            >
              {isRTL ? "دخول المسؤول" : "Admin Login"}
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-serif text-lg text-rose-900 mb-4">{t.contactUs}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <p className="text-rose-900 text-sm font-medium">{isRTL ? "١٢٣ طريق الورد" : "123 Rose Lane"}</p>
                  <p className="text-rose-600/70 text-xs">{isRTL ? "مدينة الزهور" : "Blossom City, CA 90210"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-rose-500" />
                </div>
                <p className="text-rose-900 text-sm">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-rose-500" />
                </div>
                <p className="text-rose-900 text-sm">hello@whisperingpetals.com</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button className="w-full flex items-center gap-3 p-4 hover:bg-rose-50 transition-colors">
              <Settings className="w-5 h-5 text-rose-500" />
              <span className="text-rose-900">{isRTL ? "الإعدادات" : "Settings"}</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <BottomNav />
    </main>
  )
}
