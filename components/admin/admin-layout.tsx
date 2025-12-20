"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { AdminSidebar } from "./admin-sidebar"
import { AdminHeader } from "./admin-header"
import { useStore } from "@/lib/store-context"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { setIsAdminPage } = useStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // This ensures notification sounds only play in admin panel
  useEffect(() => {
    setIsAdminPage(true)
    return () => setIsAdminPage(false)
  }, [setIsAdminPage])

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-64 min-h-screen flex flex-col">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1">{children}</main>
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
