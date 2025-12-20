import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { AdminLayout } from "@/components/admin/admin-layout"
import { GalleryClient } from "./gallery-client"

export default async function AdminGalleryPage() {
  const user = await getUser()

  if (!user || user.role !== "admin") {
    redirect("/admin/login")
  }

  return (
    <AdminLayout userEmail={user.email}>
      <GalleryClient />
    </AdminLayout>
  )
}
