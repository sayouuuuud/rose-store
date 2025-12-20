export interface Product {
  id: number
  name: string
  price: number
  description: string
  images: string[]
  colors: string[]
  availability: boolean
  category: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "Blush Harmony Bouquet",
    price: 95,
    description:
      "Exquisite harmony bouquet with blush, autumn tones and hints of romance and elegance. Perfect for anniversaries, birthdays, or expressing your deepest affections.",
    images: ["/elegant-pink-roses-bouquet-blush-tones-romantic.jpg", "/blush-pink-flower-arrangement-romantic.jpg", "/romantic-rose-bouquet-soft-pink.jpg"],
    colors: ["Baby Pink", "Blush Rose", "Soft Coral"],
    availability: true,
    category: "Bouquets",
  },
  {
    id: 2,
    name: "Eternal Grace Box",
    price: 120,
    description:
      "A stunning arrangement of premium roses in an elegant box, symbolizing eternal love and grace. Hand-selected blooms that last longer than traditional bouquets.",
    images: ["/luxury-flower-box-red-roses-elegant-gift.jpg", "/elegant-rose-arrangement-premium-gift-box.jpg", "/premium-flower-gift-box-roses-luxury.jpg"],
    colors: ["Classic Red", "Soft Pink", "Pure White"],
    availability: true,
    category: "Box Arrangements",
  },
  {
    id: 3,
    name: "Velvet Romance Arrangement",
    price: 110,
    description:
      "Velvet-textured roses paired with delicate greenery create this romantic masterpiece. Ideal for proposals, anniversaries, or any moment that calls for elegance.",
    images: ["/velvet-deep-red-roses-romantic-luxury.jpg", "/romantic-red-roses-elegant-arrangement.jpg", "/luxury-rose-bouquet-deep-red-burgundy.jpg"],
    colors: ["Deep Red", "Burgundy", "Rose Gold"],
    availability: true,
    category: "Arrangements",
  },
  {
    id: 4,
    name: "Garden Dream Basket",
    price: 85,
    description:
      "A whimsical basket filled with garden-fresh blooms, bringing the beauty of nature indoors. Features seasonal flowers in soft, dreamy hues.",
    images: ["/garden-flower-basket-colorful-spring.jpg", "/spring-flowers-wicker-basket-fresh.jpg", "/cottage-style-flower-basket-rustic.jpg"],
    colors: ["Mixed Pastels", "Lavender Dreams", "Sunny Yellow"],
    availability: true,
    category: "Baskets",
  },
  {
    id: 5,
    name: "Peony Paradise",
    price: 145,
    description:
      "Luxurious peonies in full bloom, representing prosperity and romance. This premium arrangement features the most sought-after seasonal blooms.",
    images: ["/luxury-peony-flower-arrangement-pink-white.jpg", "/pink-peonies-bouquet-elegant-luxury.jpg", "/elegant-peony-white-pink-premium.jpg"],
    colors: ["Blush Pink", "Coral Charm", "White Cloud"],
    availability: true,
    category: "Premium",
  },
  {
    id: 6,
    name: "Sunset Serenade",
    price: 75,
    description:
      "Warm sunset tones dance through this enchanting arrangement. Orange roses, coral carnations, and golden accents create a symphony of color.",
    images: ["/sunset-orange-roses-flower-arrangement-warm.jpg", "/coral-orange-flower-bouquet-elegant.jpg", "/golden-yellow-orange-flower-arrangement.jpg"],
    colors: ["Sunset Orange", "Coral Pink", "Golden Yellow"],
    availability: true,
    category: "Bouquets",
  },
]

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}
