import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { AdminLayout } from "@/components/admin/admin-layout"
import { TranslationsClient } from "./translations-client"

export default async function AdminTranslationsPage() {
  const user = await getUser()

  if (!user || user.role !== "admin") {
    redirect("/admin/login")
  }

  return (
    <AdminLayout userEmail={user.email}>
      <TranslationsClient />
    </AdminLayout>
  )
}
