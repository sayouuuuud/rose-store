"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useRef, useCallback } from "react"

// Types
export interface ContactMessage {
  id: string
  name: string
  contact: string
  message: string
  date: string
  status: "new" | "read" | "replied"
}

export interface StoreSettings {
  storeName: string
  logo?: string
  whatsappNumber: string
  productOrderTemplate: string
  customOrderTemplate: string
  address: string
  businessHours: string
  phone: string
  email: string
  instagram: string
  facebook: string
  twitter: string
  mapLocation: string
  mapLat: number
  mapLng: number
}

export interface FooterSettings {
  description: { en: string; ar: string }
  quickLinks: { label: { en: string; ar: string }; href: string }[]
  showSocialLinks: boolean
}

export interface AdminSettings {
  name: string
  email: string
  password: string
}

export interface SectionNames {
  hero: { en: string; ar: string }
  products: { en: string; ar: string }
  gallery: { en: string; ar: string }
  reviews: { en: string; ar: string }
  ourStory: { en: string; ar: string }
}

export interface ContentSettings {
  heroTitle: { en: string; ar: string }
  heroSubtitle: { en: string; ar: string }
  heroImage: string
  storyText: { en: string; ar: string }
  storyText2: { en: string; ar: string }
  aboutImage: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
}

export interface Review {
  id: string
  name: string
  rating: number
  text: { en: string; ar: string }
  avatar: string
}

export interface Product {
  id: number
  name: { en: string; ar: string }
  price: number
  description: { en: string; ar: string }
  images: string[]
  colors: string[]
  availability: boolean
  category: string
}

export interface Notification {
  id: string
  message: string
  time: string
  read: boolean
  sourceId: string
  type: "message" | "quiz"
}

export interface Category {
  id: string
  name: { en: string; ar: string }
  description?: { en: string; ar: string }
}

export interface QuizQuestion {
  id: string
  image: string
  questionText: { en: string; ar: string }
  correctAnswer: { en: string; ar: string }
  wrongAnswers: { en: string; ar: string }[]
}

export interface Quiz {
  id: string
  title: { en: string; ar: string }
  description: { en: string; ar: string }
  questions: QuizQuestion[]
  isActive: boolean
  createdAt: string
}

export interface QuizResult {
  id: string
  quizId: string
  date: string
  score: number
  totalQuestions: number
  userAnswers: { questionId: string; answer: string; correct: boolean }[]
}

export interface AdminTranslations {
  sidebar: {
    dashboard: { en: string; ar: string }
    products: { en: string; ar: string }
    categories: { en: string; ar: string }
    gallery: { en: string; ar: string }
    reviews: { en: string; ar: string }
    contacts: { en: string; ar: string }
    content: { en: string; ar: string }
    translations: { en: string; ar: string }
    adminTranslations: { en: string; ar: string }
    footer: { en: string; ar: string }
    settings: { en: string; ar: string }
    quiz: { en: string; ar: string }
  }
  common: {
    save: { en: string; ar: string }
    cancel: { en: string; ar: string }
    delete: { en: string; ar: string }
    edit: { en: string; ar: string }
    add: { en: string; ar: string }
    search: { en: string; ar: string }
    actions: { en: string; ar: string }
    status: { en: string; ar: string }
    name: { en: string; ar: string }
    description: { en: string; ar: string }
    price: { en: string; ar: string }
    category: { en: string; ar: string }
    availability: { en: string; ar: string }
    inStock: { en: string; ar: string }
    outOfStock: { en: string; ar: string }
  }
  dashboard: {
    title: { en: string; ar: string }
    totalProducts: { en: string; ar: string }
    totalReviews: { en: string; ar: string }
    totalMessages: { en: string; ar: string }
    recentMessages: { en: string; ar: string }
  }
  products: {
    title: { en: string; ar: string }
    addProduct: { en: string; ar: string }
    editProduct: { en: string; ar: string }
    productName: { en: string; ar: string }
    productDescription: { en: string; ar: string }
    productPrice: { en: string; ar: string }
    productImages: { en: string; ar: string }
    productColors: { en: string; ar: string }
  }
  categories: {
    title: { en: string; ar: string }
    addCategory: { en: string; ar: string }
    editCategory: { en: string; ar: string }
    categoryName: { en: string; ar: string }
    categoryDescription: { en: string; ar: string }
    noCategories: { en: string; ar: string }
  }
  settings: {
    title: { en: string; ar: string }
    storeInfo: { en: string; ar: string }
    storeName: { en: string; ar: string }
    contactInfo: { en: string; ar: string }
    socialMedia: { en: string; ar: string }
    adminCredentials: { en: string; ar: string }
  }
  notifications: {
    title: { en: string; ar: string }
    markAllRead: { en: string; ar: string }
    noNotifications: { en: string; ar: string }
    viewAllMessages: { en: string; ar: string }
  }
  header: {
    logout: { en: string; ar: string }
    profile: { en: string; ar: string }
    settings: { en: string; ar: string }
  }
}

