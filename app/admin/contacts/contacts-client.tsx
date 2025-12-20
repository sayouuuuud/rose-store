"use client"

import { useStore } from "@/lib/store-context"
import { Mail, Phone, Trash2, Check, Clock } from "lucide-react"

export function ContactsClient() {
  const { contactMessages, updateMessageStatus, deleteMessage } = useStore()

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
        <p className="text-gray-500 mt-1">Customer inquiries from the contact form</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-500 text-sm">Total Messages</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{contactMessages.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-500 text-sm">New</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {contactMessages.filter((m) => m.status === "new").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-gray-500 text-sm">Pending Reply</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {contactMessages.filter((m) => m.status === "read").length}
          </p>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {contactMessages.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
            <p className="text-gray-500">No messages yet</p>
          </div>
        ) : (
          contactMessages.map((message) => (
            <div key={message.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-semibold text-gray-900">{message.name}</p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        message.status === "new"
                          ? "bg-blue-100 text-blue-700"
                          : message.status === "read"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {message.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    {message.contact.includes("@") ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                    {message.contact}
                  </div>
                  <p className="text-gray-600">{message.message}</p>
                  <div className="flex items-center gap-1 text-gray-400 text-sm mt-3">
                    <Clock className="w-4 h-4" />
                    {new Date(message.date).toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {message.status !== "replied" && (
                    <button
                      onClick={() => updateMessageStatus(message.id, "replied")}
                      className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                      title="Mark as replied"
                    >
                      <Check className="w-4 h-4 text-green-600" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(message.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
