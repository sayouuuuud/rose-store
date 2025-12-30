"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Store, Info } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function BottomNav() {
  const pathname = usePathname()
  const { t, isRTL } = useLanguage()

  const navItems = [
    { href: "/", icon: Home, label: t.home },
    { href: "/shop", icon: Store, label: t.shop },
    { href: "/about", icon: Info, label: isRTL ? "من نحن" : "About" },
  ]

  // Hide bottom nav on admin pages
  if (pathname.startsWith("/admin")) {
    return null
  }

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="bg-white/95 backdrop-blur-md border border-rose-100 rounded-full shadow-lg shadow-rose-900/10 px-2 py-2">
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 py-2 px-5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-rose-500 text-white shadow-md shadow-rose-500/30"
                    : "text-rose-400/70 hover:text-rose-500 hover:bg-rose-50"
                }`}
              >
                <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