interface StoreContextType {
  contactMessages: ContactMessage[]
  addContactMessage: (message: Omit<ContactMessage, "id" | "date" | "status">) => void
  updateMessageStatus: (id: string, status: ContactMessage["status"]) => void
  deleteMessage: (id: string) => void
  storeSettings: StoreSettings
  updateStoreSettings: (settings: Partial<StoreSettings>) => void
  footerSettings: FooterSettings
  updateFooterSettings: (settings: Partial<FooterSettings>) => void
  adminSettings: AdminSettings
  updateAdminSettings: (settings: Partial<AdminSettings>) => void
  sectionNames: SectionNames
  updateSectionNames: (names: Partial<SectionNames>) => void
  contentSettings: ContentSettings
  updateContentSettings: (settings: Partial<ContentSettings>) => void
  galleryImages: GalleryImage[]
  addGalleryImage: (image: Omit<GalleryImage, "id">) => void
  removeGalleryImage: (id: string) => void
  updateGalleryImage: (id: string, image: Partial<GalleryImage>) => void
  reviews: Review[]
  addReview: (review: Omit<Review, "id">) => void
  removeReview: (id: string) => void
  updateReview: (id: string, review: Partial<Review>) => void
  products: Product[]
  addProduct: (product: Omit<Product, "id">) => void
  removeProduct: (id: number) => void
  updateProduct: (id: number, product: Partial<Product>) => void
  categories: Category[]
  addCategory: (category: Omit<Category, "id">) => void
  updateCategory: (id: string, category: Partial<Category>) => void
  removeCategory: (id: string) => void
  adminTranslations: AdminTranslations
  updateAdminTranslations: (translations: Partial<AdminTranslations>) => void
  quizzes: Quiz[]
  activeQuiz: Quiz | null
  quizResults: QuizResult[]
  addQuiz: (quiz: Omit<Quiz, "id">) => void
  updateQuiz: (id: string, quiz: Partial<Quiz>) => void
  deleteQuiz: (id: string) => void
  setActiveQuizById: (id: string) => void
  addQuizResult: (result: Omit<QuizResult, "id">) => void
  clearQuizResults: () => void
  notifications: Notification[]
  markNotificationAsRead: (id: string) => void
  markAllNotificationsAsRead: () => void
  clearAllNotifications: () => void
  playAdminNotificationSound: () => void
  setIsAdminPage: (isAdmin: boolean) => void
}

const defaultStoreSettings: StoreSettings = {
  storeName: "Whispering Petals",
  logo: "",
  whatsappNumber: "+201234567890",
  productOrderTemplate: `Hello {storeName}!\n\nI would like to order:\nProduct: {productName}\nProduct ID: {productId}\nColor: {color}\nQuantity: {quantity}\nTotal: {total}\n\nThank you!`,
  customOrderTemplate: `Hello {storeName}!\n\nI would like to place a custom order.\n\nPlease contact me to discuss my requirements.\n\nThank you!`,
  address: "Alexandria, Egypt",
  businessHours: "Daily: 10:00 AM - 6:00 PM",
  phone: "+20 123 456 7890",
  email: "hello@whisperingpetals.com",
  instagram: "",
  facebook: "",
  twitter: "",
  mapLocation: "Alexandria, Egypt",
  mapLat: 31.2001,
  mapLng: 29.9187,
}

const defaultFooterSettings: FooterSettings = {
  description: {
    en: "Handcrafted with passion, our blooms whisper tales of romance and elegance.",
    ar: "صُنعت بشغف، زهورنا تهمس بحكايات الرومانسية والأناقة.",
  },
  quickLinks: [
    { label: { en: "Home", ar: "الرئيسية" }, href: "/" },
    { label: { en: "Shop", ar: "المتجر" }, href: "/shop" },
    { label: { en: "About", ar: "من نحن" }, href: "/about" },
  ],
  showSocialLinks: true,
}

const defaultAdminSettings: AdminSettings = {
  name: "Admin",
  email: "admin@whisperingpetals.com",
  password: "admin123",
}

const defaultSectionNames: SectionNames = {
  hero: { en: "Welcome", ar: "مرحباً" },
  products: { en: "Products", ar: "المنتجات" },
  gallery: { en: "Gallery", ar: "معرض الصور" },
  reviews: { en: "Customer Reviews", ar: "آراء العملاء" },
  ourStory: { en: "Our Story", ar: "قصتنا" },
}

