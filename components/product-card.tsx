"use client"

import Link from "next/link"
import type { Product } from "@/lib/store-context"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  product: Product
  variant?: "default" | "compact" | "featured"
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const { t, isRTL, locale } = useLanguage()

  const productName =
    typeof product.name === "string"
      ? product.name
      : locale === "ar" && product.name.ar
        ? product.name.ar
        : product.name.en

  const productDescription =
    typeof product.description === "string"
      ? product.description
      : locale === "ar" && product.description.ar
        ? product.description.ar
        : product.description.en

  const getImageSrc = (imageSrc: string | undefined) => {
    if (!imageSrc) {
      return `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(productName || "flower bouquet")}`
    }
    // Accept base64 images
    if (imageSrc.startsWith("data:image")) return imageSrc
    // Accept placeholder URLs
    if (imageSrc.includes("/placeholder.svg")) return imageSrc
    // Accept http URLs
    if (imageSrc.startsWith("http")) return imageSrc
    // For local paths starting with /, return them directly (they're in public folder)
    if (imageSrc.startsWith("/")) return imageSrc
    return `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(productName || "flower bouquet")}`
  }

  const imageSrc = getImageSrc(product.images[0])

  if (variant === "featured") {
    return (
      <div
        className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-transparent p-3"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <img
              src={imageSrc || "/placeholder.svg"}
              alt={productName}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-transparent">
              <span className="text-rose-700 font-bold">${product.price}</span>
            </div>
          </div>
        </Link>
        <div className="p-2 pt-4 flex flex-col flex-1">
          <h3
            className={`font-semibold text-rose-900 text-base leading-tight line-clamp-2 mb-2 ${isRTL ? "font-arabic" : ""}`}
          >
            {productName}
          </h3>
          <p className={`text-rose-600/70 text-sm line-clamp-2 mb-4 flex-1 ${isRTL ? "font-arabic" : ""}`}>
            {productDescription}
          </p>
          <Link href={`/product/${product.id}`}>
            <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-full text-sm h-11">
              {t.shopNow}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <Link href={`/product/${product.id}`} className="block" dir={isRTL ? "rtl" : "ltr"}>
        <div className="bg-card rounded-xl p-2 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3 min-w-[280px] border border-transparent">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={imageSrc || "/placeholder.svg"}
              alt={productName}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className={`font-semibold text-rose-900 text-sm leading-tight ${isRTL ? "font-arabic" : ""}`}>
                {productName}
              </h3>
              <span className="text-rose-700 font-semibold text-sm flex-shrink-0">${product.price}</span>
            </div>
            <p className={`text-rose-600/70 text-xs mt-1 line-clamp-2 leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
              {productDescription}
            </p>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/product/${product.id}`} className="block group" dir={isRTL ? "rtl" : "ltr"}>
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent p-3">
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={productName}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-1 pt-4">
          <div className="flex items-center justify-between">
            <h3 className={`font-semibold text-rose-900 ${isRTL ? "font-arabic" : ""}`}>{productName}</h3>
            <span className="text-rose-700 font-bold">${product.price}</span>
          </div>
          <p className={`text-rose-600/70 text-sm mt-1 line-clamp-2 ${isRTL ? "font-arabic" : ""}`}>
            {productDescription}
          </p>
        </div>
      </div>
    </Link>
  )
}
