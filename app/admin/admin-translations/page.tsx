import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminTranslationsClient } from "./admin-translations-client"

export default function AdminTranslationsPage() {
  return (
    <AdminLayout>
      <AdminTranslationsClient />
    </AdminLayout>
  )
}
