"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Settings {
  whatsappNumber: string
  messageTemplate: string
}

interface SettingsContextType {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
}

const defaultSettings: Settings = {
  whatsappNumber: "+1234567890",
  messageTemplate: `Hello,
I would like to order:
Product: {productName}
Product ID: {productId}
Color: {color}
Quantity: {quantity}
Total: ${"{total}"}`,
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  useEffect(() => {
    const saved = localStorage.getItem("shopSettings")
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch {
        // Use default settings
      }
    }
  }, [])

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    localStorage.setItem("shopSettings", JSON.stringify(updated))
  }

  return <SettingsContext.Provider value={{ settings, updateSettings }}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
