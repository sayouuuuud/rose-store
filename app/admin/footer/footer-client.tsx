"use client"

import { useState, useEffect } from "react"
import { useStore } from "@/lib/store-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save, Check, Plus, Trash2, Layout } from "lucide-react"

export function FooterClient() {
  const { footerSettings, updateFooterSettings } = useStore()
  const [localSettings, setLocalSettings] = useState(footerSettings)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setLocalSettings(footerSettings)
  }, [footerSettings])

  const handleSave = () => {
    updateFooterSettings(localSettings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const addLink = () => {
    setLocalSettings({
      ...localSettings,
      quickLinks: [...localSettings.quickLinks, { label: { en: "", ar: "" }, href: "" }],
    })
  }

  const removeLink = (index: number) => {
    setLocalSettings({
      ...localSettings,
      quickLinks: localSettings.quickLinks.filter((_, i) => i !== index),
    })
  }

  const updateLink = (index: number, field: "en" | "ar" | "href", value: string) => {
    const updatedLinks = [...localSettings.quickLinks]
    if (field === "href") {
      updatedLinks[index].href = value
    } else {
      updatedLinks[index].label[field] = value
    }
    setLocalSettings({ ...localSettings, quickLinks: updatedLinks })
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Footer Settings</h1>
        <p className="text-gray-500 mt-1">Customize your website footer</p>
      </div>

      <div className="space-y-8">
        {/* Footer Description */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
              <Layout className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Footer Description</h2>
              <p className="text-gray-500 text-sm">The text shown under your store name</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (English)</label>
              <Textarea
                value={localSettings.description.en}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    description: { ...localSettings.description, en: e.target.value },
                  })
                }
                className="bg-gray-50"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (Arabic)</label>
              <Textarea
                value={localSettings.description.ar}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    description: { ...localSettings.description, ar: e.target.value },
                  })
                }
                className="bg-gray-50 text-right"
                dir="rtl"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Layout className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Quick Links</h2>
                <p className="text-gray-500 text-sm">Links shown in the footer</p>
              </div>
            </div>
            <Button onClick={addLink} variant="outline" size="sm" className="gap-2 bg-transparent">
              <Plus className="w-4 h-4" />
              Add Link
            </Button>
          </div>
          <div className="space-y-4">
            {localSettings.quickLinks.map((link, index) => (
              <div key={index} className="grid grid-cols-4 gap-3 items-center">
                <Input
                  value={link.label.en}
                  onChange={(e) => updateLink(index, "en", e.target.value)}
                  placeholder="Label (English)"
                  className="bg-gray-50"
                />
                <Input
                  value={link.label.ar}
                  onChange={(e) => updateLink(index, "ar", e.target.value)}
                  placeholder="Label (Arabic)"
                  className="bg-gray-50 text-right"
                  dir="rtl"
                />
                <Input
                  value={link.href}
                  onChange={(e) => updateLink(index, "href", e.target.value)}
                  placeholder="/page-url"
                  className="bg-gray-50"
                />
                <Button onClick={() => removeLink(index)} variant="ghost" size="icon" className="text-red-500">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links Toggle */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Show Social Links</h2>
              <p className="text-gray-500 text-sm">Display social media icons in footer</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localSettings.showSocialLinks}
                onChange={(e) => setLocalSettings({ ...localSettings, showSocialLinks: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
            </label>
          </div>
        </div>

        <Button onClick={handleSave} className="bg-rose-500 hover:bg-rose-600 text-white gap-2">
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save Footer Settings"}
        </Button>
      </div>
    </div>
  )
}
