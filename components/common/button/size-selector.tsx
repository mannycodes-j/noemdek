"use client"

import type React from "react"

import { Button } from "@/components/common/button/button"

interface SizeSelectorProps {
  selectedSize: "S" | "M" | "L"
  onSizeChange: (size: "S" | "M" | "L") => void
  onClick?: (e: React.MouseEvent) => void
}

export function SizeSelector({ selectedSize, onSizeChange, onClick }: SizeSelectorProps) {
  return (
    <div className="flex gap-2 mx-auto">
      {(["S", "M", "L"] as const).map((size) => (
        <Button
          key={size}
          variant={selectedSize === size ? "default" : "outline"}
          size="sm"
          className={`w-8 h-8 p-0 rounded-full ${
            selectedSize === size
              ? "bg-black border-[#737373] text-white"
              : "bg-transparent border-[#737373] text-gray-400 hover:bg-gray-700"
          }`}
          onClick={(e) => {
            onClick?.(e)
            onSizeChange(size)
          }}
        >
          {size}
        </Button>
      ))}
    </div>
  )
}
