"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Bell, User, LogOut, Settings, Check, Globe, Menu } from "lucide-react"
import { useStore } from "@/lib/store-context"
import { useLanguage } from "@/lib/language-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AdminHeaderProps {
  onMenuClick?: () => void
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const router = useRouter()
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, adminSettings, adminTranslations } =
    useStore()
  const { locale, setLocale } = useLanguage()

  const unreadCount = notifications.filter((n) => !n.read).length
  const t = adminTranslations
  const isRTL = locale === "ar"

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin/login")
  }

  return (
    <header
      className={`h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 gap-2 md:gap-4 ${isRTL ? "font-arabic" : ""}`}
    >
      <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors">
        <Menu className="w-5 h-5 text-muted-foreground" />
      </button>

      <div className="flex-1 lg:hidden" />

      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        <button
          onClick={() => setLocale(locale === "en" ? "ar" : "en")}
          className="flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg hover:bg-accent transition-colors"
        >
          <Globe className="w-4 h-4 text-muted-foreground" />
          <span
            className={`text-sm font-medium text-muted-foreground hidden sm:inline ${locale === "en" ? "font-arabic" : ""}`}
          >
            {locale === "en" ? "العربية" : "EN"}
          </span>
        </button>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 hover:bg-accent rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={`w-72 md:w-80 ${isRTL ? "font-arabic" : ""}`}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="font-semibold text-foreground text-sm md:text-base">{t.notifications.title[locale]}</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllNotificationsAsRead}
                  className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  <span className="hidden sm:inline">{t.notifications.markAllRead[locale]}</span>
                </button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.slice(0, 5).map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`px-4 py-3 cursor-pointer ${!notification.read ? "bg-rose-50 dark:bg-rose-950/20" : ""}`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex-1">
                      <p
                        className={`text-sm ${!notification.read ? "font-medium text-foreground" : "text-muted-foreground"}`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                    {!notification.read && <span className="w-2 h-2 bg-rose-500 rounded-full flex-shrink-0" />}
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                  {t.notifications.noNotifications[locale]}
                </div>
              )}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/admin/notifications"
                className="px-4 py-2 text-center text-rose-600 text-sm font-medium w-full justify-center"
              >
                {isRTL ? "عرض جميع الإشعارات" : "View All Notifications"}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Admin Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg transition-colors">
              <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-rose-600" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={`w-56 ${isRTL ? "font-arabic" : ""}`}>
            <div className="px-4 py-3 border-b border-border">
              <p className="text-sm font-medium text-foreground">{adminSettings.name || "Admin"}</p>
              <p className="text-xs text-muted-foreground">{isRTL ? "مسؤول" : "Administrator"}</p>
            </div>
            <DropdownMenuItem asChild>
              <Link href="/admin/settings" className="flex items-center gap-2 px-4 py-2">
                <Settings className="w-4 h-4" />
                {t.header.settings[locale]}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 w-full text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4" />
                {t.header.logout[locale]}
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
