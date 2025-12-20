"use client"

interface ColorSelectorProps {
  colors: string[]
  selectedColor: string
  onColorChange: (color: string) => void
}

const colorMap: Record<string, string> = {
  "Baby Pink": "bg-pink-200",
  "Blush Rose": "bg-rose-200",
  "Soft Coral": "bg-orange-200",
  "Classic Red": "bg-red-500",
  "Soft Pink": "bg-pink-300",
  "Pure White": "bg-white border-2 border-gray-200",
  "Deep Red": "bg-red-700",
  Burgundy: "bg-rose-900",
  "Rose Gold": "bg-amber-200",
  "Mixed Pastels": "bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200",
  "Lavender Dreams": "bg-purple-200",
  "Sunny Yellow": "bg-yellow-300",
  "Coral Charm": "bg-orange-300",
  "White Cloud": "bg-gray-100",
  "Sunset Orange": "bg-orange-400",
  "Coral Pink": "bg-pink-400",
  "Golden Yellow": "bg-yellow-400",
}

export function ColorSelector({ colors, selectedColor, onColorChange }: ColorSelectorProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-rose-600/70 font-medium">Select Color</p>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onColorChange(color)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              selectedColor === color
                ? "bg-rose-100 ring-2 ring-rose-400 ring-offset-2"
                : "bg-white hover:bg-rose-50 border border-rose-200"
            }`}
          >
            <span className={`w-4 h-4 rounded-full ${colorMap[color] || "bg-rose-300"}`} />
            <span className="text-sm text-rose-800">{color}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
