import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatsCard({ title, value, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <div className={cn("bg-white rounded-2xl p-6 shadow-sm", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className={cn("text-sm font-medium mt-2", trend.isPositive ? "text-green-600" : "text-red-600")}>
              {trend.isPositive ? "+" : "-"}
              {Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-rose-600" />
        </div>
      </div>
    </div>
  )
}
