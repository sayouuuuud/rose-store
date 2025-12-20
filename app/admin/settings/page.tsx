import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { AdminLayout } from "@/components/admin/admin-layout"
import { SettingsClient } from "./settings-client"

export default async function AdminSettingsPage() {
  const user = await getUser()

  if (!user || user.role !== "admin") {
    redirect("/admin/login")
  }

  return (
    <AdminLayout userEmail={user.email}>
      <SettingsClient />
    </AdminLayout>
  )
}
