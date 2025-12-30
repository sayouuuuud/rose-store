"use client"

import { useRef, useState } from "react"
import { ProductCard } from "./product-card"
import { useLanguage } from "@/lib/language-context"
import type { Product } from "@/lib/products-data"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductsCarouselProps {
  products: Product[]
  title?: string
}

export function ProductsCarousel({ products, title }: ProductsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { t, isRTL } = useLanguage()

  const displayTitle = title || t.gardenFavorites

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280
      const newScroll =
        direction === "left" ? scrollRef.current.scrollLeft - scrollAmount : scrollRef.current.scrollLeft + scrollAmount
      scrollRef.current.scrollTo({ left: newScroll, behavior: "smooth" })
    }
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const cardWidth = 276
      const newIndex = Math.round(scrollRef.current.scrollLeft / cardWidth)
      setActiveIndex(newIndex)
    }
  }

  const totalPages = Math.ceil(products.length / 2)

  return (
    <section className="py-8 px-4" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl text-rose-900">{displayTitle}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full bg-white border border-rose-200 flex items-center justify-center hover:bg-rose-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-rose-600" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full bg-white border border-rose-200 flex items-center justify-center hover:bg-rose-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-rose-600" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="snap-start">
            <ProductCard product={product} variant="featured" />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollTo({ left: index * 552, behavior: "smooth" })
              }
            }}
            className={`w-8 h-2 rounded-full transition-colors ${
              Math.floor(activeIndex / 2) === index ? "bg-rose-400" : "bg-rose-200"
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
