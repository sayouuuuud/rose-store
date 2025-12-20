"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProductsGrid } from "@/components/products-grid"
import { GallerySlider } from "@/components/gallery-slider"
import { CustomerReviews } from "@/components/customer-reviews"
import { OurStorySection } from "@/components/our-story-section"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"
import { useStore } from "@/lib/store-context"
import { FlowerQuizPopup } from "@/components/flower-quiz-popup"

export default function HomePage() {
  const { isRTL } = useLanguage()
  const { sectionNames } = useStore()

  return (
    <main className="min-h-screen bg-rose-50/30" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <HeroSection />

      {/* Products Section */}
      <ProductsGrid />

      {/* Gallery Section - Added font-arabic class for Arabic titles */}
      <section className="py-12 px-4" dir={isRTL ? "rtl" : "ltr"}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`font-serif text-3xl text-rose-900 mb-8 ${isRTL ? "font-arabic" : ""}`}>
            {isRTL ? sectionNames.gallery.ar : sectionNames.gallery.en}
          </h2>
          <GallerySlider />
        </div>
      </section>

      {/* Customer Reviews */}
      <CustomerReviews />

      {/* Our Story Section with Map */}
      <OurStorySection />

      <Footer />

      <FlowerQuizPopup />
    </main>
  )
}
