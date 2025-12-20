import { AdminLayout } from "@/components/admin/admin-layout"
import { QuizClient } from "./quiz-client"

export default function QuizPage() {
  return (
    <AdminLayout>
      <QuizClient />
    </AdminLayout>
  )
}
