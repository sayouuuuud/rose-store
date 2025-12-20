"use client"

import { useState, useEffect } from "react"
import { Bell, Check, CheckCheck, Trash2, Filter, Search, HelpCircle, MessageSquare } from "lucide-react"
import { useStore } from "@/lib/store-context"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function NotificationsClient() {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, clearAllNotifications } = useStore()
  const { locale } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all")
  const [typeFilter, setTypeFilter] = useState<"all" | "message" | "quiz">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const isRTL = locale === "ar"

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredNotifications = notifications.filter((n) => {
    // Filter by read status
    if (filter === "unread" && n.read) return false
    if (filter === "read" && !n.read) return false

    // Filter by type
    if (typeFilter !== "all" && n.type !== typeFilter) return false

    // Filter by search query
    if (searchQuery && !n.message.toLowerCase().includes(searchQuery.toLowerCase())) return false

    return true
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  if (!mounted) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`p-6 ${isRTL ? "font-arabic" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-serif text-rose-900 flex items-center gap-2">
            <Bell className="w-6 h-6" />
            {isRTL ? "الإشعارات" : "Notifications"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isRTL
              ? `لديك ${unreadCount} إشعار غير مقروء من أصل ${notifications.length}`
              : `You have ${unreadCount} unread of ${notifications.length} total notifications`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllNotificationsAsRead}
              className="text-rose-600 border-rose-200 hover:bg-rose-50 bg-transparent"
            >
              <CheckCheck className="w-4 h-4 mr-2" />
              {isRTL ? "تحديد الكل كمقروء" : "Mark All Read"}
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllNotifications}
              className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {isRTL ? "مسح الكل" : "Clear All"}
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            className={cn(
              "absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
              isRTL ? "right-3" : "left-3",
            )}
          />
          <Input
            placeholder={isRTL ? "بحث في الإشعارات..." : "Search notifications..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn("pl-10", isRTL && "pr-10 pl-4")}
          />
        </div>

        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="default">
              <Filter className="w-4 h-4 mr-2" />
              {filter === "all"
                ? isRTL
                  ? "الكل"
                  : "All"
                : filter === "unread"
                  ? isRTL
                    ? "غير مقروء"
                    : "Unread"
                  : isRTL
                    ? "مقروء"
                    : "Read"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilter("all")}>{isRTL ? "الكل" : "All"}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("unread")}>{isRTL ? "غير مقروء" : "Unread"}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("read")}>{isRTL ? "مقروء" : "Read"}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Type Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="default">
              {typeFilter === "all" ? (
                <>
                  <Bell className="w-4 h-4 mr-2" />
                  {isRTL ? "كل الأنواع" : "All Types"}
                </>
              ) : typeFilter === "message" ? (
                <>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {isRTL ? "الرسائل" : "Messages"}
                </>
              ) : (
                <>
                  <HelpCircle className="w-4 h-4 mr-2" />
                  {isRTL ? "الاختبارات" : "Quizzes"}
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTypeFilter("all")}>
              <Bell className="w-4 h-4 mr-2" />
              {isRTL ? "كل الأنواع" : "All Types"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTypeFilter("message")}>
              <MessageSquare className="w-4 h-4 mr-2" />
              {isRTL ? "الرسائل" : "Messages"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTypeFilter("quiz")}>
              <HelpCircle className="w-4 h-4 mr-2" />
              {isRTL ? "الاختبارات" : "Quizzes"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Notifications List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 flex items-start gap-4 transition-colors hover:bg-accent/50 cursor-pointer",
                  !notification.read && "bg-rose-50 dark:bg-rose-950/20",
                )}
                onClick={() => markNotificationAsRead(notification.id)}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                    notification.type === "message"
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
                  )}
                >
                  {notification.type === "message" ? (
                    <MessageSquare className="w-5 h-5" />
                  ) : (
                    <HelpCircle className="w-5 h-5" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-sm",
                      !notification.read ? "font-medium text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        notification.type === "message"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
                      )}
                    >
                      {notification.type === "message" ? (isRTL ? "رسالة" : "Message") : isRTL ? "اختبار" : "Quiz"}
                    </span>
                  </div>
                </div>

                {/* Read indicator */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!notification.read && <span className="w-2.5 h-2.5 bg-rose-500 rounded-full" />}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      markNotificationAsRead(notification.id)
                    }}
                  >
                    <Check className={cn("w-4 h-4", notification.read ? "text-green-500" : "text-muted-foreground")} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">
              {isRTL ? "لا توجد إشعارات" : "No notifications"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery || filter !== "all" || typeFilter !== "all"
                ? isRTL
                  ? "لا توجد إشعارات تطابق الفلتر"
                  : "No notifications match your filter"
                : isRTL
                  ? "ستظهر الإشعارات الجديدة هنا"
                  : "New notifications will appear here"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
