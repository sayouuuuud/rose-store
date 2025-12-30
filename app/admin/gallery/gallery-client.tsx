"use client"

import type React from "react"
import { useRef } from "react"
import Image from "next/image"
import { useStore } from "@/lib/store-context"
import { Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export function GalleryClient() {
  const { galleryImages, addGalleryImage, removeGalleryImage } = useStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          addGalleryImage({
            src: reader.result as string,
            alt: file.name.replace(/\.[^/.]+$/, ""),
          })
        }
        reader.readAsDataURL(file)
      })
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
          <p className="text-gray-500 mt-1">Manage your store gallery images</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="bg-rose-500 hover:bg-rose-600 text-white gap-2"
        >
          <Upload className="w-5 h-5" />
          Upload Images
        </Button>
      </div>

      {/* Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="bg-white rounded-2xl p-8 shadow-sm mb-8 border-2 border-dashed border-gray-200 hover:border-rose-300 transition-colors cursor-pointer"
      >
        <div className="text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Drop images here or click to upload</p>
          <p className="text-gray-400 text-sm mt-1">PNG, JPG up to 10MB</p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image) => (
          <div key={image.id} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={image.src || "/placeholder.svg?height=300&width=300&query=flower arrangement"}
              alt={image.alt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => removeGalleryImage(image.id)}
                className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Trash2 className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {galleryImages.length === 0 && (
        <div className="text-center py-12 text-gray-500">No gallery images yet. Upload some images to get started.</div>
      )}
    </div>
  )
}
