"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"
import { useLanguage } from "@/lib/language-context"
import { useStore } from "@/lib/store-context"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function ProductsGrid() {
  const { isRTL } = useLanguage()
  const { products, sectionNames } = useStore()
  const [currentPage, setCurrentPage] = useState(0)
  const productsPerPage = 6
  const totalPages = Math.ceil(products.length / productsPerPage)

  const displayedProducts = products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage)

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
  }

  return (
    <section className="py-12 px-4" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className={`font-serif text-3xl text-rose-900 ${isRTL ? "font-arabic" : ""}`}>
            {isRTL ? sectionNames.products.ar : sectionNames.products.en}
          </h2>
        </div>

        {/* 3 Products Per Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} variant="featured" />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrevious}
              disabled={currentPage === 0}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-rose-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5 text-rose-700" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentPage ? "bg-rose-500 w-6" : "bg-rose-200 w-2 hover:bg-rose-300"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goToNext}
              disabled={currentPage === totalPages - 1}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-rose-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5 text-rose-700" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
