"use client"

import { useState, useEffect } from "react"
import { useStore } from "@/lib/store-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, Check, User, Lock } from "lucide-react"

export function ProfileClient() {
  const { adminSettings, updateAdminSettings } = useStore()
  const [localSettings, setLocalSettings] = useState(adminSettings)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [saved, setSaved] = useState<string | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    setLocalSettings(adminSettings)
  }, [adminSettings])

  const handleSaveProfile = () => {
    updateAdminSettings({ name: localSettings.name, email: localSettings.email })
    setSaved("profile")
    setTimeout(() => setSaved(null), 2000)
  }

  const handleSavePassword = () => {
    setError("")
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    updateAdminSettings({ password: newPassword })
    setNewPassword("")
    setConfirmPassword("")
    setSaved("password")
    setTimeout(() => setSaved(null), 2000)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
        <p className="text-gray-500 mt-1">Manage your admin account settings</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Profile Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Profile Information</h2>
              <p className="text-gray-500 text-sm">Update your account details</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <Input
                type="text"
                value={localSettings.name}
                onChange={(e) => setLocalSettings({ ...localSettings, name: e.target.value })}
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <Input
                type="email"
                value={localSettings.email}
                onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                className="bg-gray-50"
              />
            </div>
            <Button onClick={handleSaveProfile} className="bg-rose-500 hover:bg-rose-600 text-white gap-2">
              {saved === "profile" ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved === "profile" ? "Saved!" : "Save Profile"}
            </Button>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Change Password</h2>
              <p className="text-gray-500 text-sm">Update your password</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="bg-gray-50"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button onClick={handleSavePassword} className="bg-blue-500 hover:bg-blue-600 text-white gap-2">
              {saved === "password" ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved === "password" ? "Saved!" : "Change Password"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
