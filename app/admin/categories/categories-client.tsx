"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { useStore } from "@/lib/store-context"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function CategoriesClient() {
  const { categories, addCategory, updateCategory, removeCategory, adminTranslations, products } = useStore()
  const { locale } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
  })

  const t = adminTranslations.categories
  const tc = adminTranslations.common

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleOpenDialog = (categoryId?: string) => {
    if (categoryId) {
      const category = categories.find((c) => c.id === categoryId)
      if (category) {
        setFormData({
          nameEn: category.name.en,
          nameAr: category.name.ar,
          descriptionEn: category.description?.en || "",
          descriptionAr: category.description?.ar || "",
        })
        setEditingCategory(categoryId)
      }
    } else {
      setFormData({ nameEn: "", nameAr: "", descriptionEn: "", descriptionAr: "" })
      setEditingCategory(null)
    }
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    const categoryData = {
      name: { en: formData.nameEn, ar: formData.nameAr },
      description: { en: formData.descriptionEn, ar: formData.descriptionAr },
    }

    if (editingCategory) {
      updateCategory(editingCategory, categoryData)
    } else {
      addCategory(categoryData)
    }

    setIsDialogOpen(false)
    setEditingCategory(null)
  }

  const handleDelete = () => {
    if (categoryToDelete) {
      removeCategory(categoryToDelete)
      setCategoryToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const getProductCount = (categoryName: string) => {
    return products.filter((p) => p.category === categoryName).length
  }

  if (!mounted) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif text-rose-900">{t.title[locale]}</h1>
        <Button onClick={() => handleOpenDialog()} className="bg-rose-500 hover:bg-rose-600">
          <Plus className="w-4 h-4 mr-2" />
          {t.addCategory[locale]}
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{category.name[locale]}</h3>
                {category.description && (
                  <p className="text-sm text-muted-foreground mt-1">{category.description[locale]}</p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  {getProductCount(category.name.en)} {tc.name[locale] === "الاسم" ? "منتج" : "products"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenDialog(category.id)}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <Pencil className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => {
                    setCategoryToDelete(category.id)
                    setIsDeleteDialogOpen(true)
                  }}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">{t.noCategories[locale]}</div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingCategory ? t.editCategory[locale] : t.addCategory[locale]}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t.categoryName[locale]} (EN)</Label>
                <Input
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  placeholder="Category name"
                />
              </div>
              <div>
                <Label>{t.categoryName[locale]} (AR)</Label>
                <Input
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  placeholder="اسم الفئة"
                  dir="rtl"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t.categoryDescription[locale]} (EN)</Label>
                <Textarea
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  placeholder="Description"
                  rows={3}
                />
              </div>
              <div>
                <Label>{t.categoryDescription[locale]} (AR)</Label>
                <Textarea
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  placeholder="الوصف"
                  dir="rtl"
                  rows={3}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              {tc.cancel[locale]}
            </Button>
            <Button onClick={handleSave} className="bg-rose-500 hover:bg-rose-600">
              {tc.save[locale]}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{tc.delete[locale]}</AlertDialogTitle>
            <AlertDialogDescription>
              {locale === "ar"
                ? "هل أنت متأكد من حذف هذه الفئة؟ لا يمكن التراجع عن هذا الإجراء."
                : "Are you sure you want to delete this category? This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{tc.cancel[locale]}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              {tc.delete[locale]}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
