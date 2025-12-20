"use client"

import { useState } from "react"
import { ProductImageSlider } from "@/components/product-image-slider"
import { ColorSelector } from "@/components/color-selector"
import { QuantitySelector } from "@/components/quantity-selector"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { useLanguage } from "@/lib/language-context"
import { useStore } from "@/lib/store-context"

interface ProductDetailsClientProps {
  productId: number
}

export function ProductDetailsClient({ productId }: ProductDetailsClientProps) {
  const { products } = useStore()
  const product = products.find((p) => p.id === productId)
  const { t, isRTL } = useLanguage()

  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "")
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="px-4 py-12 text-center" dir={isRTL ? "rtl" : "ltr"}>
        <div className="max-w-md mx-auto bg-card rounded-2xl p-8 shadow-sm border border-transparent">
          <h2 className="font-serif text-2xl text-rose-900 mb-4">{isRTL ? "المنتج غير موجود" : "Product Not Found"}</h2>
          <p className="text-rose-600/70 mb-6">
            {isRTL
              ? "عذراً، لم نتمكن من العثور على هذا المنتج. ربما تم حذفه أو نقله."
              : "Sorry, we couldn't find this product. It may have been removed or moved."}
          </p>
          <a
            href="/shop"
            className="inline-flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white font-medium px-6 py-3 rounded-full transition-colors"
          >
            {isRTL ? "تصفح المتجر" : "Browse Shop"}
          </a>
        </div>
      </div>
    )
  }

  const productName = typeof product.name === "string" ? product.name : isRTL ? product.name.ar : product.name.en
  const productDescription =
    typeof product.description === "string"
      ? product.description
      : isRTL
        ? product.description.ar
        : product.description.en

  return (
    <div className="px-4 max-w-4xl mx-auto" dir={isRTL ? "rtl" : "ltr"}>
      <ProductImageSlider images={product.images} productName={productName} />

      <div className="mt-6 space-y-6">
        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-serif text-2xl md:text-3xl text-rose-900">{productName}</h1>
            <span className="text-2xl font-bold text-rose-700">${product.price}</span>
          </div>
          <p className="text-rose-600/70 text-sm mt-1">
            {isRTL ? `رقم المنتج: ${product.id}` : `Product ID: ${product.id}`}
          </p>
        </div>

        <p className="text-rose-700/80 leading-relaxed">{productDescription}</p>

        <ColorSelector colors={product.colors} selectedColor={selectedColor} onColorChange={setSelectedColor} />

        <div className="space-y-3">
          <p className="text-sm text-rose-600/70 font-medium">{t.quantity}</p>
          <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-rose-600/70">{isRTL ? "المجموع الفرعي" : "Subtotal"}</span>
            <span className="text-xl font-bold text-rose-900">${product.price * quantity}</span>
          </div>
          <WhatsAppButton product={product} selectedColor={selectedColor} quantity={quantity} />
        </div>
      </div>
    </div>
  )
}
