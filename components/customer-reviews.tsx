"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { useStore } from "@/lib/store-context"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

export function CustomerReviews() {
  const { isRTL } = useLanguage()
  const { reviews, sectionNames } = useStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying || reviews.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying, reviews.length])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  if (reviews.length === 0) {
    return null
  }

  return (
    <section className="py-12 px-4" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className={`font-serif text-3xl text-rose-900 mb-3 ${isRTL ? "font-arabic" : ""}`}>
            {isRTL ? sectionNames.reviews.ar : sectionNames.reviews.en}
          </h2>
          <p className={`text-rose-600/70 max-w-md mx-auto ${isRTL ? "font-arabic" : ""}`}>
            {isRTL
              ? "اكتشف ما يقوله عملاؤنا عن تجربتهم معنا"
              : "Discover what our customers say about their experience with us"}
          </p>
        </div>

        <div className="relative">
          {/* Reviews Carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(${isRTL ? currentIndex * 100 : -currentIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="min-w-full px-4">
                  <div className="bg-card rounded-3xl p-4 shadow-sm max-w-2xl mx-auto border border-transparent">
                    <div className="relative p-4 md:p-6">
                      {/* Quote Icon */}
                      <div className="absolute top-2 right-2 text-rose-200">
                        <Quote className="w-12 h-12" />
                      </div>

                      {/* Stars */}
                      <div className="flex gap-1 mb-6">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className={`text-rose-800 text-lg leading-relaxed mb-8 ${isRTL ? "font-arabic" : ""}`}>
                        "{isRTL ? review.text.ar : review.text.en}"
                      </p>

                      {/* Reviewer Info */}
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden bg-rose-100">
                          <Image
                            src={review.avatar || "/placeholder.svg?height=56&width=56&query=person portrait"}
                            alt={review.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-rose-900">{review.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {reviews.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-card rounded-full shadow-lg flex items-center justify-center hover:bg-rose-50 transition-colors border border-transparent"
              >
                <ChevronLeft className="w-6 h-6 text-rose-700" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-card rounded-full shadow-lg flex items-center justify-center hover:bg-rose-50 transition-colors border border-transparent"
              >
                <ChevronRight className="w-6 h-6 text-rose-700" />
              </button>
            </>
          )}

          {/* Pagination Dots */}
          {reviews.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrentIndex(index)
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    index === currentIndex ? "bg-rose-500 w-8" : "bg-rose-200 w-2 hover:bg-rose-300",
                  )}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
