"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Plus, Trash2, Save, Upload, ImageIcon, Eye, EyeOff, Trophy, ChevronDown, ChevronUp, Check } from "lucide-react"
import { useStore, type Quiz, type QuizQuestion } from "@/lib/store-context"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export function QuizClient() {
  const {
    quizzes,
    activeQuiz,
    quizResults,
    addQuiz,
    updateQuiz,
    deleteQuiz,
    setActiveQuiz,
    clearQuizResults,
    adminTranslations,
  } = useStore()
  const { locale } = useLanguage()
  const isRTL = locale === "ar"
  const [mounted, setMounted] = useState(false)
  const [saved, setSaved] = useState(false)
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null)
  const [expandedQuestions, setExpandedQuestions] = useState<{ [key: string]: boolean }>({})
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  const emptyQuiz: Omit<Quiz, "id" | "createdAt"> = {
    title: { en: "New Quiz", ar: "اختبار جديد" },
    description: { en: "Test your knowledge!", ar: "اختبر معرفتك!" },
    questions: [],
    isActive: false,
  }

  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (selectedQuizId && quizzes.length > 0) {
      const quiz = quizzes.find((q) => q.id === selectedQuizId)
      if (quiz) {
        setEditingQuiz({ ...quiz })
      }
    }
  }, [selectedQuizId, quizzes])

  useEffect(() => {
    if (mounted && quizzes.length > 0 && !selectedQuizId) {
      setSelectedQuizId(quizzes[0].id)
    }
  }, [mounted, quizzes, selectedQuizId])

  const handleCreateQuiz = () => {
    addQuiz(emptyQuiz)
    // Select the newly created quiz
    setTimeout(() => {
      if (quizzes.length > 0) {
        setSelectedQuizId(quizzes[quizzes.length - 1]?.id || null)
      }
    }, 100)
  }

  const handleSave = () => {
    if (editingQuiz) {
      updateQuiz(editingQuiz.id, editingQuiz)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm(isRTL ? "هل أنت متأكد من حذف هذا الاختبار؟" : "Are you sure you want to delete this quiz?")) {
      deleteQuiz(id)
      if (selectedQuizId === id) {
        setSelectedQuizId(null)
        setEditingQuiz(null)
      }
    }
  }

  const handleSetActive = (id: string) => {
    setActiveQuiz(id)
  }

  const addQuestion = () => {
    if (!editingQuiz) return
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      image: "",
      questionText: { en: "What flower is this?", ar: "ما هذه الزهرة؟" },
      correctAnswer: { en: "", ar: "" },
      wrongAnswers: [
        { en: "", ar: "" },
        { en: "", ar: "" },
        { en: "", ar: "" },
      ],
    }
    setEditingQuiz({
      ...editingQuiz,
      questions: [...editingQuiz.questions, newQuestion],
    })
    setExpandedQuestions({ ...expandedQuestions, [newQuestion.id]: true })
  }

  const removeQuestion = (id: string) => {
    if (!editingQuiz) return
    setEditingQuiz({
      ...editingQuiz,
      questions: editingQuiz.questions.filter((q) => q.id !== id),
    })
  }

  const updateQuestion = (id: string, updates: Partial<QuizQuestion>) => {
    if (!editingQuiz) return
    setEditingQuiz({
      ...editingQuiz,
      questions: editingQuiz.questions.map((q) => (q.id === id ? { ...q, ...updates } : q)),
    })
  }

  const handleImageUpload = (questionId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const img = new window.Image()
        img.onload = () => {
          const canvas = document.createElement("canvas")
          const maxSize = 400
          const ratio = Math.min(maxSize / img.width, maxSize / img.height, 1)
          canvas.width = img.width * ratio
          canvas.height = img.height * ratio
          const ctx = canvas.getContext("2d")
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            const compressed = canvas.toDataURL("image/jpeg", 0.6)
            updateQuestion(questionId, { image: compressed })
          }
        }
        img.src = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const getImageSrc = (src: string) => {
    if (!src) return ""
    if (src.startsWith("data:image")) return src
    if (src.startsWith("http")) return src
    if (src.startsWith("/")) return src
    return ""
  }

  const toggleQuestion = (id: string) => {
    setExpandedQuestions({ ...expandedQuestions, [id]: !expandedQuestions[id] })
  }

  if (!mounted) {
    return (
      <div className="p-4 md:p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  const t = adminTranslations.sidebar

  return (
    <div className={cn("p-4 md:p-6", isRTL && "font-arabic")} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-serif text-rose-900">
            {t.quiz?.[locale] || (isRTL ? "اختبارات الأزهار" : "Flower Quizzes")}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            {isRTL ? "إنشاء وإدارة اختبارات الأزهار للزوار" : "Create and manage flower quizzes for visitors"}
          </p>
        </div>
        <Button onClick={handleCreateQuiz} className="bg-rose-500 hover:bg-rose-600 w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          {isRTL ? "إنشاء اختبار جديد" : "Create New Quiz"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Quiz List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-4 text-sm md:text-base">
              {isRTL ? "قائمة الاختبارات" : "Quiz List"}
            </h2>

            {quizzes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">{isRTL ? "لا توجد اختبارات" : "No quizzes yet"}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className={cn(
                      "p-3 rounded-xl cursor-pointer transition-all border-2",
                      selectedQuizId === quiz.id
                        ? "bg-rose-50 border-rose-300"
                        : "bg-gray-50 border-transparent hover:bg-gray-100",
                    )}
                    onClick={() => setSelectedQuizId(quiz.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate text-sm">
                          {isRTL ? quiz.title.ar : quiz.title.en}
                        </p>
                        <p className="text-xs text-gray-500">
                          {quiz.questions.length} {isRTL ? "أسئلة" : "questions"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {quiz.isActive && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                            {isRTL ? "نشط" : "Active"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quiz Results */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <h2 className="font-semibold text-gray-800 text-sm md:text-base">
                  {isRTL ? "النتائج" : "Results"} ({quizResults.length})
                </h2>
              </div>
              {quizResults.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearQuizResults}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            {quizResults.length === 0 ? (
              <p className="text-center py-4 text-gray-500 text-sm">{isRTL ? "لا توجد نتائج" : "No results yet"}</p>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {quizResults.slice(0, 20).map((result) => (
                  <div key={result.id} className="p-2 bg-gray-50 rounded-lg text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {result.score}/{result.totalQuestions}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(result.date).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quiz Editor */}
        <div className="lg:col-span-2">
          {editingQuiz ? (
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <h2 className="font-semibold text-base md:text-lg text-gray-800">
                  {isRTL ? "تعديل الاختبار" : "Edit Quiz"}
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(editingQuiz.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button onClick={handleSave} size="sm" className="bg-rose-500 hover:bg-rose-600 flex-1 sm:flex-none">
                    {saved ? <Check className="w-4 h-4 mr-1" /> : <Save className="w-4 h-4 mr-1" />}
                    {saved ? (isRTL ? "تم!" : "Saved!") : isRTL ? "حفظ" : "Save"}
                  </Button>
                </div>
              </div>

              {/* Quiz Settings */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">{isRTL ? "عنوان الاختبار (EN)" : "Quiz Title (EN)"}</Label>
                    <Input
                      value={editingQuiz.title.en}
                      onChange={(e) =>
                        setEditingQuiz({
                          ...editingQuiz,
                          title: { ...editingQuiz.title, en: e.target.value },
                        })
                      }
                      placeholder="Flower Knowledge Quiz"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">{isRTL ? "عنوان الاختبار (AR)" : "Quiz Title (AR)"}</Label>
                    <Input
                      value={editingQuiz.title.ar}
                      onChange={(e) =>
                        setEditingQuiz({
                          ...editingQuiz,
                          title: { ...editingQuiz.title, ar: e.target.value },
                        })
                      }
                      placeholder="اختبار معرفة الأزهار"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">{isRTL ? "الوصف (EN)" : "Description (EN)"}</Label>
                    <Textarea
                      value={editingQuiz.description.en}
                      onChange={(e) =>
                        setEditingQuiz({
                          ...editingQuiz,
                          description: { ...editingQuiz.description, en: e.target.value },
                        })
                      }
                      placeholder="Test your flower knowledge!"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label className="text-sm">{isRTL ? "الوصف (AR)" : "Description (AR)"}</Label>
                    <Textarea
                      value={editingQuiz.description.ar}
                      onChange={(e) =>
                        setEditingQuiz({
                          ...editingQuiz,
                          description: { ...editingQuiz.description, ar: e.target.value },
                        })
                      }
                      placeholder="اختبر معرفتك بالأزهار!"
                      dir="rtl"
                      rows={2}
                    />
                  </div>
                </div>

                {/* Active Toggle */}
                <div className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    {editingQuiz.isActive ? (
                      <Eye className="w-5 h-5 text-green-500" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{isRTL ? "تفعيل الاختبار" : "Activate Quiz"}</p>
                      <p className="text-xs text-gray-500 hidden sm:block">
                        {isRTL ? "سيتم إلغاء تفعيل أي اختبار آخر نشط" : "Any other active quiz will be deactivated"}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={editingQuiz.isActive}
                    onCheckedChange={(checked) => {
                      setEditingQuiz({ ...editingQuiz, isActive: checked })
                      if (checked) {
                        handleSetActive(editingQuiz.id)
                      }
                    }}
                  />
                </div>
              </div>

              {/* Questions */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                    {isRTL ? "الأسئلة" : "Questions"} ({editingQuiz.questions.length})
                  </h3>
                  <Button onClick={addQuestion} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">{isRTL ? "إضافة سؤال" : "Add Question"}</span>
                    <span className="sm:hidden">{isRTL ? "إضافة" : "Add"}</span>
                  </Button>
                </div>

                {editingQuiz.questions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
                    <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">{isRTL ? "لا توجد أسئلة" : "No questions yet"}</p>
                    <Button onClick={addQuestion} variant="link" className="mt-2 text-sm">
                      {isRTL ? "إضافة سؤال جديد" : "Add your first question"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {editingQuiz.questions.map((question, index) => (
                      <div key={question.id} className="border border-gray-200 rounded-xl overflow-hidden">
                        {/* Question Header */}
                        <div
                          className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
                          onClick={() => toggleQuestion(question.id)}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            {question.image && (
                              <img
                                src={getImageSrc(question.image) || "/placeholder.svg"}
                                alt=""
                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                              />
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-800 text-sm">
                                {isRTL ? `سؤال ${index + 1}` : `Question ${index + 1}`}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {isRTL ? question.questionText.ar : question.questionText.en}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeQuestion(question.id)
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            {expandedQuestions[question.id] ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>

                        {/* Question Content */}
                        {expandedQuestions[question.id] && (
                          <div className="p-3 md:p-4 space-y-4">
                            {/* Question Text */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm">{isRTL ? "نص السؤال (EN)" : "Question Text (EN)"}</Label>
                                <Input
                                  value={question.questionText.en}
                                  onChange={(e) =>
                                    updateQuestion(question.id, {
                                      questionText: { ...question.questionText, en: e.target.value },
                                    })
                                  }
                                  placeholder="What flower is this?"
                                />
                              </div>
                              <div>
                                <Label className="text-sm">{isRTL ? "نص السؤال (AR)" : "Question Text (AR)"}</Label>
                                <Input
                                  value={question.questionText.ar}
                                  onChange={(e) =>
                                    updateQuestion(question.id, {
                                      questionText: { ...question.questionText, ar: e.target.value },
                                    })
                                  }
                                  placeholder="ما هذه الزهرة؟"
                                  dir="rtl"
                                />
                              </div>
                            </div>

                            {/* Image Upload */}
                            <div>
                              <Label className="text-sm">{isRTL ? "صورة السؤال" : "Question Image"}</Label>
                              <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                {question.image ? (
                                  <div className="relative">
                                    <img
                                      src={getImageSrc(question.image) || "/placeholder.svg"}
                                      alt=""
                                      className="w-24 h-24 rounded-lg object-cover"
                                    />
                                    <button
                                      onClick={() => updateQuestion(question.id, { image: "" })}
                                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                    <ImageIcon className="w-8 h-8 text-gray-300" />
                                  </div>
                                )}
                                <div>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    ref={(el) => {
                                      fileInputRefs.current[question.id] = el
                                    }}
                                    onChange={(e) => handleImageUpload(question.id, e)}
                                    className="hidden"
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fileInputRefs.current[question.id]?.click()}
                                  >
                                    <Upload className="w-4 h-4 mr-1" />
                                    {isRTL ? "رفع صورة" : "Upload Image"}
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/* Correct Answer */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm text-green-600">
                                  {isRTL ? "الإجابة الصحيحة (EN)" : "Correct Answer (EN)"}
                                </Label>
                                <Input
                                  value={question.correctAnswer.en}
                                  onChange={(e) =>
                                    updateQuestion(question.id, {
                                      correctAnswer: { ...question.correctAnswer, en: e.target.value },
                                    })
                                  }
                                  placeholder="Rose"
                                  className="border-green-300 focus:border-green-500"
                                />
                              </div>
                              <div>
                                <Label className="text-sm text-green-600">
                                  {isRTL ? "الإجابة الصحيحة (AR)" : "Correct Answer (AR)"}
                                </Label>
                                <Input
                                  value={question.correctAnswer.ar}
                                  onChange={(e) =>
                                    updateQuestion(question.id, {
                                      correctAnswer: { ...question.correctAnswer, ar: e.target.value },
                                    })
                                  }
                                  placeholder="وردة"
                                  dir="rtl"
                                  className="border-green-300 focus:border-green-500"
                                />
                              </div>
                            </div>

                            {/* Wrong Answers */}
                            <div>
                              <Label className="text-sm text-red-600 mb-2 block">
                                {isRTL ? "الإجابات الخاطئة" : "Wrong Answers"}
                              </Label>
                              <div className="space-y-3">
                                {question.wrongAnswers.map((wrong, wIndex) => (
                                  <div key={wIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                      value={wrong.en}
                                      onChange={(e) => {
                                        const newWrong = [...question.wrongAnswers]
                                        newWrong[wIndex] = { ...newWrong[wIndex], en: e.target.value }
                                        updateQuestion(question.id, { wrongAnswers: newWrong })
                                      }}
                                      placeholder={`Wrong answer ${wIndex + 1} (EN)`}
                                      className="border-red-200"
                                    />
                                    <Input
                                      value={wrong.ar}
                                      onChange={(e) => {
                                        const newWrong = [...question.wrongAnswers]
                                        newWrong[wIndex] = { ...newWrong[wIndex], ar: e.target.value }
                                        updateQuestion(question.id, { wrongAnswers: newWrong })
                                      }}
                                      placeholder={`إجابة خاطئة ${wIndex + 1}`}
                                      dir="rtl"
                                      className="border-red-200"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm text-center">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-sm md:text-base">
                {isRTL ? "اختر اختباراً للتعديل أو أنشئ اختباراً جديداً" : "Select a quiz to edit or create a new one"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
