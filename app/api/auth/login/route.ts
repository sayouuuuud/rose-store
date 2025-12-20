import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createToken, DEMO_ADMIN } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const cookieStore = await cookies()

    const customCredentials = cookieStore.get("admin-credentials")?.value
    let adminEmail = DEMO_ADMIN.email
    let adminPassword = DEMO_ADMIN.password

    if (customCredentials) {
      try {
        const parsed = JSON.parse(customCredentials)
        if (parsed.email) adminEmail = parsed.email
        if (parsed.password) adminPassword = parsed.password
      } catch {
        // Use defaults if parsing fails
      }
    }

    // Check credentials
    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Create JWT token
    const token = await createToken({
      id: DEMO_ADMIN.id,
      email: adminEmail,
      role: DEMO_ADMIN.role,
    })

    // Set auth cookie
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    })

    return NextResponse.json({
      success: true,
      user: {
        id: DEMO_ADMIN.id,
        email: adminEmail,
        role: DEMO_ADMIN.role,
      },
    })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
