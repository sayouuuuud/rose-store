import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "whispering-petals-secret-key-2024")

export interface User {
  id: number
  email: string
  role: string
}

// Demo admin credentials (in production, this would be in a database)
export const DEMO_ADMIN = {
  id: 1,
  email: "admin@whisperingpetals.com",
  password: "admin123",
  role: "admin",
}

export async function createToken(user: User): Promise<string> {
  const token = await new SignJWT({ userId: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secretKey)
  return token
}

export async function verifyToken(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey)
    return {
      id: payload.userId as number,
      email: payload.email as string,
      role: payload.role as string,
    }
  } catch {
    return null
  }
}

export async function getUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")?.value
  if (!token) return null
  return verifyToken(token)
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  })
}

export async function removeAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}