const defaultContentSettings: ContentSettings = {
  heroTitle: { en: "Whispering Petals of Affection", ar: "همسات بتلات المحبة" },
  heroSubtitle: {
    en: "Discover our curated collection for moments of love and grace.",
    ar: "اكتشف مجموعتنا المختارة للحظات الحب والرقي.",
  },
  heroImage: "/beautiful-pink-roses-flower-arrangement-elegant.jpg",
  storyText: {
    en: "Founded in 2015, Whispering Petals began as a small dream nurtured by a passion for floristry and a love for creating meaningful connections through flowers.",
    ar: "تأسست همسات البتلات في عام ٢٠١٥، بدأت كحلم صغير نما بشغف لفن الزهور وحب خلق روابط ذات معنى من خلال الورود.",
  },
  storyText2: {
    en: "From weekend farmers market arrangements to a beloved boutique, we continue to craft beauty with the same passion and attention to detail.",
    ar: "من ترتيبات أسواق المزارعين في نهاية الأسبوع إلى متجر محبوب، نواصل صياغة الجمال بنفس الشغف والاهتمام بالتفاصيل.",
  },
  aboutImage: "/flower-shop-storefront-elegant-boutique.jpg",
}

const defaultGalleryImages: GalleryImage[] = [
  { id: "1", src: "/vibrant-mixed-flower-bouquet-colorful-arrangement.jpg", alt: "Vibrant mixed flower bouquet" },
  { id: "2", src: "/elegant-roses-arrangement-workspace-office.jpg", alt: "Roses in workspace" },
  { id: "3", src: "/delicate-pink-peonies-soft-petals-romantic.jpg", alt: "Delicate pink peonies" },
  { id: "4", src: "/colorful-spring-flower-arrangement-tulips-daisies.jpg", alt: "Colorful spring arrangement" },
  { id: "5", src: "/elegant-white-roses-bouquet-wedding-style.jpg", alt: "Elegant white roses" },
  { id: "6", src: "/lavender-purple-flower-arrangement-relaxing.jpg", alt: "Lavender arrangement" },
  { id: "7", src: "/sunflower-bright-yellow-summer-bouquet.jpg", alt: "Sunflower bouquet" },
  { id: "8", src: "/red-roses-romantic-love-bouquet-elegant.jpg", alt: "Red roses romantic" },
]

const defaultReviews: Review[] = [
  {
    id: "1",
    name: "Sarah M.",
    rating: 5,
    text: {
      en: "Absolutely stunning arrangements! The flowers were fresh and lasted for weeks.",
      ar: "ترتيبات مذهلة! كانت الزهور طازجة واستمرت لأسابيع.",
    },
    avatar: "/professional-woman-avatar.png",
  },
  {
    id: "2",
    name: "Ahmed K.",
    rating: 5,
    text: { en: "Perfect for my anniversary. My wife loved them!", ar: "مثالية لذكرى زواجي. زوجتي أحبتها!" },
    avatar: "/professional-man-avatar.png",
  },
  {
    id: "3",
    name: "Fatima H.",
    rating: 5,
    text: {
      en: "The most beautiful flowers I've ever received. Excellent service!",
      ar: "أجمل زهور تلقيتها على الإطلاق. خدمة ممتازة!",
    },
    avatar: "/woman-hijab-avatar-professional.jpg",
  },
]

const defaultCategories: Category[] = [
  {
    id: "1",
    name: { en: "Bouquets", ar: "باقات" },
    description: { en: "Beautiful flower bouquets", ar: "باقات زهور جميلة" },
  },
  {
    id: "2",
    name: { en: "Box Arrangements", ar: "ترتيبات صندوق" },
    description: { en: "Elegant box arrangements", ar: "ترتيبات صندوق أنيقة" },
  },
  {
    id: "3",
    name: { en: "Arrangements", ar: "ترتيبات" },
    description: { en: "Custom arrangements", ar: "ترتيبات مخصصة" },
  },
  { id: "4", name: { en: "Baskets", ar: "سلال" }, description: { en: "Flower baskets", ar: "سلال زهور" } },
  { id: "5", name: { en: "Premium", ar: "فاخر" }, description: { en: "Premium selections", ar: "اختيارات فاخرة" } },
]

