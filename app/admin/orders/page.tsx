import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Eye, Clock, CheckCircle } from "lucide-react"

const orders = [
  {
    id: "ORD-001",
    customer: "Sarah Mitchell",
    product: "Blush Harmony Bouquet",
    total: 95,
    status: "completed",
    date: "2024-12-14T14:30:00",
  },
  {
    id: "ORD-002",
    customer: "Ahmed Hassan",
    product: "Eternal Grace Box",
    total: 120,
    status: "processing",
    date: "2024-12-14T12:15:00",
  },
  {
    id: "ORD-003",
    customer: "Emily Chen",
    product: "Peony Paradise",
    total: 145,
    status: "pending",
    date: "2024-12-14T10:00:00",
  },
  {
    id: "ORD-004",
    customer: "Maria Garcia",
    product: "Velvet Romance Arrangement",
    total: 110,
    status: "completed",
    date: "2024-12-13T16:45:00",
  },
]

export default async function AdminOrdersPage() {
  const user = await getUser()

  if (!user || user.role !== "admin") {
    redirect("/admin/login")
  }

  return (
    <AdminLayout userEmail={user.email}>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500 mt-1">Track and manage customer orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-sm">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-sm">Pending</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {orders.filter((o) => o.status === "pending").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-sm">Processing</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {orders.filter((o) => o.status === "processing").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-sm">Completed</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {orders.filter((o) => o.status === "completed").length}
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Order ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Customer</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Product</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Total</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-900">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{order.customer}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{order.product}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">${order.total}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "processing"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status === "completed" && <CheckCircle className="w-3 h-3" />}
                      {order.status === "processing" && <Clock className="w-3 h-3" />}
                      {order.status === "pending" && <Clock className="w-3 h-3" />}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-500 text-sm">{new Date(order.date).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
