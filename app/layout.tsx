import type React from "react"
import type { Metadata, Viewport } from "next"
import { Poppins, Playfair_Display, Cairo, Aref_Ruqaa } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/language-context"
import { StoreProvider } from "@/lib/store-context"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
})

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cairo",
})

const arefRuqaa = Aref_Ruqaa({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-aref-ruqaa",
})

export const metadata: Metadata = {
  title: "Whispering Petals | Artisan Flower Boutique",
  description:
    "Discover our curated collection of handcrafted floral arrangements for moments of love and grace. Premium flowers delivered with elegance.",
  keywords: ["flowers", "bouquets", "floral arrangements", "gift flowers", "rose bouquet", "flower shop"],
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#fdf2f4",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${playfair.variable} ${cairo.variable} ${arefRuqaa.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          <StoreProvider>{children}</StoreProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
