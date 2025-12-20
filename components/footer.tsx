"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { useStore } from "@/lib/store-context"
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  const { t, isRTL } = useLanguage()
  const { storeSettings, footerSettings } = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const storeName = mounted ? storeSettings.storeName : "Whispering Petals"
  const description = mounted
    ? isRTL
      ? footerSettings.description.ar
      : footerSettings.description.en
    : "Handcrafted with passion, our blooms whisper tales of romance and elegance."

  return (
    <footer className="bg-rose-900 text-rose-100 mt-8" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl text-white mb-4">{storeName}</h3>
            <p className="text-rose-200/80 text-sm leading-relaxed mb-4">{description}</p>
            {mounted && footerSettings.showSocialLinks && (
              <div className="flex gap-3">
                {storeSettings.instagram && (
                  <a
                    href={storeSettings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-rose-800 hover:bg-rose-700 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {storeSettings.facebook && (
                  <a
                    href={storeSettings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-rose-800 hover:bg-rose-700 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {storeSettings.twitter && (
                  <a
                    href={storeSettings.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-rose-800 hover:bg-rose-700 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2">
              {mounted &&
                footerSettings.quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-rose-200/80 hover:text-white transition-colors text-sm">
                      {isRTL ? link.label.ar : link.label.en}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t.contactUs}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <span className="text-rose-200/80 text-sm">
                  {mounted ? storeSettings.address : "Alexandria, Egypt"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <span className="text-rose-200/80 text-sm">{mounted ? storeSettings.phone : "+20 123 456 7890"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <span className="text-rose-200/80 text-sm">
                  {mounted ? storeSettings.email : "hello@whisperingpetals.com"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-rose-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-rose-300/70 text-sm">
            © 2025 {storeName}. {t.allRightsReserved}
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-rose-300/70 hover:text-white transition-colors text-sm">
              {t.privacyPolicy}
            </Link>
            <Link href="#" className="text-rose-300/70 hover:text-white transition-colors text-sm">
              {t.termsOfService}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
