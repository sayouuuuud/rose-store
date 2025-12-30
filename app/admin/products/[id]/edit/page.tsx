"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useStore } from "@/lib/store-context"
import { ProductForm } from "../../product-form"
import { AdminLayout } from "@/components/admin/admin-layout"

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const { id } = use(params)
  const { products } = useStore()
  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <AdminLayout>
        <div className="p-8">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 text-rose-700 hover:text-rose-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Products</span>
          </Link>
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <h2 className="font-serif text-2xl text-rose-900 mb-4">Product Not Found</h2>
            <p className="text-gray-500">This product may have been deleted or does not exist.</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  // Convert product to the format expected by ProductForm
  const formattedProduct = {
    id: product.id,
    name: typeof product.name === "string" ? product.name : product.name.en,
    price: product.price,
    description: typeof product.description === "string" ? product.description : product.description.en,
    images: product.images,
    colors: product.colors,
    availability: product.availability,
    category: product.category,
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-rose-700 hover:text-rose-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Products</span>
        </Link>
        <h1 className="font-serif text-3xl text-rose-900 mb-8">Edit Product</h1>
        <ProductForm product={formattedProduct} />
      </div>
    </AdminLayout>
  )
}
