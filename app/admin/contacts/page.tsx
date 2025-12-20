import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ContactsClient } from "./contacts-client"

export default async function AdminContactsPage() {
  const user = await getUser()

  if (!user || user.role !== "admin") {
    redirect("/admin/login")
  }

  return (
    <AdminLayout userEmail={user.email}>
      <ContactsClient />
    </AdminLayout>
  )
}
