"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-rose-600 hover:text-rose-800 transition-colors"
    >
      <LogOut className="w-5 h-5" />
      <span className="hidden sm:inline">Logout</span>
    </button>
  )
}
