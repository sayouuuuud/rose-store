"use client"

import { MessageCircle } from "lucide-react"
import type { Product } from "@/lib/store-context"
import { useStore } from "@/lib/store-context"
import { useLanguage } from "@/lib/language-context"

interface WhatsAppButtonProps {
  product: Product
  selectedColor: string
  quantity: number
}

export function WhatsAppButton({ product, selectedColor, quantity }: WhatsAppButtonProps) {
  const { storeSettings } = useStore()
  const { t, isRTL } = useLanguage()

  const handleClick = () => {
    const productName = typeof product.name === "string" ? product.name : isRTL ? product.name.ar : product.name.en

    const message = storeSettings.productOrderTemplate
      .replace("{storeName}", storeSettings.storeName)
      .replace("{productName}", productName)
      .replace("{productId}", String(product.id))
      .replace("{color}", selectedColor)
      .replace("{quantity}", String(quantity))
      .replace("{total}", `$${product.price * quantity}`)

    const encodedMessage = encodeURIComponent(message)
    const whatsappNumber = storeSettings.whatsappNumber.replace(/[^0-9]/g, "")
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-full flex items-center justify-center gap-3 transition-colors shadow-lg shadow-green-500/25"
    >
      <MessageCircle className="w-5 h-5" />
      <span>{t.orderViaWhatsApp}</span>
    </button>
  )
}
