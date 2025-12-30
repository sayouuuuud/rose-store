"use client"

import { useState, useEffect } from "react"
import { X, Flower2, CheckCircle, XCircle, Trophy } from "lucide-react"
import { useStore } from "@/lib/store-context"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function FlowerQuizPopup() {
  const { quizzes, addQuizResult } = useStore()
  const { locale } = useLanguage()
  const isRTL = locale === "ar"

  const activeQuiz = quizzes.find((q) => q.isActive)

  const [showBubble, setShowBubble] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [userAnswers, setUserAnswers] = useState<{ questionId: string; answer: string; correct: boolean }[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([])

  useEffect(() => {
    if (activeQuiz?.isActive && activeQuiz.questions.length > 0) {
      const timer = setTimeout(() => {
        setShowBubble(true)
        const hideTimer = setTimeout(() => {
          setShowBubble(false)
        }, 5000)
        return () => clearTimeout(hideTimer)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [activeQuiz])

  useEffect(() => {
    if (activeQuiz && activeQuiz.questions[currentQuestion]) {
      const q = activeQuiz.questions[currentQuestion]
      const correctAns = isRTL ? q.correctAnswer.ar : q.correctAnswer.en
      const wrongAns = q.wrongAnswers.map((w) => (isRTL ? w.ar : w.en)).filter((a) => a.trim() !== "")
      const allOptions = [correctAns, ...wrongAns].sort(() => Math.random() - 0.5)
      setShuffledOptions(allOptions)
    }
  }, [currentQuestion, activeQuiz, isRTL])

  if (!activeQuiz || !activeQuiz.isActive || activeQuiz.questions.length === 0) {
    return null
  }

  const currentQ = activeQuiz.questions[currentQuestion]
  const totalQuestions = activeQuiz.questions.length
  const correctAnswer = isRTL ? currentQ.correctAnswer.ar : currentQ.correctAnswer.en

  const handleOpenPopup = () => {
    setShowBubble(false)
    setIsPopupOpen(true)
  }

  const handleStartQuiz = () => {
    setQuizStarted(true)
  }

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return
    setSelectedAnswer(answer)
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentQ) return

    const isCorrect = selectedAnswer === correctAnswer
    const newAnswer = {
      questionId: currentQ.id,
      answer: selectedAnswer,
      correct: isCorrect,
    }

    setUserAnswers((prev) => [...prev, newAnswer])
    setShowResult(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      const finalAnswers = [...userAnswers]
      const score = finalAnswers.filter((a) => a.correct).length

      addQuizResult({
        quizId: activeQuiz.id,
        score,
        totalQuestions,
        userAnswers: finalAnswers,
      })

      setQuizCompleted(true)
    }
  }

  const handleClose = () => {
    setIsPopupOpen(false)
    setTimeout(() => {
      setQuizStarted(false)
      setCurrentQuestion(0)
      setSelectedAnswer(null)
      setShowResult(false)
      setUserAnswers([])
      setQuizCompleted(false)
    }, 300)
  }

  const getImageSrc = (src: string) => {
    if (!src) return ""
    if (src.startsWith("data:image")) return src
    if (src.startsWith("http")) return src
    if (src.startsWith("/")) return src
    return ""
  }

  const score = userAnswers.filter((a) => a.correct).length

  return (
    <>
      <div className={cn("fixed bottom-6 z-40", isRTL ? "left-6" : "right-6")}>
        {/* Bubble Message */}
        {showBubble && (
          <div
            onClick={handleOpenPopup}
            className={cn(
              "absolute bottom-16 mb-2 cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300",
              isRTL ? "left-0" : "right-0",
            )}
          >
            <div className="bg-white rounded-2xl shadow-lg p-4 max-w-[220px] border border-rose-100 relative">
              <p className="text-sm text-gray-700 font-medium" dir={isRTL ? "rtl" : "ltr"}>
                {isRTL ? "هل تريد اختبار معرفتك بالأزهار؟ 🌸" : "Want to test your flower knowledge? 🌸"}
              </p>
              <p className="text-xs text-gray-500 mt-1" dir={isRTL ? "rtl" : "ltr"}>
                {isRTL ? "اضغط هنا للبدء" : "Click here to start"}
              </p>
              <div
                className={cn(
                  "absolute -bottom-2 w-4 h-4 bg-white border-b border-r border-rose-100 transform rotate-45",
                  isRTL ? "left-6" : "right-6",
                )}
              />
            </div>
          </div>
        )}

        {/* Floating Circle Button */}
        <button
          onClick={handleOpenPopup}
          className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-white"
        >
          <Flower2 className="w-7 h-7" />
        </button>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className={cn(
              "bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300",
              isRTL && "font-arabic",
            )}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-4 text-white relative">
              <button
                onClick={handleClose}
                className={cn(
                  "absolute top-4 p-1 hover:bg-white/20 rounded-full transition-colors",
                  isRTL ? "left-4" : "right-4",
                )}
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Flower2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{isRTL ? activeQuiz.title.ar : activeQuiz.title.en}</h2>
                  <p className="text-white/80 text-sm">
                    {isRTL ? activeQuiz.description.ar : activeQuiz.description.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {!quizStarted && !quizCompleted && (
                <div className="text-center py-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Flower2 className="w-12 h-12 text-rose-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {isRTL ? activeQuiz.title.ar : activeQuiz.title.en}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {isRTL
                      ? `هذا الاختبار يحتوي على ${totalQuestions} أسئلة. هل أنت مستعد؟`
                      : `This quiz has ${totalQuestions} questions. Are you ready?`}
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={handleStartQuiz}
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-full py-6 text-lg"
                    >
                      {isRTL ? "ابدأ الاختبار" : "Start Quiz"}
                    </Button>
                    <Button
                      onClick={handleClose}
                      variant="outline"
                      className="w-full rounded-full py-6 text-lg border-gray-300 bg-transparent"
                    >
                      {isRTL ? "ليس الآن" : "Not Now"}
                    </Button>
                  </div>
                </div>
              )}

              {/* Quiz Questions */}
              {quizStarted && !quizCompleted && (
                <>
                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>
                        {isRTL
                          ? `السؤال ${currentQuestion + 1} من ${totalQuestions}`
                          : `Question ${currentQuestion + 1} of ${totalQuestions}`}
                      </span>
                      <span>{isRTL ? `النتيجة: ${score}` : `Score: ${score}`}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-500 transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question Image (if exists) */}
                  {currentQ?.image && (
                    <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-100">
                      <img
                        src={getImageSrc(currentQ.image) || "/placeholder.svg"}
                        alt="Question"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <p className="text-center text-gray-700 font-medium mb-4 text-lg">
                    {isRTL ? currentQ.questionText.ar : currentQ.questionText.en}
                  </p>

                  {/* Options with translation */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {shuffledOptions.map((option, index) => {
                      const isSelected = selectedAnswer === option
                      const isCorrect = option === correctAnswer
                      const showCorrectness = showResult

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(option)}
                          disabled={showResult}
                          className={cn(
                            "p-3 rounded-xl border-2 text-sm font-medium transition-all",
                            !showCorrectness && isSelected && "border-rose-500 bg-rose-50",
                            !showCorrectness && !isSelected && "border-gray-200 hover:border-rose-300",
                            showCorrectness && isCorrect && "border-green-500 bg-green-50 text-green-700",
                            showCorrectness && isSelected && !isCorrect && "border-red-500 bg-red-50 text-red-700",
                            showCorrectness && !isSelected && !isCorrect && "border-gray-200 opacity-50",
                          )}
                        >
                          <span className="flex items-center justify-center gap-2">
                            {showCorrectness && isCorrect && <CheckCircle className="w-4 h-4 text-green-500" />}
                            {showCorrectness && isSelected && !isCorrect && (
                              <XCircle className="w-4 h-4 text-red-500" />
                            )}
                            {option}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Actions */}
                  {!showResult ? (
                    <Button
                      onClick={handleSubmitAnswer}
                      disabled={!selectedAnswer}
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-full"
                    >
                      {isRTL ? "تأكيد الإجابة" : "Submit Answer"}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextQuestion}
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-full"
                    >
                      {currentQuestion < totalQuestions - 1
                        ? isRTL
                          ? "السؤال التالي"
                          : "Next Question"
                        : isRTL
                          ? "عرض النتيجة"
                          : "See Results"}
                    </Button>
                  )}
                </>
              )}

              {/* Quiz Completed */}
              {quizCompleted && (
                <div className="text-center py-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{isRTL ? "أحسنت!" : "Well Done!"}</h3>
                  <p className="text-gray-600 mb-4">
                    {isRTL
                      ? `لقد حصلت على ${score} من ${totalQuestions} إجابات صحيحة`
                      : `You got ${score} out of ${totalQuestions} correct!`}
                  </p>
                  <div className="flex gap-2 justify-center mb-4">
                    {userAnswers.map((answer, index) => (
                      <div
                        key={index}
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold",
                          answer.correct ? "bg-green-500" : "bg-red-500",
                        )}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    {isRTL ? "شكراً لمشاركتك في اختبار الأزهار!" : "Thank you for taking our flower quiz!"}
                  </p>
                  <Button onClick={handleClose} className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8">
                    {isRTL ? "إغلاق" : "Close"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
