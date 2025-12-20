"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useStore } from "@/lib/store-context"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save, MessageCircle, Store, Globe, MapPin, Check, ImageIcon, X, Shield } from "lucide-react"

export function SettingsClient() {
  const { storeSettings, updateStoreSettings, adminSettings, updateAdminSettings, adminTranslations } = useStore()
  const { locale } = useLanguage()
  const [localSettings, setLocalSettings] = useState(storeSettings)
  const [localAdminSettings, setLocalAdminSettings] = useState(adminSettings)
  const [saved, setSaved] = useState<string | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [adminError, setAdminError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const t = adminTranslations.settings
  const tc = adminTranslations.common
  const isRTL = locale === "ar"

  useEffect(() => {
    setLocalSettings(storeSettings)
  }, [storeSettings])

  useEffect(() => {
    setLocalAdminSettings(adminSettings)
  }, [adminSettings])

  const handleSave = (section: string) => {
    updateStoreSettings(localSettings)
    setSaved(section)
    setTimeout(() => setSaved(null), 2000)
  }

  const handleSaveAdminSettings = async () => {
    setAdminError(null)

    if (!localAdminSettings.email) {
      setAdminError(isRTL ? "البريد الإلكتروني مطلوب" : "Email is required")
      return
    }

    try {
      const res = await fetch("/api/auth/update-credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: localAdminSettings.name,
          email: localAdminSettings.email,
          password: localAdminSettings.password || undefined,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setAdminError(data.error || (isRTL ? "فشل تحديث البيانات" : "Failed to update credentials"))
        return
      }

      updateAdminSettings(localAdminSettings)
      setSaved("admin")
      setTimeout(() => setSaved(null), 2000)
    } catch {
      setAdminError(isRTL ? "فشل تحديث البيانات" : "Failed to update credentials")
    }
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setLogoPreview(result)
        setLocalSettings({ ...localSettings, logo: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveLogo = () => {
    setLogoPreview(null)
    setLocalSettings({ ...localSettings, logo: "" })
  }

  return (
    <div className={`p-8 ${isRTL ? "font-arabic" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{mounted ? t.title[locale] : "Settings"}</h1>
        <p className="text-gray-500 mt-1">{isRTL ? "إعدادات المتجر الخاص بك" : "Configure your store settings"}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Store Branding */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{isRTL ? "هوية المتجر" : "Store Branding"}</h2>
              <p className="text-gray-500 text-sm">
                {isRTL ? "تخصيص اسم وشعار المتجر" : "Customize your store name and logo"}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {mounted ? t.storeName[locale] : "Store Name"}
              </label>
              <Input
                type="text"
                value={localSettings.storeName}
                onChange={(e) => setLocalSettings({ ...localSettings, storeName: e.target.value })}
                className="bg-gray-50"
                placeholder="Whispering Petals"
              />
              <p className="text-xs text-gray-500 mt-1">
                {isRTL
                  ? "هذا الاسم يظهر في شريط التنقل والتذييل ولوحة الإدارة"
                  : "This name appears in the navbar, footer, and admin panel"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? "شعار المتجر (اختياري)" : "Store Logo (Optional)"}
              </label>
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center group">
                  {logoPreview || localSettings.logo ? (
                    <>
                      <Image
                        src={logoPreview || localSettings.logo || ""}
                        alt="Store Logo"
                        fill
                        className="object-contain"
                      />
                      <button
                        onClick={handleRemoveLogo}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <X className="w-6 h-6 text-white" />
                      </button>
                    </>
                  ) : (
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" id="logo-upload" />
                  <div className="flex gap-2">
                    <label
                      htmlFor="logo-upload"
                      className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 cursor-pointer transition-colors"
                    >
                      {isRTL ? "رفع الشعار" : "Upload Logo"}
                    </label>
                    {(logoPreview || localSettings.logo) && (
                      <button
                        onClick={handleRemoveLogo}
                        className="inline-flex items-center px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium text-red-600 transition-colors"
                      >
                        {isRTL ? "إزالة" : "Remove"}
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG {isRTL ? "حتى 2 ميجابايت" : "up to 2MB"}</p>
                </div>
              </div>
            </div>
            <Button onClick={() => handleSave("branding")} className="bg-rose-500 hover:bg-rose-600 text-white gap-2">
              {saved === "branding" ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved === "branding" ? (isRTL ? "تم الحفظ!" : "Saved!") : isRTL ? "حفظ الهوية" : "Save Branding"}
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">
                {mounted ? t.adminCredentials[locale] : "Admin Credentials"}
              </h2>
              <p className="text-gray-500 text-sm">
                {isRTL ? "تحديث بريد وكلمة مرور تسجيل الدخول" : "Update your login email and password"}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? "اسم المسؤول" : "Admin Name"}
              </label>
              <Input
                type="text"
                value={localAdminSettings.name}
                onChange={(e) => setLocalAdminSettings({ ...localAdminSettings, name: e.target.value })}
                className="bg-gray-50"
                placeholder="Admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? "بريد المسؤول الإلكتروني" : "Admin Email"}
              </label>
              <Input
                type="email"
                value={localAdminSettings.email}
                onChange={(e) => setLocalAdminSettings({ ...localAdminSettings, email: e.target.value })}
                className="bg-gray-50"
                placeholder="admin@example.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                {isRTL ? "هذا البريد يُستخدم لتسجيل دخول المسؤول" : "This email is used for admin login"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? "كلمة المرور الجديدة" : "New Password"}
              </label>
              <Input
                type="password"
                value={localAdminSettings.password}
                onChange={(e) => setLocalAdminSettings({ ...localAdminSettings, password: e.target.value })}
                className="bg-gray-50"
                placeholder={
                  isRTL ? "اتركه فارغاً للإبقاء على كلمة المرور الحالية" : "Leave blank to keep current password"
                }
              />
              <p className="text-xs text-gray-500 mt-1">
                {isRTL ? "اتركه فارغاً للإبقاء على كلمة المرور الحالية" : "Leave empty to keep current password"}
              </p>
            </div>
            {adminError && <p className="text-sm text-red-600">{adminError}</p>}
            <Button onClick={handleSaveAdminSettings} className="bg-indigo-500 hover:bg-indigo-600 text-white gap-2">
              {saved === "admin" ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved === "admin" ? (isRTL ? "تم الحفظ!" : "Saved!") : isRTL ? "تحديث البيانات" : "Update Credentials"}
            </Button>
          </div>
        </div>

        {/* Store Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
              <Store className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{mounted ? t.storeInfo[locale] : "Store Information"}</h2>
              <p className="text-gray-500 text-sm">{isRTL ? "تحديث تفاصيل المتجر" : "Update your store details"}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{isRTL ? "العنوان" : "Address"}</label>
              <Input
                type="text"
                value={localSettings.address}
                onChange={(e) => setLocalSettings({ ...localSettings, address: e.target.value })}
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? "ساعات العمل" : "Business Hours"}
              </label>
              <Input
                type="text"
                value={localSettings.businessHours}
                onChange={(e) => setLocalSettings({ ...localSettings, businessHours: e.target.value })}
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{isRTL ? "الهاتف" : "Phone"}</label>
              <Input
                type="tel"
                value={localSettings.phone}
                onChange={(e) => setLocalSettings({ ...localSettings, phone: e.target.value })}
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? "البريد الإلكتروني" : "Email"}
              </label>
              <Input
                type="email"
                value={localSettings.email}
                onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                className="bg-gray-50"
              />
            </div>
            <Button onClick={() => handleSave("store")} className="bg-rose-500 hover:bg-rose-600 text-white gap-2">
              {saved === "store" ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved === "store" ? (isRTL ? "تم الحفظ!" : "Saved!") : isRTL ? "حفظ معلومات المتجر" : "Save Store Info"}
            </Button>
          </div>
        </div>

        {/* WhatsApp Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{isRTL ? "إعدادات واتساب" : "WhatsApp Settings"}</h2>
              <p className="text-gray-500 text-sm">
                {isRTL ? "إعداد رقم واتساب للأعمال" : "Configure your WhatsApp business number"}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? "رقم واتساب" : "WhatsApp Number"}
              </label>
              <Input
                type="tel"
                placeholder="+20 123 456 7890"
                value={localSettings.whatsappNumber}
                onChange={(e) => setLocalSettings({ ...localSettings, whatsappNumber: e.target.value })}
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? "قالب طلب المنتج" : "Product Order Template"}
              </label>
              <p className="text-xs text-gray-500 mb-2">
                {isRTL ? "المتغيرات المتاحة:" : "Available variables:"} {"{storeName}"}, {"{productName}"},{" "}
                {"{productId}"}, {"{color}"}, {"{quantity}"}, {"{total}"}
              </p>
              <Textarea
                value={localSettings.productOrderTemplate}
                onChange={(e) => setLocalSettings({ ...localSettings, productOrderTemplate: e.target.value })}
                className="bg-gray-50"
                rows={5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? "قالب الطلب المخصص" : "Custom Order Template"}
              </label>
              <p className="text-xs text-gray-500 mb-2">
                {isRTL ? "المتغيرات المتاحة:" : "Available variables:"} {"{storeName}"}
              </p>
              <Textarea
                value={localSettings.customOrderTemplate}
                onChange={(e) => setLocalSettings({ ...localSettings, customOrderTemplate: e.target.value })}
                className="bg-gray-50"
                rows={4}
              />
            </div>
            <Button onClick={() => handleSave("whatsapp")} className="bg-green-500 hover:bg-green-600 text-white gap-2">
              {saved === "whatsapp" ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved === "whatsapp"
                ? isRTL
                  ? "تم الحفظ!"
                  : "Saved!"
                : isRTL
                  ? "حفظ إعدادات واتساب"
                  : "Save WhatsApp Settings"}
            </Button>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{mounted ? t.socialMedia[locale] : "Social Media Links"}</h2>
              <p className="text-gray-500 text-sm">
                {isRTL ? "ربط حسابات التواصل الاجتماعي" : "Connect your social media accounts"}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{isRTL ? "انستغرام" : "Instagram"}</label>
              <Input
                type="url"
                placeholder="https://instagram.com/..."
                value={localSettings.instagram}
                onChange={(e) => setLocalSettings({ ...localSettings, instagram: e.target.value })}
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{isRTL ? "فيسبوك" : "Facebook"}</label>
              <Input
                type="url"
                placeholder="https://facebook.com/..."
                value={localSettings.facebook}
                onChange={(e) => setLocalSettings({ ...localSettings, facebook: e.target.value })}
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{isRTL ? "تويتر" : "Twitter"}</label>
              <Input
                type="url"
                placeholder="https://twitter.com/..."
                value={localSettings.twitter}
                onChange={(e) => setLocalSettings({ ...localSettings, twitter: e.target.value })}
                className="bg-gray-50"
              />
            </div>
            <Button onClick={() => handleSave("social")} className="bg-blue-500 hover:bg-blue-600 text-white gap-2">
              {saved === "social" ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved === "social"
                ? isRTL
                  ? "تم الحفظ!"
                  : "Saved!"
                : isRTL
                  ? "حفظ روابط التواصل"
                  : "Save Social Links"}
            </Button>
          </div>
        </div>

        {/* Map Location */}
        <div className="bg-white rounded-2xl p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{isRTL ? "موقع الخريطة" : "Map Location"}</h2>
              <p className="text-gray-500 text-sm">
                {isRTL ? "تعيين موقع المتجر على خرائط جوجل" : "Set your store location on Google Maps"}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? "اسم الموقع" : "Location Name"}
              </label>
              <Input
                type="text"
                placeholder={isRTL ? "الإسكندرية، مصر" : "Alexandria, Egypt"}
                value={localSettings.mapLocation}
                onChange={(e) => setLocalSettings({ ...localSettings, mapLocation: e.target.value })}
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{isRTL ? "خط العرض" : "Latitude"}</label>
              <Input
                type="number"
                step="0.0001"
                value={localSettings.mapLat}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, mapLat: Number.parseFloat(e.target.value) || 31.2001 })
                }
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{isRTL ? "خط الطول" : "Longitude"}</label>
              <Input
                type="number"
                step="0.0001"
                value={localSettings.mapLng}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, mapLng: Number.parseFloat(e.target.value) || 29.9187 })
                }
                className="bg-gray-50"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 mb-4">
            {isRTL
              ? "يمكنك العثور على الإحداثيات بالنقر بزر الماوس الأيمن على خرائط جوجل واختيار الإحداثيات."
              : "You can find coordinates by right-clicking on Google Maps and selecting the coordinates."}
          </p>
          <Button onClick={() => handleSave("map")} className="bg-purple-500 hover:bg-purple-600 text-white gap-2">
            {saved === "map" ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved === "map" ? (isRTL ? "تم الحفظ!" : "Saved!") : isRTL ? "حفظ موقع الخريطة" : "Save Map Location"}
          </Button>
        </div>
      </div>
    </div>
  )
}
