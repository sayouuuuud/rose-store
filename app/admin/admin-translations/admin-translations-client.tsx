"use client"

import { useState, useEffect } from "react"
import { Save, ChevronDown, ChevronRight } from "lucide-react"
import { useStore, type AdminTranslations } from "@/lib/store-context"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type TranslationSection = keyof AdminTranslations

export function AdminTranslationsClient() {
  const { adminTranslations, updateAdminTranslations } = useStore()
  const { locale } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [localTranslations, setLocalTranslations] = useState<AdminTranslations>(adminTranslations)
  const [expandedSections, setExpandedSections] = useState<Set<TranslationSection>>(new Set(["sidebar"]))
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setLocalTranslations(adminTranslations)
  }, [adminTranslations])

  const toggleSection = (section: TranslationSection) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(section)) {
        next.delete(section)
      } else {
        next.add(section)
      }
      return next
    })
  }

  const handleChange = (section: TranslationSection, key: string, lang: "en" | "ar", value: string) => {
    setLocalTranslations((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: {
          ...(prev[section] as Record<string, { en: string; ar: string }>)[key],
          [lang]: value,
        },
      },
    }))
    setSaved(false)
  }

  const handleSave = () => {
    updateAdminTranslations(localTranslations)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const sectionLabels: Record<TranslationSection, { en: string; ar: string }> = {
    sidebar: { en: "Sidebar Navigation", ar: "قائمة التنقل الجانبية" },
    common: { en: "Common Terms", ar: "مصطلحات عامة" },
    dashboard: { en: "Dashboard", ar: "لوحة التحكم" },
    products: { en: "Products", ar: "المنتجات" },
    categories: { en: "Categories", ar: "الفئات" },
    settings: { en: "Settings", ar: "الإعدادات" },
    notifications: { en: "Notifications", ar: "الإشعارات" },
    header: { en: "Header", ar: "الرأس" },
  }

  if (!mounted) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif text-rose-900">
            {locale === "ar" ? "ترجمات لوحة الإدارة" : "Admin Panel Translations"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {locale === "ar" ? "قم بتخصيص جميع النصوص في لوحة الإدارة" : "Customize all text in the admin panel"}
          </p>
        </div>
        <Button onClick={handleSave} className="bg-rose-500 hover:bg-rose-600">
          <Save className="w-4 h-4 mr-2" />
          {saved ? (locale === "ar" ? "تم الحفظ!" : "Saved!") : locale === "ar" ? "حفظ التغييرات" : "Save Changes"}
        </Button>
      </div>

      <div className="space-y-4">
        {(Object.keys(localTranslations) as TranslationSection[]).map((section) => (
          <div key={section} className="bg-card border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection(section)}
              className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
            >
              <h2 className="font-semibold text-foreground">{sectionLabels[section][locale]}</h2>
              {expandedSections.has(section) ? (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            <div
              className={cn(
                "border-t border-border transition-all duration-200",
                expandedSections.has(section) ? "block" : "hidden",
              )}
            >
              <div className="p-4 space-y-4">
                {Object.entries(localTranslations[section]).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <div className="flex items-center">
                      <Label className="text-sm font-medium text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </Label>
                    </div>
                    <div>
                      <Input
                        value={(value as { en: string; ar: string }).en}
                        onChange={(e) => handleChange(section, key, "en", e.target.value)}
                        placeholder="English"
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Input
                        value={(value as { en: string; ar: string }).ar}
                        onChange={(e) => handleChange(section, key, "ar", e.target.value)}
                        placeholder="العربية"
                        dir="rtl"
                        className="text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
