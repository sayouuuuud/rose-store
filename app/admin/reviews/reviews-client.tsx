"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import { useStore, type Review } from "@/lib/store-context"
import { Star, Edit, Trash2, Plus, X, Upload, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ReviewsClient() {
  const { reviews, addReview, updateReview, removeReview } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    text: { en: "", ar: "" },
    avatar: "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const openModal = (review?: Review) => {
    if (review) {
      setEditingReview(review)
      setFormData({
        name: review.name,
        rating: review.rating,
        text: review.text,
        avatar: review.avatar,
      })
    } else {
      setEditingReview(null)
      setFormData({ name: "", rating: 5, text: { en: "", ar: "" }, avatar: "" })
    }
    setIsModalOpen(true)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (editingReview) {
      updateReview(editingReview.id, formData)
    } else {
      addReview(formData)
    }
    setIsModalOpen(false)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-500 mt-1">Manage customer testimonials</p>
        </div>
        <Button onClick={() => openModal()} className="bg-rose-500 hover:bg-rose-600 text-white gap-2">
          <Plus className="w-5 h-5" />
          Add Review
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={review.avatar || "/placeholder.svg?height=48&width=48&query=person"}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{review.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mt-2">{review.text.en}</p>
                  <p className="text-gray-500 mt-1 text-sm" dir="rtl">
                    {review.text.ar}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openModal(review)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => removeReview(review.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
            <p className="text-gray-500">No reviews yet. Add your first review.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{editingReview ? "Edit Review" : "Add Review"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-20 h-20 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-rose-300 overflow-hidden"
                >
                  {formData.avatar ? (
                    <Image
                      src={formData.avatar || "/placeholder.svg"}
                      alt="Avatar"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  ) : (
                    <Upload className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Customer name"
                  className="bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${star <= formData.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Review (English)</label>
                <Textarea
                  value={formData.text.en}
                  onChange={(e) => setFormData({ ...formData, text: { ...formData.text, en: e.target.value } })}
                  placeholder="Write the review in English..."
                  className="bg-gray-50"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Review (Arabic)</label>
                <Textarea
                  value={formData.text.ar}
                  onChange={(e) => setFormData({ ...formData, text: { ...formData.text, ar: e.target.value } })}
                  placeholder="اكتب التقييم بالعربية..."
                  className="bg-gray-50 text-right"
                  dir="rtl"
                  rows={3}
                />
              </div>

              <Button onClick={handleSubmit} className="w-full bg-rose-500 hover:bg-rose-600 text-white gap-2">
                <Check className="w-4 h-4" />
                {editingReview ? "Update Review" : "Add Review"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
