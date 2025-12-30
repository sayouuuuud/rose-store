import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { AdminLayout } from "@/components/admin/admin-layout"
import { NotificationsClient } from "./notifications-client"

export default async function NotificationsPage() {
  const user = await getUser()

  if (!user || user.role !== "admin") {
    redirect("/admin/login")
  }

  return (
    <AdminLayout>
      <NotificationsClient />
    </AdminLayout>
  )
}
