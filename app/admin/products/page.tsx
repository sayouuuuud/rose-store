"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useStore } from "@/lib/store-context"
import { useLanguage } from "@/lib/language-context"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminProductsPage() {
  const { products, removeProduct, categories, adminTranslations } = useStore()
  const { locale } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const t = adminTranslations.products
  const tc = adminTranslations.common
  const isRTL = locale === "ar"

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const productName = typeof product.name === "string" ? product.name : product.name.en
    const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categoryOptions = ["all", ...categories.map((c) => c.name.en)]

  const getCategoryLabel = (catNameEn: string) => {
    if (catNameEn === "all") return isRTL ? "جميع الفئات" : "All Categories"
    const cat = categories.find((c) => c.name.en === catNameEn)
    return cat ? (isRTL ? cat.name.ar : cat.name.en) : catNameEn
  }

  const handleDelete = (id: number) => {
    const confirmMsg = isRTL ? "هل أنت متأكد من حذف هذا المنتج؟" : "Are you sure you want to delete this product?"
    if (confirm(confirmMsg)) {
      removeProduct(id)
    }
  }

  return (
    <AdminLayout>
      <div className={`p-8 ${isRTL ? "font-arabic" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{mounted ? t.title[locale] : "Products"}</h1>
            <p className="text-gray-500 mt-1">
              {isRTL ? "إدارة كتالوج المنتجات الخاص بك" : "Manage your product catalog"}
            </p>
          </div>
          <Link href="/admin/products/new">
            <Button className="bg-rose-500 hover:bg-rose-600 text-white gap-2">
              <Plus className="w-5 h-5" />
              {mounted ? t.addProduct[locale] : "Add Product"}
            </Button>
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search
                className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400`}
              />
              <Input
                placeholder={mounted ? tc.search[locale] + "..." : "Search..."}
                className={`${isRTL ? "pr-10" : "pl-10"} bg-gray-50 border-gray-200`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {getCategoryLabel(cat)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className={`${isRTL ? "text-right" : "text-left"} px-6 py-4 text-sm font-semibold text-gray-600`}>
                  {mounted ? tc.name[locale] : "Product"}
                </th>
                <th className={`${isRTL ? "text-right" : "text-left"} px-6 py-4 text-sm font-semibold text-gray-600`}>
                  {mounted ? tc.category[locale] : "Category"}
                </th>
                <th className={`${isRTL ? "text-right" : "text-left"} px-6 py-4 text-sm font-semibold text-gray-600`}>
                  {mounted ? tc.price[locale] : "Price"}
                </th>
                <th className={`${isRTL ? "text-right" : "text-left"} px-6 py-4 text-sm font-semibold text-gray-600`}>
                  {mounted ? tc.status[locale] : "Status"}
                </th>
                <th className={`${isRTL ? "text-left" : "text-right"} px-6 py-4 text-sm font-semibold text-gray-600`}>
                  {mounted ? tc.actions[locale] : "Actions"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => {
                const productName =
                  typeof product.name === "string"
                    ? product.name
                    : isRTL
                      ? product.name.ar || product.name.en
                      : product.name.en
                const productDesc =
                  typeof product.description === "string"
                    ? product.description
                    : isRTL
                      ? product.description.ar || product.description.en
                      : product.description.en
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={product.images[0] || "/placeholder.svg?height=48&width=48&query=flower"}
                            alt={productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{productName}</p>
                          <p className="text-sm text-gray-500 line-clamp-1 max-w-xs">{productDesc}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                        {getCategoryLabel(product.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">${product.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          product.availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.availability
                          ? mounted
                            ? tc.inStock[locale]
                            : "In Stock"
                          : mounted
                            ? tc.outOfStock[locale]
                            : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center ${isRTL ? "justify-start" : "justify-end"} gap-2`}>
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                        </Link>
                        <button
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    {isRTL ? "لا توجد منتجات" : "No products found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
