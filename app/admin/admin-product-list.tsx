"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Pencil, Trash2 } from "lucide-react"
import type { Product } from "@/lib/products-data"

interface AdminProductListProps {
  products: Product[]
}

export function AdminProductList({ products: initialProducts }: AdminProductListProps) {
  const [products, setProducts] = useState(initialProducts)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    setDeletingId(id)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    setProducts((prev) => prev.filter((p) => p.id !== id))
    setDeletingId(null)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-rose-50 border-b border-rose-100">
            <tr>
              <th className="text-left px-4 py-3 text-rose-700 text-sm font-semibold">Product</th>
              <th className="text-left px-4 py-3 text-rose-700 text-sm font-semibold hidden sm:table-cell">Category</th>
              <th className="text-left px-4 py-3 text-rose-700 text-sm font-semibold">Price</th>
              <th className="text-left px-4 py-3 text-rose-700 text-sm font-semibold hidden md:table-cell">Status</th>
              <th className="text-right px-4 py-3 text-rose-700 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rose-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-rose-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-rose-900 text-sm">{product.name}</p>
                      <p className="text-rose-600/70 text-xs">ID: {product.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-rose-700 text-sm hidden sm:table-cell">{product.category}</td>
                <td className="px-4 py-3 text-rose-900 font-semibold">${product.price}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      product.availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.availability ? "Available" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deletingId === product.id}
                      className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
