import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { AdminLoginForm } from "./login-form"
import { DemoCredentials } from "./demo-credentials"

export default async function AdminLoginPage() {
  const user = await getUser()

  if (user?.role === "admin") {
    redirect("/admin")
  }

  return (
    <main className="min-h-screen bg-rose-50/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-rose-900">Admin Login</h1>
          <p className="text-rose-600/70 mt-2">Sign in to manage your flower shop</p>
        </div>

        <AdminLoginForm />

        <DemoCredentials />
      </div>
    </main>
  )
}
