import { NextResponse } from "next/server"
import { getProductById, products } from "@/lib/products-data"
import { getUser } from "@/lib/auth"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params
  const product = getProductById(Number(id))

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(product)
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const user = await getUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const productIndex = products.findIndex((p) => p.id === Number(id))

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const body = await request.json()

    // In production, this would update the database
    const updatedProduct = {
      ...products[productIndex],
      ...body,
      id: Number(id), // Ensure ID doesn't change
    }

    return NextResponse.json(updatedProduct)
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const user = await getUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const product = getProductById(Number(id))

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // In production, this would delete from database
    return NextResponse.json({ success: true, message: "Product deleted" })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
