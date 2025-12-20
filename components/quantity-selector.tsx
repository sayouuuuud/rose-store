"use client"

import { Minus, Plus } from "lucide-react"

interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (quantity: number) => void
  min?: number
  max?: number
}

export function QuantitySelector({ quantity, onQuantityChange, min = 1, max = 99 }: QuantitySelectorProps) {
  const decrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1)
    }
  }

  const increase = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={decrease}
        disabled={quantity <= min}
        className="w-10 h-10 rounded-full bg-rose-100 hover:bg-rose-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4 text-rose-700" />
      </button>
      <span className="w-12 text-center font-semibold text-rose-900 text-lg">{quantity}</span>
      <button
        onClick={increase}
        disabled={quantity >= max}
        className="w-10 h-10 rounded-full bg-rose-100 hover:bg-rose-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4 text-rose-700" />
      </button>
    </div>
  )
}
