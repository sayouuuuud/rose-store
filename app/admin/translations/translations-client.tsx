"use client"

import { useState, useEffect } from "react"
import { useStore } from "@/lib/store-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save, Check } from "lucide-react"

export function TranslationsClient() {
  const { contentSettings, updateContentSettings, sectionNames, updateSectionNames } = useStore()
  const [localContent, setLocalContent] = useState(contentSettings)
  const [localSections, setLocalSections] = useState(sectionNames)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setLocalContent(contentSettings)
    setLocalSections(sectionNames)
  }, [contentSettings, sectionNames])

  const handleSave = () => {
    updateContentSettings(localContent)
    updateSectionNames(localSections)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Translations</h1>
          <p className="text-gray-500 mt-1">Manage Arabic and English translations side by side</p>
        </div>
        <Button onClick={handleSave} className="bg-rose-500 hover:bg-rose-600 text-white gap-2">
          {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
          {saved ? "Saved!" : "Save All"}
        </Button>
      </div>

      {/* Section Names */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <h2 className="font-semibold text-gray-900">Section Names</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {(["products", "gallery", "reviews", "ourStory"] as const).map((key) => (
            <div key={key} className="grid grid-cols-3 gap-4 px-6 py-4 items-center">
              <code className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700 w-fit">{key}</code>
              <Input
                value={localSections[key].en}
                onChange={(e) =>
                  setLocalSections({
                    ...localSections,
                    [key]: { ...localSections[key], en: e.target.value },
                  })
                }
                className="bg-gray-50 border-gray-200"
                placeholder="English"
              />
              <Input
                value={localSections[key].ar}
                onChange={(e) =>
                  setLocalSections({
                    ...localSections,
                    [key]: { ...localSections[key], ar: e.target.value },
                  })
                }
                className="bg-gray-50 border-gray-200 text-right"
                dir="rtl"
                placeholder="Arabic"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <h2 className="font-semibold text-gray-900">Hero Section</h2>
        </div>
        <div className="divide-y divide-gray-100">
          <div className="grid grid-cols-3 gap-4 px-6 py-4 items-start">
            <code className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700 w-fit">heroTitle</code>
            <Input
              value={localContent.heroTitle.en}
              onChange={(e) =>
                setLocalContent({
                  ...localContent,
                  heroTitle: { ...localContent.heroTitle, en: e.target.value },
                })
              }
              className="bg-gray-50 border-gray-200"
            />
            <Input
              value={localContent.heroTitle.ar}
              onChange={(e) =>
                setLocalContent({
                  ...localContent,
                  heroTitle: { ...localContent.heroTitle, ar: e.target.value },
                })
              }
              className="bg-gray-50 border-gray-200 text-right"
              dir="rtl"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 px-6 py-4 items-start">
            <code className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700 w-fit">heroSubtitle</code>
            <Textarea
              value={localContent.heroSubtitle.en}
              onChange={(e) =>
                setLocalContent({
                  ...localContent,
                  heroSubtitle: { ...localContent.heroSubtitle, en: e.target.value },
                })
              }
              className="bg-gray-50 border-gray-200"
              rows={2}
            />
            <Textarea
              value={localContent.heroSubtitle.ar}
              onChange={(e) =>
                setLocalContent({
                  ...localContent,
                  heroSubtitle: { ...localContent.heroSubtitle, ar: e.target.value },
                })
              }
              className="bg-gray-50 border-gray-200 text-right"
              dir="rtl"
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Story Content */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <h2 className="font-semibold text-gray-900">Our Story Section</h2>
        </div>
        <div className="divide-y divide-gray-100">
          <div className="grid grid-cols-3 gap-4 px-6 py-4 items-start">
            <code className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700 w-fit">storyText</code>
            <Textarea
              value={localContent.storyText.en}
              onChange={(e) =>
                setLocalContent({
                  ...localContent,
                  storyText: { ...localContent.storyText, en: e.target.value },
                })
              }
              className="bg-gray-50 border-gray-200"
              rows={4}
            />
            <Textarea
              value={localContent.storyText.ar}
              onChange={(e) =>
                setLocalContent({
                  ...localContent,
                  storyText: { ...localContent.storyText, ar: e.target.value },
                })
              }
              className="bg-gray-50 border-gray-200 text-right"
              dir="rtl"
              rows={4}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 px-6 py-4 items-start">
            <code className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700 w-fit">storyText2</code>
            <Textarea
              value={localContent.storyText2.en}
              onChange={(e) =>
                setLocalContent({
                  ...localContent,
                  storyText2: { ...localContent.storyText2, en: e.target.value },
                })
              }
              className="bg-gray-50 border-gray-200"
              rows={3}
            />
            <Textarea
              value={localContent.storyText2.ar}
              onChange={(e) =>
                setLocalContent({
                  ...localContent,
                  storyText2: { ...localContent.storyText2, ar: e.target.value },
                })
              }
              className="bg-gray-50 border-gray-200 text-right"
              dir="rtl"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