const defaultAdminTranslations: AdminTranslations = {
  sidebar: {
    dashboard: { en: "Dashboard", ar: "لوحة التحكم" },
    products: { en: "Products", ar: "المنتجات" },
    categories: { en: "Categories", ar: "الفئات" },
    gallery: { en: "Gallery", ar: "المعرض" },
    reviews: { en: "Reviews", ar: "التقييمات" },
    contacts: { en: "Contact Messages", ar: "رسائل التواصل" },
    content: { en: "Content", ar: "المحتوى" },
    translations: { en: "Translations", ar: "الترجمات" },
    adminTranslations: { en: "Admin Translations", ar: "ترجمات الإدارة" },
    footer: { en: "Footer", ar: "التذييل" },
    settings: { en: "Settings", ar: "الإعدادات" },
    quiz: { en: "Flower Quiz", ar: "اختبار الأزهار" },
  },
  common: {
    save: { en: "Save", ar: "حفظ" },
    cancel: { en: "Cancel", ar: "إلغاء" },
    delete: { en: "Delete", ar: "حذف" },
    edit: { en: "Edit", ar: "تعديل" },
    add: { en: "Add", ar: "إضافة" },
    search: { en: "Search", ar: "بحث" },
    actions: { en: "Actions", ar: "إجراءات" },
    status: { en: "Status", ar: "الحالة" },
    name: { en: "Name", ar: "الاسم" },
    description: { en: "Description", ar: "الوصف" },
    price: { en: "Price", ar: "السعر" },
    category: { en: "Category", ar: "الفئة" },
    availability: { en: "Availability", ar: "التوفر" },
    inStock: { en: "In Stock", ar: "متوفر" },
    outOfStock: { en: "Out of Stock", ar: "غير متوفر" },
  },
  dashboard: {
    title: { en: "Dashboard", ar: "لوحة التحكم" },
    totalProducts: { en: "Total Products", ar: "إجمالي المنتجات" },
    totalReviews: { en: "Total Reviews", ar: "إجمالي التقييمات" },
    totalMessages: { en: "Total Messages", ar: "إجمالي الرسائل" },
    recentMessages: { en: "Recent Messages", ar: "الرسائل الأخيرة" },
  },
  products: {
    title: { en: "Products", ar: "المنتجات" },
    addProduct: { en: "Add Product", ar: "إضافة منتج" },
    editProduct: { en: "Edit Product", ar: "تعديل منتج" },
    productName: { en: "Product Name", ar: "اسم المنتج" },
    productDescription: { en: "Product Description", ar: "وصف المنتج" },
    productPrice: { en: "Product Price", ar: "سعر المنتج" },
    productImages: { en: "Product Images", ar: "صور المنتج" },
    productColors: { en: "Product Colors", ar: "ألوان المنتج" },
  },
  categories: {
    title: { en: "Categories", ar: "الفئات" },
    addCategory: { en: "Add Category", ar: "إضافة فئة" },
    editCategory: { en: "Edit Category", ar: "تعديل فئة" },
    categoryName: { en: "Category Name", ar: "اسم الفئة" },
    categoryDescription: { en: "Category Description", ar: "وصف الفئة" },
    noCategories: { en: "No categories found", ar: "لا توجد فئات" },
  },
  settings: {
    title: { en: "Settings", ar: "الإعدادات" },
    storeInfo: { en: "Store Information", ar: "معلومات المتجر" },
    storeName: { en: "Store Name", ar: "اسم المتجر" },
    contactInfo: { en: "Contact Information", ar: "معلومات التواصل" },
    socialMedia: { en: "Social Media", ar: "وسائل التواصل الاجتماعي" },
    adminCredentials: { en: "Admin Credentials", ar: "بيانات اعتماد المسؤول" },
  },
  notifications: {
    title: { en: "Notifications", ar: "الإشعارات" },
    markAllRead: { en: "Mark all read", ar: "تحديد الكل كمقروء" },
    noNotifications: { en: "No new notifications", ar: "لا توجد إشعارات جديدة" },
    viewAllMessages: { en: "View all messages", ar: "عرض كل الرسائل" },
  },
  header: {
    logout: { en: "Logout", ar: "تسجيل الخروج" },
    profile: { en: "Profile", ar: "الملف الشخصي" },
    settings: { en: "Settings", ar: "الإعدادات" },
  },
}

const defaultProducts: Product[] = [
  {
    id: 1,
    name: { en: "Blush Harmony Bouquet", ar: "باقة الانسجام الوردية" },
    price: 95,
    description: {
      en: "Exquisite harmony bouquet with blush, autumn tones and hints of romance and elegance.",
      ar: "باقة انسجام رائعة بألوان وردية وخريفية ولمسات من الرومانسية والأناقة.",
    },
    images: ["/pink-roses-bouquet-elegant-blush-harmony.jpg"],
    colors: ["Baby Pink", "Blush Rose", "Soft Coral"],
    availability: true,
    category: "Bouquets",
  },
  {
    id: 2,
    name: { en: "Eternal Grace Box", ar: "صندوق الرقي الأبدي" },
    price: 120,
    description: {
      en: "A stunning arrangement of premium roses in an elegant box.",
      ar: "ترتيب مذهل من الورود الفاخرة في صندوق أنيق.",
    },
    images: ["/luxury-flower-box-roses-elegant-gift.jpg"],
    colors: ["Classic Red", "Soft Pink", "Pure White"],
    availability: true,
    category: "Box Arrangements",
  },
  {
    id: 3,
    name: { en: "Velvet Romance Arrangement", ar: "ترتيب الرومانسية المخملية" },
    price: 110,
    description: {
      en: "Velvet-textured roses paired with delicate greenery.",
      ar: "ورود بملمس مخملي مع خضرة رقيقة.",
    },
    images: ["/velvet-red-roses-arrangement-romantic.jpg"],
    colors: ["Deep Red", "Burgundy", "Rose Gold"],
    availability: true,
    category: "Arrangements",
  },
  {
    id: 4,
    name: { en: "Garden Dream Basket", ar: "سلة أحلام الحديقة" },
    price: 85,
    description: {
      en: "A whimsical basket filled with garden-fresh blooms.",
      ar: "سلة خيالية مليئة بالأزهار الطازجة من الحديقة.",
    },
    images: ["/garden-flower-basket-arrangement-colorful.jpg"],
    colors: ["Mixed Pastels", "Lavender Dreams", "Sunny Yellow"],
    availability: true,
    category: "Baskets",
  },
  {
    id: 5,
    name: { en: "Peony Paradise", ar: "جنة الفاوانيا" },
    price: 145,
    description: {
      en: "Luxurious peonies in full bloom.",
      ar: "فاوانيا فاخرة في تفتح كامل.",
    },
    images: ["/peony-flower-arrangement-luxury-pink.jpg"],
    colors: ["Blush Pink", "Coral Charm", "White Cloud"],
    availability: true,
    category: "Premium",
  },
  {
    id: 6,
    name: { en: "Sunset Serenade", ar: "سيريناد الغروب" },
    price: 75,
    description: {
      en: "Warm sunset tones dance through this enchanting arrangement.",
      ar: "ألوان غروب دافئة ترقص عبر هذا الترتيب الساحر.",
    },
    images: ["/sunset-colored-flower-arrangement-orange-coral.jpg"],
    colors: ["Sunset Orange", "Coral Pink", "Golden Yellow"],
    availability: true,
    category: "Bouquets",
  },
]

