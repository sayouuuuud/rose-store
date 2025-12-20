import { ProductDetailsClient } from "./product-details-client"
import { BottomNav } from "@/components/bottom-nav"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params

  return (
    <main className="min-h-screen bg-rose-50/50">
      <Navbar />
      <div className="pb-32 pt-4">
        <ProductDetailsClient productId={Number(id)} />
      </div>
      <Footer />
      <BottomNav />
    </main>
  )
}
