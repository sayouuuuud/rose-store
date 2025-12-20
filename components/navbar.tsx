"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { useStore } from "@/lib/store-context"
import { LanguageSwitcher } from "./language-switcher"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const { storeSettings } = useStore()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollYRef = useRef(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const lang = useLanguage()
  const isRTL = lang?.isRTL ?? false

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setIsVisible(true)
        lastScrollYRef.current = window.scrollY
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("focus", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("focus", handleVisibilityChange)
    }
  }, [])

  if (pathname.startsWith("/admin")) {
    return null
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-4 z-50 transition-all duration-300",
          "left-4 right-4",
          "md:top-6 lg:top-8",
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        )}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="w-full">
          <nav
            className="flex items-center justify-between px-4 py-2 md:px-8 md:py-2.5 lg:px-12 lg:py-3 rounded-full shadow-[0_-1px_4px_-1px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]"
            style={{ backgroundColor: "var(--navbar-bg)" }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-3">
              {storeSettings.logo ? (
                <div className="relative w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10">
                  <Image
                    src={storeSettings.logo || "/placeholder.svg"}
                    alt={storeSettings.storeName}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : null}
              <span className="font-serif text-lg md:text-xl lg:text-xl text-rose-900">
                {storeSettings.storeName || "Whispering Petals"}
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              <Link
                href="/"
                className={cn(
                  "px-5 py-2 lg:px-6 lg:py-2 text-sm lg:text-base font-medium rounded-full transition-all duration-200",
                  pathname === "/" ? "bg-rose-600 text-white shadow-md" : "text-rose-800 hover:bg-rose-200/50",
                )}
              >
                {isRTL ? "الرئيسية" : "Home"}
              </Link>
              <Link
                href="/shop"
                className={cn(
                  "px-5 py-2 lg:px-6 lg:py-2 text-sm lg:text-base font-medium rounded-full transition-all duration-200",
                  pathname === "/shop" ? "bg-rose-600 text-white shadow-md" : "text-rose-800 hover:bg-rose-200/50",
                )}
              >
                {isRTL ? "المتجر" : "Shop"}
              </Link>
              <Link
                href="/about"
                className={cn(
                  "px-5 py-2 lg:px-6 lg:py-2 text-sm lg:text-base font-medium rounded-full transition-all duration-200",
                  pathname === "/about" ? "bg-rose-600 text-white shadow-md" : "text-rose-800 hover:bg-rose-200/50",
                )}
              >
                {isRTL ? "من نحن والتواصل" : "About & Contact"}
              </Link>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
              <LanguageSwitcher />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-rose-200/50 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-rose-800" />
                ) : (
                  <Menu className="w-5 h-5 text-rose-800" />
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Menu - Also hardcoded */}
          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-300 mt-2 rounded-2xl shadow-lg",
              isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
            )}
            style={{ backgroundColor: "var(--navbar-bg)" }}
          >
            <nav className="px-4 py-3 space-y-1">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  pathname === "/" ? "bg-rose-600 text-white" : "text-rose-800 hover:bg-rose-200/50",
                )}
              >
                {isRTL ? "الرئيسية" : "Home"}
              </Link>
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  pathname === "/shop" ? "bg-rose-600 text-white" : "text-rose-800 hover:bg-rose-200/50",
                )}
              >
                {isRTL ? "المتجر" : "Shop"}
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  pathname === "/about" ? "bg-rose-600 text-white" : "text-rose-800 hover:bg-rose-200/50",
                )}
              >
                {isRTL ? "من نحن والتواصل" : "About & Contact"}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-20 md:h-24" />
    </>
  )
}
