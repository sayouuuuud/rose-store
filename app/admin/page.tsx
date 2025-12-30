import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminDashboardClient } from "./dashboard-client"

export default async function AdminDashboard() {
  const user = await getUser()

  if (!user || user.role !== "admin") {
    redirect("/admin/login")
  }

  return (
    <AdminLayout>
      <AdminDashboardClient />
    </AdminLayout>
  )
}
