"use client"

import { useState, useEffect } from "react"
import { useStore } from "@/lib/store-context"
import { useLanguage } from "@/lib/language-context"
import { StatsCard } from "@/components/admin/stats-card"
import { Package, DollarSign, Eye, TrendingUp, MessageSquare } from "lucide-react"

export function AdminDashboardClient() {
  const { products, contactMessages, adminTranslations } = useStore()
  const { locale } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const t = adminTranslations.dashboard
  const isRTL = locale === "ar"

  const stats = {
    totalProducts: products.length,
    available: products.filter((p) => p.availability).length,
    categories: [...new Set(products.map((p) => p.category))].length,
    totalSales: 12450,
    totalViews: 3420,
    newMessages: contactMessages.filter((m) => m.status === "new").length,
  }

  // Most viewed products
  const mostViewed = products.slice(0, 3)

  return (
    <div className={`p-4 md:p-6 lg:p-8 ${isRTL ? "font-arabic" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">{mounted ? t.title[locale] : "Dashboard"}</h1>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          {isRTL ? "مرحباً بعودتك! إليك ما يحدث في متجرك." : "Welcome back! Here's what's happening with your store."}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
        <StatsCard
          title={isRTL ? "إجمالي المبيعات" : "Total Sales"}
          value={`$${stats.totalSales.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title={mounted ? t.totalProducts[locale] : "Total Products"}
          value={stats.totalProducts}
          icon={Package}
        />
        <StatsCard
          title={isRTL ? "مشاهدات الصفحة" : "Page Views"}
          value={stats.totalViews.toLocaleString()}
          icon={Eye}
          trend={{ value: 24, isPositive: true }}
        />
        <StatsCard
          title={isRTL ? "رسائل جديدة" : "New Messages"}
          value={stats.newMessages}
          icon={MessageSquare}
          trend={{ value: stats.newMessages, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Most Viewed Products */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 text-sm md:text-base">
              {isRTL ? "الأكثر مشاهدة" : "Most Viewed"}
            </h2>
            <TrendingUp className="w-5 h-5 text-rose-500" />
          </div>
          <div className="space-y-4">
            {mostViewed.map((product, index) => {
              const productName =
                typeof product.name === "string"
                  ? product.name
                  : isRTL
                    ? product.name.ar || product.name.en
                    : product.name.en
              return (
                <div key={product.id} className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 text-sm font-medium">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{productName}</p>
                    <p className="text-xs text-gray-500">
                      {Math.floor(Math.random() * 500) + 100} {isRTL ? "مشاهدة" : "views"}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Contact Messages */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 text-sm md:text-base">
              {mounted ? t.recentMessages[locale] : "Recent Messages"}
            </h2>
            <MessageSquare className="w-5 h-5 text-rose-500" />
          </div>
          <div className="space-y-4">
            {contactMessages.slice(0, 2).map((message) => (
              <div key={message.id} className="p-3 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-900">{message.name}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{message.message}</p>
                <p className="text-xs text-gray-400 mt-2">{new Date(message.date).toLocaleString()}</p>
              </div>
            ))}
            {contactMessages.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">
                {isRTL ? "لا توجد رسائل بعد" : "No messages yet"}
              </p>
            )}
          </div>
          <a href="/admin/contacts" className="text-rose-600 text-sm font-medium mt-4 block hover:underline">
            {isRTL ? "عرض كل الرسائل" : "View all messages"}
          </a>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-4 text-sm md:text-base">
          {isRTL ? "إجراءات سريعة" : "Quick Actions"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <a
            href="/admin/products/new"
            className="flex flex-col items-center gap-2 p-3 md:p-4 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors"
          >
            <Package className="w-5 md:w-6 h-5 md:h-6 text-rose-600" />
            <span className="text-xs md:text-sm font-medium text-rose-700 text-center">
              {isRTL ? "إضافة منتج" : "Add Product"}
            </span>
          </a>
          <a
            href="/admin/gallery"
            className="flex flex-col items-center gap-2 p-3 md:p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
          >
            <Eye className="w-5 md:w-6 h-5 md:h-6 text-blue-600" />
            <span className="text-xs md:text-sm font-medium text-blue-700 text-center">
              {isRTL ? "إدارة المعرض" : "Manage Gallery"}
            </span>
          </a>
          <a
            href="/admin/settings"
            className="flex flex-col items-center gap-2 p-3 md:p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors col-span-2 md:col-span-1"
          >
            <DollarSign className="w-5 md:w-6 h-5 md:h-6 text-green-600" />
            <span className="text-xs md:text-sm font-medium text-green-700 text-center">
              {isRTL ? "الإعدادات" : "Settings"}
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
