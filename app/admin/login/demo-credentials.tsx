"use client"

import { useStore } from "@/lib/store-context"
import { useEffect, useState } from "react"

export function DemoCredentials() {
  const { adminSettings } = useStore()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Show default credentials during SSR to prevent hydration mismatch
  const email = mounted ? adminSettings.email : "admin@whisperingpetals.com"
  const hasCustomPassword = mounted && adminSettings.password

  return (
    <div className="mt-6 p-4 bg-rose-100/50 rounded-xl">
      <p className="text-rose-700 text-sm text-center">
        <strong>Demo credentials:</strong>
        <br />
        Email: {email}
        <br />
        Password: {mounted ? adminSettings.password || "admin123" : "admin123"}
      </p>
    </div>
  )
}