const defaultQuizzes: Quiz[] = [
  {
    id: "quiz-1",
    title: { en: "Flower Knowledge Quiz", ar: "اختبار معرفة الأزهار" },
    description: { en: "Test your knowledge about beautiful flowers!", ar: "اختبر معرفتك بالأزهار الجميلة!" },
    isActive: true,
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: "q1",
        image: "/beautiful-red-rose.png",
        questionText: { en: "What flower is this?", ar: "ما هذه الزهرة؟" },
        correctAnswer: { en: "Rose", ar: "وردة" },
        wrongAnswers: [
          { en: "Tulip", ar: "توليب" },
          { en: "Lily", ar: "زنبق" },
          { en: "Daisy", ar: "أقحوان" },
        ],
      },
      {
        id: "q2",
        image: "/beautiful-pink-peony-flower.jpg",
        questionText: { en: "Can you identify this bloom?", ar: "هل يمكنك تحديد هذه الزهرة؟" },
        correctAnswer: { en: "Peony", ar: "فاوانيا" },
        wrongAnswers: [
          { en: "Carnation", ar: "قرنفل" },
          { en: "Hydrangea", ar: "هيدرانجيا" },
          { en: "Rose", ar: "وردة" },
        ],
      },
      {
        id: "q3",
        image: "/beautiful-white-lily-flower.jpg",
        questionText: { en: "What is this elegant flower?", ar: "ما هذه الزهرة الأنيقة؟" },
        correctAnswer: { en: "Lily", ar: "زنبق" },
        wrongAnswers: [
          { en: "Orchid", ar: "أوركيد" },
          { en: "Jasmine", ar: "ياسمين" },
          { en: "Magnolia", ar: "ماغنوليا" },
        ],
      },
      {
        id: "q4",
        image: "/beautiful-yellow-sunflower.jpg",
        questionText: { en: "Name this sunny flower!", ar: "ما اسم هذه الزهرة المشمسة؟" },
        correctAnswer: { en: "Sunflower", ar: "عباد الشمس" },
        wrongAnswers: [
          { en: "Marigold", ar: "قطيفة" },
          { en: "Daffodil", ar: "نرجس" },
          { en: "Dandelion", ar: "هندباء" },
        ],
      },
      {
        id: "q5",
        image: "/beautiful-purple-lavender-flowers.jpg",
        questionText: { en: "What fragrant flower is this?", ar: "ما هذه الزهرة العطرة؟" },
        correctAnswer: { en: "Lavender", ar: "لافندر" },
        wrongAnswers: [
          { en: "Violet", ar: "بنفسج" },
          { en: "Iris", ar: "سوسن" },
          { en: "Lilac", ar: "ليلك" },
        ],
      },
    ],
  },
]

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([])
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(defaultStoreSettings)
  const [footerSettings, setFooterSettings] = useState<FooterSettings>(defaultFooterSettings)
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(defaultAdminSettings)
  const [sectionNames, setSectionNames] = useState<SectionNames>(defaultSectionNames)
  const [contentSettings, setContentSettings] = useState<ContentSettings>(defaultContentSettings)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(defaultGalleryImages)
  const [reviews, setReviews] = useState<Review[]>([])
  const [products, setProducts] = useState<Product[]>(defaultProducts)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [adminTranslations, setAdminTranslations] = useState<AdminTranslations>({})
  const [quizzes, setQuizzes] = useState<Quiz[]>(defaultQuizzes)
  const [activeQuiz, setActiveQuizState] = useState<Quiz | null>(defaultQuizzes[0] || null)
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [mounted, setMounted] = useState(false)

  const prevMessageCountRef = useRef(0)
  const prevQuizResultCountRef = useRef(0)
  const initialLoadRef = useRef(true)

  const isAdminPageRef = useRef(false)

  const playNotificationSound = useCallback(() => {
    if (!isAdminPageRef.current) return

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 800
      oscillator.type = "sine"
      gainNode.gain.value = 0.3

      oscillator.start()
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (e) {
      // Ignore errors
    }
  }, [])

  const setIsAdminPage = useCallback((isAdmin: boolean) => {
    isAdminPageRef.current = isAdmin
  }, [])

  const playAdminNotificationSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 800
      oscillator.type = "sine"
      gainNode.gain.value = 0.3

      oscillator.start()
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (e) {
      // Ignore errors
    }
  }, [])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
    localStorage.setItem("notifications", JSON.stringify([]))
  }, [])

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true)
    try {
      const savedMessages = localStorage.getItem("contactMessages")
      if (savedMessages) setContactMessages(JSON.parse(savedMessages))

      const savedStoreSettings = localStorage.getItem("storeSettings")
      if (savedStoreSettings) setStoreSettings({ ...defaultStoreSettings, ...JSON.parse(savedStoreSettings) })

      const savedFooterSettings = localStorage.getItem("footerSettings")
      if (savedFooterSettings) setFooterSettings({ ...defaultFooterSettings, ...JSON.parse(savedFooterSettings) })

      const savedAdminSettings = localStorage.getItem("adminSettings")
      if (savedAdminSettings) setAdminSettings({ ...defaultAdminSettings, ...JSON.parse(savedAdminSettings) })

      const savedSectionNames = localStorage.getItem("sectionNames")
      if (savedSectionNames) setSectionNames({ ...defaultSectionNames, ...JSON.parse(savedSectionNames) })

      const savedContentSettings = localStorage.getItem("contentSettings")
      if (savedContentSettings) setContentSettings({ ...defaultContentSettings, ...JSON.parse(savedContentSettings) })

      const savedGalleryImages = localStorage.getItem("galleryImages")
      if (savedGalleryImages) {
        const parsed = JSON.parse(savedGalleryImages)
        if (parsed.length > 0) {
          setGalleryImages(parsed)
        }
      }

      const savedReviews = localStorage.getItem("reviews")
      if (savedReviews) setReviews(JSON.parse(savedReviews))

      const savedProducts = localStorage.getItem("products")
      if (savedProducts) setProducts(JSON.parse(savedProducts))

      const savedCategories = localStorage.getItem("categories")
      if (savedCategories) setCategories(JSON.parse(savedCategories))

      const savedAdminTranslations = localStorage.getItem("adminTranslations")
      if (savedAdminTranslations) {
        const parsed = JSON.parse(savedAdminTranslations)
        setAdminTranslations({
          ...defaultAdminTranslations,
          ...parsed,
          sidebar: { ...defaultAdminTranslations.sidebar, ...parsed.sidebar },
        })
      }

      const savedQuizzes = localStorage.getItem("quizzes")
      if (savedQuizzes) {
        const parsedQuizzes = JSON.parse(savedQuizzes)
        setQuizzes(parsedQuizzes)
        const active = parsedQuizzes.find((q: Quiz) => q.isActive)
        if (active) setActiveQuizState(active)
      } else {
        localStorage.setItem("quizzes", JSON.stringify(defaultQuizzes))
        setActiveQuizState(defaultQuizzes[0] || null)
      }

      const savedQuizResults = localStorage.getItem("quizResults")
      if (savedQuizResults) setQuizResults(JSON.parse(savedQuizResults))

      const savedNotifications = localStorage.getItem("notifications")
      if (savedNotifications) {
        const parsed = JSON.parse(savedNotifications)
        setNotifications(parsed)
      }

      // Set initial counts after loading
      setTimeout(() => {
        const msgs = localStorage.getItem("contactMessages")
        if (msgs) {
          const parsed = JSON.parse(msgs)
          prevMessageCountRef.current = parsed.filter((m: ContactMessage) => m.status === "new").length
        }
        const results = localStorage.getItem("quizResults")
        if (results) {
          prevQuizResultCountRef.current = JSON.parse(results).length
        }
        initialLoadRef.current = false
      }, 100)
    } catch (error) {
      console.error("[v0] Error loading from localStorage:", error)
    }
  }, [])

  useEffect(() => {
    if (!mounted || initialLoadRef.current) return

    const newMessages = contactMessages.filter((m) => m.status === "new")

    if (newMessages.length > prevMessageCountRef.current) {
      const existingIds = notifications.map((n) => n.sourceId)
      const newNotifs = newMessages
        .filter((m) => !existingIds.includes(m.id))
        .map((m) => ({
          id: `notif-${m.id}`,
          message: `New message from ${m.name}`,
          time: new Date(m.date).toLocaleString(),
          read: false,
          sourceId: m.id,
          type: "message" as const,
        }))

      if (newNotifs.length > 0) {
        setNotifications((prev) => {
          const updated = [...newNotifs, ...prev].slice(0, 50)
          localStorage.setItem("notifications", JSON.stringify(updated))
          return updated
        })
        if (isAdminPageRef.current) {
          playNotificationSound()
        }
      }
    }
    prevMessageCountRef.current = newMessages.length
  }, [contactMessages, mounted, notifications])

  useEffect(() => {
    if (!mounted || initialLoadRef.current || quizResults.length === 0) return

    if (quizResults.length > prevQuizResultCountRef.current) {
      const existingIds = notifications.map((n) => n.sourceId)
      const newNotifs = quizResults
        .filter((r) => !existingIds.includes(r.id))
        .map((r) => ({
          id: `quiz-notif-${r.id}`,
          message: `Quiz completed: ${r.score}/${r.totalQuestions} correct`,
          time: new Date(r.date).toLocaleString(),
          read: false,
          sourceId: r.id,
          type: "quiz" as const,
        }))

      if (newNotifs.length > 0) {
        setNotifications((prev) => {
          const updated = [...newNotifs, ...prev].slice(0, 50)
          localStorage.setItem("notifications", JSON.stringify(updated))
          return updated
        })
        if (isAdminPageRef.current) {
          playNotificationSound()
        }
      }
    }
    prevQuizResultCountRef.current = quizResults.length
  }, [quizResults, mounted, notifications])

  const saveToStorage = useCallback((key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`[v0] Error saving ${key}:`, error)
    }
  }, [])

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      localStorage.setItem("notifications", JSON.stringify(updated))
      return updated
    })
  }, [])

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }))
      localStorage.setItem("notifications", JSON.stringify(updated))
      return updated
    })
  }, [])

  const updateSectionNames = useCallback(
    (names: Partial<SectionNames>) => {
      setSectionNames((prev) => {
        const updated = { ...prev, ...names }
        saveToStorage("sectionNames", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const updateContentSettings = useCallback(
    (settings: Partial<ContentSettings>) => {
      setContentSettings((prev) => {
        const updated = { ...prev, ...settings }
        saveToStorage("contentSettings", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const addGalleryImage = useCallback(
    (image: Omit<GalleryImage, "id">) => {
      const newImage: GalleryImage = { ...image, id: Date.now().toString() }
      setGalleryImages((prev) => {
        const updated = [...prev, newImage]
        saveToStorage("galleryImages", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const removeGalleryImage = useCallback(
    (id: string) => {
      setGalleryImages((prev) => {
        const updated = prev.filter((img) => img.id !== id)
        saveToStorage("galleryImages", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const updateGalleryImage = useCallback(
    (id: string, image: Partial<GalleryImage>) => {
      setGalleryImages((prev) => {
        const updated = prev.map((img) => (img.id === id ? { ...img, ...image } : img))
        saveToStorage("galleryImages", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const addReview = useCallback(
    (review: Omit<Review, "id">) => {
      const newReview: Review = { ...review, id: Date.now().toString() }
      setReviews((prev) => {
        const updated = [...prev, newReview]
        saveToStorage("reviews", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const removeReview = useCallback(
    (id: string) => {
      setReviews((prev) => {
        const updated = prev.filter((r) => r.id !== id)
        saveToStorage("reviews", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const updateReview = useCallback(
    (id: string, review: Partial<Review>) => {
      setReviews((prev) => {
        const updated = prev.map((r) => (r.id === id ? { ...r, ...review } : r))
        saveToStorage("reviews", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const addProduct = useCallback(
    (product: Omit<Product, "id">) => {
      const newProduct: Product = { ...product, id: Date.now() }
      setProducts((prev) => {
        const updated = [...prev, newProduct]
        saveToStorage("products", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const removeProduct = useCallback(
    (id: number) => {
      setProducts((prev) => {
        const updated = prev.filter((p) => p.id !== id)
        saveToStorage("products", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const updateProduct = useCallback(
    (id: number, product: Partial<Product>) => {
      setProducts((prev) => {
        const updated = prev.map((p) => (p.id === id ? { ...p, ...product } : p))
        saveToStorage("products", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const addCategory = useCallback(
    (category: Omit<Category, "id">) => {
      const newCategory: Category = { ...category, id: Date.now().toString() }
      setCategories((prev) => {
        const updated = [...prev, newCategory]
        saveToStorage("categories", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const updateCategory = useCallback(
    (id: string, category: Partial<Category>) => {
      setCategories((prev) => {
        const updated = prev.map((c) => (c.id === id ? { ...c, ...category } : c))
        saveToStorage("categories", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const removeCategory = useCallback(
    (id: string) => {
      setCategories((prev) => {
        const updated = prev.filter((c) => c.id !== id)
        saveToStorage("categories", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const updateAdminTranslations = useCallback(
    (translations: Partial<AdminTranslations>) => {
      setAdminTranslations((prev) => {
        const updated = { ...prev, ...translations }
        saveToStorage("adminTranslations", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const addQuiz = useCallback(
    (quiz: Omit<Quiz, "id">) => {
      const newQuiz: Quiz = { ...quiz, id: Date.now().toString(), createdAt: new Date().toISOString() }
      setQuizzes((prev) => {
        let updated = [...prev, newQuiz]
        if (newQuiz.isActive) {
          updated = updated.map((q) => (q.id === newQuiz.id ? q : { ...q, isActive: false }))
          setActiveQuizState(newQuiz)
        }
        saveToStorage("quizzes", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const updateQuiz = useCallback(
    (id: string, quiz: Partial<Quiz>) => {
      setQuizzes((prev) => {
        let updated = prev.map((q) => (q.id === id ? { ...q, ...quiz } : q))
        if (quiz.isActive) {
          updated = updated.map((q) => (q.id === id ? q : { ...q, isActive: false }))
          const active = updated.find((q) => q.id === id)
          if (active) setActiveQuizState(active)
        }
        saveToStorage("quizzes", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const deleteQuiz = useCallback(
    (id: string) => {
      setQuizzes((prev) => {
        const updated = prev.filter((q) => q.id !== id)
        saveToStorage("quizzes", updated)
        if (activeQuiz?.id === id) setActiveQuizState(null)
        return updated
      })
    },
    [saveToStorage, activeQuiz],
  )

  const setActiveQuizById = useCallback(
    (id: string) => {
      setQuizzes((prev) => {
        const updated = prev.map((q) => ({ ...q, isActive: q.id === id }))
        const active = updated.find((q) => q.id === id)
        if (active) setActiveQuizState(active)
        saveToStorage("quizzes", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const addQuizResult = useCallback(
    (result: Omit<QuizResult, "id">) => {
      const newResult: QuizResult = { ...result, id: Date.now().toString() }
      setQuizResults((prev) => {
        const updated = [newResult, ...prev]
        saveToStorage("quizResults", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const clearQuizResults = useCallback(() => {
    setQuizResults([])
    saveToStorage("quizResults", [])
  }, [saveToStorage])

  const value: StoreContextType = {
    contactMessages,
    addContactMessage: (message: Omit<ContactMessage, "id" | "date" | "status">) => {
      const newMessage: ContactMessage = {
        ...message,
        id: Date.now().toString(),
        date: new Date().toISOString(),
        status: "new",
      }
      setContactMessages((prev) => {
        const updated = [newMessage, ...prev]
        saveToStorage("contactMessages", updated)
        return updated
      })
    },
    updateMessageStatus: (id: string, status: ContactMessage["status"]) => {
      setContactMessages((prev) => {
        const updated = prev.map((m) => (m.id === id ? { ...m, status } : m))
        saveToStorage("contactMessages", updated)
        return updated
      })
    },
    deleteMessage: (id: string) => {
      setContactMessages((prev) => {
        const updated = prev.filter((m) => m.id !== id)
        saveToStorage("contactMessages", updated)
        return updated
      })
    },
    storeSettings,
    updateStoreSettings: (settings: Partial<StoreSettings>) => {
      setStoreSettings((prev) => {
        const updated = { ...prev, ...settings }
        saveToStorage("storeSettings", updated)
        return updated
      })
    },
    footerSettings,
    updateFooterSettings: (settings: Partial<FooterSettings>) => {
      setFooterSettings((prev) => {
        const updated = { ...prev, ...settings }
        saveToStorage("footerSettings", updated)
        return updated
      })
    },
    adminSettings,
    updateAdminSettings: (settings: Partial<AdminSettings>) => {
      setAdminSettings((prev) => {
        const updated = { ...prev, ...settings }
        saveToStorage("adminSettings", updated)
        return updated
      })
    },
    sectionNames,
    updateSectionNames,
    contentSettings,
    updateContentSettings,
    galleryImages,
    addGalleryImage,
    removeGalleryImage,
    updateGalleryImage,
    reviews,
    addReview,
    removeReview,
    updateReview,
    products,
    addProduct,
    removeProduct,
    updateProduct,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearAllNotifications,
    playAdminNotificationSound,
    setIsAdminPage,
    categories,
    addCategory,
    updateCategory,
    removeCategory,
    adminTranslations,
    updateAdminTranslations,
    quizzes,
    activeQuiz,
    quizResults,
    addQuiz,
    updateQuiz,
    deleteQuiz,
    setActiveQuizById,
    addQuizResult,
    clearQuizResults,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
