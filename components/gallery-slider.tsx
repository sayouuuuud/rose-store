"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useStore } from "@/lib/store-context"

export function GallerySlider() {
  const { galleryImages } = useStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered || galleryImages.length <= 4) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, galleryImages.length - 3))
    }, 3000)

    return () => clearInterval(timer)
  }, [isHovered, galleryImages.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(Math.max(0, galleryImages.length - 4), prev + 1))
  }

  const getValidImageSrc = (src: string | undefined, alt: string) => {
    if (!src) return `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(alt || "flower arrangement")}`
    if (src.startsWith("data:image")) return src
    if (src.includes("/placeholder.svg")) return src
    if (src.startsWith("http")) return src
    // For local paths starting with /, return them directly (they're in public folder)
    if (src.startsWith("/")) return src
    return `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(alt || "flower arrangement")}`
  }

  if (galleryImages.length === 0) {
    return <div className="text-center py-12 text-rose-500">No gallery images available</div>
  }

  return (
    <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Slider Container */}
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex gap-4 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / 4 + 1)}%)` }}
        >
          {galleryImages.map((image, index) => (
            <div key={image.id} className="relative aspect-[4/3] min-w-[calc(25%-12px)] rounded-xl overflow-hidden">
              <Image
                src={getValidImageSrc(image.src, image.alt) || "/placeholder.svg"}
                alt={image.alt || `Gallery image ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {galleryImages.length > 4 && (
        <>
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-card disabled:opacity-50 disabled:cursor-not-allowed shadow-lg border border-transparent"
          >
            <ChevronLeft className="w-5 h-5 text-rose-700" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex >= galleryImages.length - 4}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-card disabled:opacity-50 disabled:cursor-not-allowed shadow-lg border border-transparent"
          >
            <ChevronRight className="w-5 h-5 text-rose-700" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {galleryImages.length > 4 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: Math.max(1, galleryImages.length - 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-rose-500 w-6" : "bg-rose-200 w-2 hover:bg-rose-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
