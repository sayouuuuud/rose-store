import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getUser } from "@/lib/auth"
import { ProductForm } from "../product-form"

export default async function NewProductPage() {
  const user = await getUser()

  if (!user || user.role !== "admin") {
    redirect("/admin/login")
  }

  return (
    <main className="min-h-screen bg-rose-50/50">
      <header className="bg-white border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-rose-700 hover:text-rose-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl text-rose-900 mb-8">Add New Product</h1>
        <ProductForm />
      </div>
    </main>
  )
}
