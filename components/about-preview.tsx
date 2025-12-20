"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { StoreImageSlider } from "./store-image-slider"

export function AboutPreview() {
  const { t, isRTL } = useLanguage()

  return (
    <section className="py-8 px-4" dir={isRTL ? "rtl" : "ltr"}>
      <h2 className="font-serif text-2xl text-rose-900 mb-6">{t.about}</h2>

      <StoreImageSlider />

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="font-serif text-xl text-rose-900 mb-3">{t.ourStory}</h3>
          <p className="text-rose-700/80 text-sm leading-relaxed mb-4">{t.ourStoryText}</p>
          <Link
            href="/about"
            className="inline-flex items-center justify-center bg-rose-400 hover:bg-rose-500 text-white font-medium px-6 py-2.5 rounded-full transition-colors text-sm tracking-wide"
          >
            {t.readMore}
          </Link>
        </div>

        <div>
          <h3 className="font-serif text-xl text-rose-900 mb-3">{t.visitBoutique}</h3>
          <div className="rounded-xl overflow-hidden mb-3 relative h-40">
            <Image
              src="/flower-shop-storefront-elegant-boutique-location.jpg"
              alt="Map showing our location"
              fill
              className="object-cover"
            />
            <div className={`absolute top-4 ${isRTL ? "right-4" : "left-4"} bg-white px-3 py-2 rounded-lg shadow-sm`}>
              <p className="text-rose-900 text-xs font-medium">123 Rose Lane,</p>
              <p className="text-rose-900 text-xs font-medium">Blossom City, CA</p>
            </div>
          </div>
          <p className="text-rose-700 text-sm">{t.address}</p>
          <p className="text-rose-600/70 text-sm">{t.openHours}</p>
        </div>
      </div>
    </section>
  )
}
