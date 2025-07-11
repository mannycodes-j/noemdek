"use client"

import {MessageCircleMore } from "lucide-react"
import { Button } from "@/components/common/button/button"

interface FloatingRequestButtonProps {
  isHidden?: boolean
}

export function FloatingRequestButton({ isHidden = false }: FloatingRequestButtonProps) {
  if (isHidden) return null

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      <Button className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-3 py-2 sm:px-6 sm:py-3 rounded-[40px] shadow-lg transition-all duration-300 ease-out hover:scale-105">
        <MessageCircleMore className="w-4 h-4 mr-1 sm:mr-2" />
        <span className="text-[12px] sm:text-[13px]">
          <span className="hidden xs:inline">Make special request</span>
          <span className="xs:hidden">Make special request</span>
        </span>
      </Button>
    </div>
  )
}
