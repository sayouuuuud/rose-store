"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { useStore } from "@/lib/store-context"
import { MapPin, ExternalLink } from "lucide-react"

export function OurStorySection() {
  const { isRTL } = useLanguage()
  const { contentSettings, storeSettings, sectionNames } = useStore()
  const [mounted, setMounted] = useState(false)
  const [mapKey, setMapKey] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setMapKey((prev) => prev + 1)
    }
  }, [storeSettings.mapLat, storeSettings.mapLng, mounted])

  const mapLat = mounted ? storeSettings.mapLat : 31.2001
  const mapLng = mounted ? storeSettings.mapLng : 29.9187
  const storeName = mounted ? storeSettings.storeName : "Whispering Petals"
  const address = mounted ? storeSettings.address : "Alexandria, Egypt"

  const storyText = mounted ? (isRTL ? contentSettings.storyText.ar : contentSettings.storyText.en) : ""
  const storyText2 = mounted ? (isRTL ? contentSettings.storyText2.ar : contentSettings.storyText2.en) : ""
  const sectionTitle = mounted
    ? isRTL
      ? sectionNames.ourStory.ar
      : sectionNames.ourStory.en
    : isRTL
      ? "قصتنا"
      : "Our Story"

  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${mapLat},${mapLng}&zoom=15`

  return (
    <section className="py-12 px-4" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Left: Text Content */}
          <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm flex flex-col justify-center border border-transparent">
            <h2 className={`font-serif text-3xl text-rose-900 mb-4 ${isRTL ? "font-arabic" : ""}`}>{sectionTitle}</h2>
            <p className={`text-rose-700/80 leading-relaxed mb-4 ${isRTL ? "font-arabic" : ""}`}>{storyText}</p>
            <p className={`text-rose-700/80 leading-relaxed mb-6 ${isRTL ? "font-arabic" : ""}`}>{storyText2}</p>
            <Link
              href="/about"
              className={`inline-flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white font-medium px-8 py-3 rounded-full transition-colors w-fit gap-2 ${isRTL ? "font-arabic" : ""}`}
            >
              {isRTL ? "اقرأ المزيد" : "Read More"}
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: Google Maps Embed */}
          <div className="bg-card rounded-3xl p-4 shadow-sm overflow-hidden border border-transparent">
            <div className="relative h-full min-h-[300px] md:min-h-[400px] rounded-2xl overflow-hidden">
              <iframe
                key={mapKey}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapLng - 0.01},${mapLat - 0.01},${mapLng + 0.01},${mapLat + 0.01}&layer=mapnik&marker=${mapLat},${mapLng}`}
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", inset: 0 }}
                allowFullScreen
                loading="lazy"
                title="Store Location"
              />
              {/* Location Badge */}
              <div
                className={`absolute bottom-4 ${isRTL ? "right-4" : "left-4"} bg-card px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 border border-transparent`}
              >
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <p className="text-rose-900 font-semibold text-sm">{storeName}</p>
                  <p className="text-rose-600/70 text-xs">{address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
