"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Plus, X, Upload, ImageIcon } from "lucide-react"
import { useStore, type Product } from "@/lib/store-context"
import { useLanguage } from "@/lib/language-context"

interface ProductFormProps {
  product?: Product
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const { addProduct, updateProduct, categories, adminTranslations } = useStore()
  const { locale } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    name: product?.name || { en: "", ar: "" },
    price: product?.price || 0,
    description: product?.description || { en: "", ar: "" },
    category: product?.category || (categories.length > 0 ? categories[0].name.en : ""),
    availability: product?.availability ?? true,
    colors: product?.colors || [""],
    images: product?.images || [""],
  })

  const t = adminTranslations.products
  const tc = adminTranslations.common
  const isRTL = locale === "ar"

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images.filter((img) => img !== ""), reader.result as string],
          }))
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleAddColor = () => {
    setFormData((prev) => ({ ...prev, colors: [...prev.colors, ""] }))
  }

  const handleRemoveColor = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }))
  }

  const handleColorChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.map((c, i) => (i === index ? value : c)),
    }))
  }

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const cleanedData = {
      ...formData,
      colors: formData.colors.filter((c) => c.trim() !== ""),
      images: formData.images.filter((img) => img.trim() !== ""),
    }

    if (product) {
      updateProduct(product.id, cleanedData)
    } else {
      addProduct(cleanedData)
    }

    router.push("/admin/products")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${isRTL ? "font-arabic" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
        <h2 className="font-serif text-xl text-rose-900">{isRTL ? "المعلومات الأساسية" : "Basic Information"}</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name-en" className="block text-sm font-medium text-rose-700 mb-2">
              {t.productName[locale]} (EN)
            </label>
            <input
              id="name-en"
              type="text"
              value={typeof formData.name === "string" ? formData.name : formData.name.en}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name:
                    typeof prev.name === "string"
                      ? { en: e.target.value, ar: "" }
                      : { ...prev.name, en: e.target.value },
                }))
              }
              className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 outline-none transition-all"
              placeholder="e.g., Blush Harmony Bouquet"
              required
            />
          </div>
          <div>
            <label htmlFor="name-ar" className="block text-sm font-medium text-rose-700 mb-2">
              {t.productName[locale]} (AR)
            </label>
            <input
              id="name-ar"
              type="text"
              dir="rtl"
              value={typeof formData.name === "string" ? "" : formData.name.ar}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name:
                    typeof prev.name === "string"
                      ? { en: prev.name, ar: e.target.value }
                      : { ...prev.name, ar: e.target.value },
                }))
              }
              className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 outline-none transition-all text-right font-arabic"
              placeholder="مثال: باقة الانسجام الوردية"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-rose-700 mb-2">
              {t.productPrice[locale]} ($)
            </label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))}
              className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-rose-700 mb-2">
              {tc.category[locale]}
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 outline-none transition-all bg-white"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name.en}>
                  {isRTL ? cat.name.ar : cat.name.en}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="description-en" className="block text-sm font-medium text-rose-700 mb-2">
              {t.productDescription[locale]} (EN)
            </label>
            <textarea
              id="description-en"
              value={typeof formData.description === "string" ? formData.description : formData.description.en}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description:
                    typeof prev.description === "string"
                      ? { en: e.target.value, ar: "" }
                      : { ...prev.description, en: e.target.value },
                }))
              }
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 outline-none transition-all resize-none"
              placeholder="Describe your beautiful arrangement..."
              required
            />
          </div>
          <div>
            <label htmlFor="description-ar" className="block text-sm font-medium text-rose-700 mb-2">
              {t.productDescription[locale]} (AR)
            </label>
            <textarea
              id="description-ar"
              dir="rtl"
              value={typeof formData.description === "string" ? "" : formData.description.ar}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description:
                    typeof prev.description === "string"
                      ? { en: prev.description, ar: e.target.value }
                      : { ...prev.description, ar: e.target.value },
                }))
              }
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 outline-none transition-all resize-none text-right font-arabic"
              placeholder="اوصف ترتيبك الجميل..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="availability"
            type="checkbox"
            checked={formData.availability}
            onChange={(e) => setFormData((prev) => ({ ...prev, availability: e.target.checked }))}
            className="w-5 h-5 rounded border-rose-300 text-rose-500 focus:ring-rose-400"
          />
          <label htmlFor="availability" className="text-rose-700">
            {tc.availability[locale]} - {tc.inStock[locale]}
          </label>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl text-rose-900">{t.productColors[locale]}</h2>
          <button
            type="button"
            onClick={handleAddColor}
            className="text-rose-500 hover:text-rose-700 flex items-center gap-1 text-sm"
          >
            <Plus className="w-4 h-4" />
            {isRTL ? "إضافة لون" : "Add Color"}
          </button>
        </div>

        <div className="space-y-3">
          {formData.colors.map((color, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl border border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 outline-none transition-all"
                placeholder={isRTL ? "مثال: وردي فاتح" : "e.g., Baby Pink"}
              />
              {formData.colors.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveColor(index)}
                  className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl text-rose-900">{t.productImages[locale]}</h2>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-rose-500 hover:text-rose-700 flex items-center gap-1 text-sm"
          >
            <Upload className="w-4 h-4" />
            {isRTL ? "رفع الصور" : "Upload Images"}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {formData.images
            .filter((img) => img)
            .map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-xl overflow-hidden border border-rose-200">
                  <img
                    src={image || "/placeholder.svg?height=200&width=200&query=flower product"}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-rose-200 flex flex-col items-center justify-center gap-2 text-rose-400 hover:border-rose-400 hover:text-rose-600 transition-colors"
          >
            <ImageIcon className="w-8 h-8" />
            <span className="text-sm">{isRTL ? "إضافة صورة" : "Add Image"}</span>
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-6 py-3 border border-rose-300 text-rose-700 font-medium rounded-xl hover:bg-rose-50 transition-colors"
        >
          {tc.cancel[locale]}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
        >
          {isSubmitting
            ? isRTL
              ? "جاري الحفظ..."
              : "Saving..."
            : product
              ? t.editProduct[locale]
              : t.addProduct[locale]}
        </button>
      </div>
    </form>
  )
}
