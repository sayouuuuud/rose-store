"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Save, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Settings {
  whatsappNumber: string
  messageTemplate: string
}

const defaultSettings: Settings = {
  whatsappNumber: "+1234567890",
  messageTemplate: `Hello,
I would like to order:
Product: {productName}
Product ID: {productId}
Color: {color}
Quantity: {quantity}
Total: {total}`,
}

export function WhatsAppSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedSettings = localStorage.getItem("shopSettings")
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch {
        // Use defaults
      }
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("shopSettings", JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold text-rose-900">WhatsApp Settings</h3>
          <p className="text-rose-600/70 text-sm">Configure your WhatsApp ordering details</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="whatsappNumber" className="text-rose-900">
            WhatsApp Number
          </Label>
          <Input
            id="whatsappNumber"
            value={settings.whatsappNumber}
            onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
            placeholder="+1234567890"
            className="mt-1.5 border-rose-200 focus:border-rose-400 focus:ring-rose-400"
          />
          <p className="text-xs text-rose-500/70 mt-1">Include country code (e.g., +1 for US)</p>
        </div>

        <div>
          <Label htmlFor="messageTemplate" className="text-rose-900">
            Message Template
          </Label>
          <Textarea
            id="messageTemplate"
            value={settings.messageTemplate}
            onChange={(e) => setSettings({ ...settings, messageTemplate: e.target.value })}
            rows={8}
            className="mt-1.5 border-rose-200 focus:border-rose-400 focus:ring-rose-400 font-mono text-sm"
          />
          <div className="text-xs text-rose-500/70 mt-2 space-y-1">
            <p className="font-medium">Available placeholders:</p>
            <p>
              {"{productName}"} - Product name | {"{productId}"} - Product ID
            </p>
            <p>
              {"{color}"} - Selected color | {"{quantity}"} - Quantity
            </p>
            <p>{"{total}"} - Total price</p>
          </div>
        </div>

        <Button
          onClick={handleSave}
          className={`w-full ${saved ? "bg-green-500 hover:bg-green-500" : "bg-rose-500 hover:bg-rose-600"} text-white rounded-xl`}
        >
          {saved ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Saved Successfully
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
