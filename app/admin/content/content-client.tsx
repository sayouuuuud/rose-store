"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useStore } from "@/lib/store-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save, FileText, Check, Upload, Pencil, AlertCircle, Loader2 } from "lucide-react"

export function ContentClient() {
  const { contentSettings, updateContentSettings, sectionNames, updateSectionNames } = useStore()
  const [localContent, setLocalContent] = useState(contentSettings)
  const [localSectionNames, setLocalSectionNames] = useState(sectionNames)
  const [saved, setSaved] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [imageLoading, setImageLoading] = useState(false)
  const heroImageRef = useRef<HTMLInputElement>(null)
  const aboutImageRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setLocalContent(contentSettings)
    setLocalSectionNames(sectionNames)
  }, [contentSettings, sectionNames])

  const handleSave = (section: string) => {
    setSaveError(null)
    try {
      if (section === "sections") {
        updateSectionNames(localSectionNames)
      } else {
        updateContentSettings(localContent)
      }
      setSaved(section)
      setTimeout(() => setSaved(null), 2000)
    } catch (error) {
      console.error("[v0] Error saving content:", error)
      setSaveError("Failed to save - storage may be full")
    }
  }

  const compressImage = (dataUrl: string, maxWidth: number): Promise<string> => {
    return new Promise((resolve) => {
      if (!dataUrl.startsWith("data:image")) {
        resolve(dataUrl)
        return
      }

      const img = new window.Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        const canvas = document.createElement("canvas")
        // Ensure we don't upscale
        const ratio = Math.min(maxWidth / img.width, 1)
        canvas.width = img.width * ratio
        canvas.height = img.height * ratio
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          const compressed = canvas.toDataURL("image/jpeg", 0.5)
          console.log(
            `[v0] Compressed: ${Math.round(dataUrl.length / 1024)}KB -> ${Math.round(compressed.length / 1024)}KB`,
          )
          resolve(compressed)
        } else {
          resolve(dataUrl)
        }
      }
      img.onerror = () => resolve(dataUrl)
      img.src = dataUrl
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "heroImage" | "aboutImage") => {
    const file = e.target.files?.[0]
    if (file) {
      setImageLoading(true)
      setSaveError(null)

      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        compressImage(result, 500).then((compressed) => {
          setLocalContent({ ...localContent, [field]: compressed })
          setImageLoading(false)
        })
      }
      reader.onerror = () => {
        setSaveError("Failed to read image file")
        setImageLoading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
        <p className="text-gray-500 mt-1">Edit website text and images</p>
      </div>

      {saveError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-700 text-sm">{saveError}</p>
          <button onClick={() => setSaveError(null)} className="ml-auto text-red-500 hover:text-red-700">
            ×
          </button>
        </div>
      )}

      <div className="space-y-8">
        {/* Section Names */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Pencil className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Section Names</h2>
              <p className="text-gray-500 text-sm">Edit the names of each section</p>
            </div>
          </div>
          <div className="grid gap-4">
            {(["products", "gallery", "reviews", "ourStory"] as const).map((key) => (
              <div key={key} className="grid md:grid-cols-3 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
                <Input
                  value={localSectionNames[key].en}
                  onChange={(e) =>
                    setLocalSectionNames({
                      ...localSectionNames,
                      [key]: { ...localSectionNames[key], en: e.target.value },
                    })
                  }
                  placeholder="English"
                  className="bg-gray-50"
                />
                <Input
                  value={localSectionNames[key].ar}
                  onChange={(e) =>
                    setLocalSectionNames({
                      ...localSectionNames,
                      [key]: { ...localSectionNames[key], ar: e.target.value },
                    })
                  }
                  placeholder="Arabic"
                  className="bg-gray-50 text-right"
                  dir="rtl"
                />
              </div>
            ))}
          </div>
          <Button
            onClick={() => handleSave("sections")}
            className="bg-purple-500 hover:bg-purple-600 text-white gap-2 mt-4"
          >
            {saved === "sections" ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved === "sections" ? "Saved!" : "Save Section Names"}
          </Button>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Hero Section</h2>
              <p className="text-gray-500 text-sm">Edit the main banner content</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title (English)</label>
              <Input
                value={localContent.heroTitle.en}
                onChange={(e) =>
                  setLocalContent({ ...localContent, heroTitle: { ...localContent.heroTitle, en: e.target.value } })
                }
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title (Arabic)</label>
              <Input
                value={localContent.heroTitle.ar}
                onChange={(e) =>
                  setLocalContent({ ...localContent, heroTitle: { ...localContent.heroTitle, ar: e.target.value } })
                }
                className="bg-gray-50 text-right"
                dir="rtl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle (English)</label>
              <Textarea
                value={localContent.heroSubtitle.en}
                onChange={(e) =>
                  setLocalContent({
                    ...localContent,
                    heroSubtitle: { ...localContent.heroSubtitle, en: e.target.value },
                  })
                }
                className="bg-gray-50"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle (Arabic)</label>
              <Textarea
                value={localContent.heroSubtitle.ar}
                onChange={(e) =>
                  setLocalContent({
                    ...localContent,
                    heroSubtitle: { ...localContent.heroSubtitle, ar: e.target.value },
                  })
                }
                className="bg-gray-50 text-right"
                dir="rtl"
                rows={2}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
            <input
              ref={heroImageRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "heroImage")}
              className="hidden"
            />
            <div
              onClick={() => !imageLoading && heroImageRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-rose-300 transition-colors cursor-pointer"
            >
              {imageLoading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-8 h-8 text-rose-500 animate-spin mb-2" />
                  <p className="text-sm text-gray-600">Compressing image...</p>
                </div>
              ) : localContent.heroImage && localContent.heroImage.startsWith("data:image") ? (
                <img
                  src={localContent.heroImage || "/placeholder.svg"}
                  alt="Hero"
                  className="max-h-32 mx-auto rounded-lg"
                />
              ) : localContent.heroImage && localContent.heroImage.length > 1 ? (
                <img
                  src={localContent.heroImage || "/placeholder.svg"}
                  alt="Hero"
                  className="max-h-32 mx-auto rounded-lg"
                />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload hero image</p>
                </>
              )}
            </div>
          </div>
          <Button onClick={() => handleSave("hero")} className="bg-rose-500 hover:bg-rose-600 text-white gap-2 mt-4">
            {saved === "hero" ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved === "hero" ? "Saved!" : "Save Hero Content"}
          </Button>
        </div>

        {/* Our Story Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Our Story Section</h2>
              <p className="text-gray-500 text-sm">Edit the about section content</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Story Text 1 (English)</label>
                <Textarea
                  value={localContent.storyText.en}
                  onChange={(e) =>
                    setLocalContent({ ...localContent, storyText: { ...localContent.storyText, en: e.target.value } })
                  }
                  className="bg-gray-50"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Story Text 1 (Arabic)</label>
                <Textarea
                  value={localContent.storyText.ar}
                  onChange={(e) =>
                    setLocalContent({ ...localContent, storyText: { ...localContent.storyText, ar: e.target.value } })
                  }
                  className="bg-gray-50 text-right"
                  dir="rtl"
                  rows={4}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Story Text 2 (English)</label>
                <Textarea
                  value={localContent.storyText2.en}
                  onChange={(e) =>
                    setLocalContent({ ...localContent, storyText2: { ...localContent.storyText2, en: e.target.value } })
                  }
                  className="bg-gray-50"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Story Text 2 (Arabic)</label>
                <Textarea
                  value={localContent.storyText2.ar}
                  onChange={(e) =>
                    setLocalContent({ ...localContent, storyText2: { ...localContent.storyText2, ar: e.target.value } })
                  }
                  className="bg-gray-50 text-right"
                  dir="rtl"
                  rows={3}
                />
              </div>
            </div>
          </div>
          <Button onClick={() => handleSave("story")} className="bg-blue-500 hover:bg-blue-600 text-white gap-2 mt-4">
            {saved === "story" ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved === "story" ? "Saved!" : "Save Story Content"}
          </Button>
        </div>
      </div>
    </div>
  )
}
