import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { AdminLayout } from "@/components/admin/admin-layout"
import { FooterClient } from "./footer-client"

export default async function AdminFooterPage() {
  const user = await getUser()

  if (!user || user.role !== "admin") {
    redirect("/admin/login")
  }

  return (
    <AdminLayout userEmail={user.email}>
      <FooterClient />
    </AdminLayout>
  )
}
