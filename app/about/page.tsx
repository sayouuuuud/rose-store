"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BottomNav } from "@/components/bottom-nav"
import { useLanguage } from "@/lib/language-context"
import { useStore } from "@/lib/store-context"
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, MessageCircle, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AboutPage() {
  const { t, isRTL } = useLanguage()
  const { storeSettings, contentSettings, addContactMessage } = useStore()
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mapKey, setMapKey] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setMapKey((prev) => prev + 1)
    }
  }, [storeSettings.mapLat, storeSettings.mapLng, mounted])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    addContactMessage({
      name: formData.name,
      contact: formData.contact,
      message: formData.message,
    })

    setIsSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: "", contact: "", message: "" })

    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const whatsappMessage = storeSettings.customOrderTemplate.replace("{storeName}", storeSettings.storeName)
  const whatsappNumber = storeSettings.whatsappNumber.replace(/[^0-9]/g, "")
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  const mapLat = mounted ? storeSettings.mapLat : 31.2001
  const mapLng = mounted ? storeSettings.mapLng : 29.9187

  return (
    <main className="min-h-screen bg-rose-50/30" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] mx-4 mt-4 rounded-3xl overflow-hidden">
        <Image
          src={contentSettings.aboutImage || "/placeholder.svg?height=400&width=800&query=elegant flower shop interior"}
          alt="Our boutique"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-rose-900/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">{isRTL ? "من نحن" : "About Us"}</h1>
          <p className="text-white/90 text-lg max-w-xl">
            {isRTL ? "تعرف على قصتنا ورحلتنا في عالم الزهور" : "Discover our story and journey in the world of flowers"}
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="font-serif text-3xl text-rose-900 mb-6 text-center">{t.ourStory}</h2>
            <div className="space-y-4 text-rose-700/80 leading-relaxed">
              <p>{isRTL ? contentSettings.storyText.ar : contentSettings.storyText.en}</p>
              <p>{isRTL ? contentSettings.storyText2.ar : contentSettings.storyText2.en}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-rose-900 mb-8 text-center">
            {isRTL ? "ما نؤمن به" : "What We Believe"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💝</span>
              </div>
              <h3 className="font-semibold text-rose-900 mb-2">
                {isRTL ? "مصنوع يدوياً بحب" : "Handcrafted with Love"}
              </h3>
              <p className="text-rose-600/70 text-sm">
                {isRTL
                  ? "كل ترتيب يُصنع يدوياً بعناية، مما يضمن وضع كل بتلة بشكل مثالي."
                  : "Every arrangement is thoughtfully created by hand, ensuring each petal is perfectly placed."}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌿</span>
              </div>
              <h3 className="font-semibold text-rose-900 mb-2">{isRTL ? "مصادر مستدامة" : "Sustainably Sourced"}</h3>
              <p className="text-rose-600/70 text-sm">
                {isRTL
                  ? "نتشارك مع مزارعين محليين ومزارع صديقة للبيئة لنقدم لك أطازج الزهور."
                  : "We partner with local growers and eco-conscious farms to bring you the freshest blooms."}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="font-semibold text-rose-900 mb-2">{isRTL ? "لمسة شخصية" : "Personal Touch"}</h3>
              <p className="text-rose-600/70 text-sm">
                {isRTL
                  ? "من الترتيبات المخصصة إلى الملاحظات المكتوبة بخط اليد، نضيف لمسات شخصية."
                  : "From custom arrangements to handwritten notes, we add personal touches."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-rose-900 mb-4 text-center">{t.contactUs}</h2>
          <p className="text-rose-600/70 text-center mb-12 max-w-md mx-auto">
            {isRTL
              ? "نحب أن نسمع منك! تواصل معنا عبر النموذج أدناه أو عبر واتساب"
              : "We'd love to hear from you! Reach out via the form below or WhatsApp"}
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-rose-50/50 rounded-3xl p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-rose-800 mb-2">{t.yourName}</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-white border-rose-200 focus:border-rose-400 focus:ring-rose-400 rounded-xl h-12"
                    placeholder={isRTL ? "أدخل اسمك" : "Enter your name"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-rose-800 mb-2">{t.phoneOrEmail}</label>
                  <Input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                    className="bg-white border-rose-200 focus:border-rose-400 focus:ring-rose-400 rounded-xl h-12"
                    placeholder={isRTL ? "البريد الإلكتروني أو رقم الهاتف" : "Email or phone number"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-rose-800 mb-2">{t.message}</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="bg-white border-rose-200 focus:border-rose-400 focus:ring-rose-400 rounded-xl resize-none"
                    placeholder={isRTL ? "اكتب رسالتك هنا..." : "Write your message here..."}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-full h-12 gap-2"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      {t.messageSent}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {isSubmitting ? t.loading : t.sendMessage}
                    </>
                  )}
                </Button>
              </form>

              {/* WhatsApp Button */}
              <div className="mt-6 text-center">
                <p className="text-rose-600/70 text-sm mb-3">
                  {isRTL ? "أو تواصل معنا مباشرة" : "Or contact us directly"}
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-full transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t.contactViaWhatsApp}
                </a>
              </div>
            </div>

            {/* Location Info */}
            <div className="space-y-6">
              {/* Map - Using OpenStreetMap with proper coordinates */}
              <div className="relative h-[250px] rounded-2xl overflow-hidden">
                <iframe
                  key={mapKey}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapLng - 0.01},${mapLat - 0.01},${mapLng + 0.01},${mapLat + 0.01}&layer=mapnik&marker=${mapLat},${mapLng}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Store Location"
                />
              </div>

              {/* Contact Details - Using mounted check for proper values */}
              <div className="bg-rose-50/50 rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-rose-900">
                      {mounted ? storeSettings.storeName : "Whispering Petals"}
                    </p>
                    <p className="text-rose-600/70 text-sm">{mounted ? storeSettings.address : "Alexandria, Egypt"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-rose-900">{isRTL ? "ساعات العمل" : "Business Hours"}</p>
                    <p className="text-rose-600/70 text-sm">{mounted ? storeSettings.businessHours : "9 AM - 9 PM"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-rose-600" />
                  </div>
                  <p className="font-semibold text-rose-900">{mounted ? storeSettings.phone : "+20 123 456 7890"}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-rose-600" />
                  </div>
                  <p className="font-semibold text-rose-900">{mounted ? storeSettings.email : "hello@store.com"}</p>
                </div>

                <div className="flex gap-3 pt-2">
                  {mounted && storeSettings.instagram && (
                    <a
                      href={storeSettings.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center hover:bg-rose-200 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5 text-rose-600" />
                    </a>
                  )}
                  {mounted && storeSettings.facebook && (
                    <a
                      href={storeSettings.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center hover:bg-rose-200 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5 text-rose-600" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </main>
  )
}
