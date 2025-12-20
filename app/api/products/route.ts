import { NextResponse } from "next/server"
import { products } from "@/lib/products-data"
import { getUser } from "@/lib/auth"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")

  let filteredProducts = products

  if (category) {
    filteredProducts = products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
  }

  return NextResponse.json(filteredProducts)
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const user = await getUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.price || !body.description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new product (in production, this would insert into database)
    const newProduct = {
      id: products.length + 1,
      name: body.name,
      price: Number(body.price),
      description: body.description,
      images: body.images || [],
      colors: body.colors || [],
      availability: body.availability ?? true,
      category: body.category || "Bouquets",
    }

    // In a real app, we'd save to the database here
    // products.push(newProduct)

    return NextResponse.json(newProduct, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
