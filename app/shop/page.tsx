"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/lib/language-context"
import { useStore } from "@/lib/store-context"
import { MessageCircle, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ShopPage() {
  const { t, isRTL } = useLanguage()
  const { products, storeSettings, categories } = useStore()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const getCategoryLabel = (catNameEn: string) => {
    if (catNameEn === "All") return isRTL ? "الكل" : "All"
    const cat = categories.find((c) => c.name.en === catNameEn)
    return cat ? (isRTL ? cat.name.ar : cat.name.en) : catNameEn
  }

  const categoryOptions = ["All", ...categories.map((c) => c.name.en)]

  const filteredProducts =
    selectedCategory && selectedCategory !== "All" ? products.filter((p) => p.category === selectedCategory) : products

  const whatsappMessage = storeSettings.customOrderTemplate.replace("{storeName}", storeSettings.storeName)
  const whatsappNumber = storeSettings.whatsappNumber.replace(/[^0-9]/g, "")
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <main className="min-h-screen bg-rose-50/30" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      {/* Header */}
      <section className="px-4 pt-8 pb-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-4xl text-rose-900 mb-2">{t.ourCollection}</h1>
          <p className="text-rose-600/70 text-lg">{t.discoverPerfect}</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-rose-500" />
            <span className="text-sm font-medium text-rose-800">{t.filterByCategory}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === "All" ? null : category)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all",
                  (category === "All" && !selectedCategory) || selectedCategory === category
                    ? "bg-rose-500 text-white shadow-md"
                    : "bg-white text-rose-700 hover:bg-rose-100 border border-rose-200",
                )}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid - 3 per row */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Custom Order Section */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="font-serif text-3xl md:text-4xl mb-4">{t.customOrder}</h2>
              <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">{t.customOrderText}</p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-rose-600 font-semibold px-8 py-4 rounded-full hover:bg-rose-50 transition-colors shadow-lg"
              >
                <MessageCircle className="w-6 h-6" />
                {t.contactViaWhatsApp}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </main>
  )
}
