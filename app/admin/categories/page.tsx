import { AdminLayout } from "@/components/admin/admin-layout"
import { CategoriesClient } from "./categories-client"

export default function CategoriesPage() {
  return (
    <AdminLayout>
      <CategoriesClient />
    </AdminLayout>
  )
}
