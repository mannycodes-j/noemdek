"use client"

import { useState } from "react"
import { Search, Bell, AlarmClockPlus, Sun, Moon } from "lucide-react"
import { Button } from "@/components/common/button/button"
import { useTheme } from "next-themes"
import { ExactAlertModal } from "@/components/common/modals/exact-alert-modal"
import { NotificationModal } from "@/components/common/modals/notification-modal"
import { SearchModal } from "@/components/common/modals/search-modal"

interface DashboardHeaderProps {
  onNotificationModalChange?: (isOpen: boolean) => void
}

export function DashboardHeader({ onNotificationModalChange }: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme()
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false)
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  
  const handleNotificationModalChange = (isOpen: boolean) => {
    setIsNotificationModalOpen(isOpen)
    onNotificationModalChange?.(isOpen)
  }

  return (
    <>
      <header className="flex items-center ml-20 md:ml-0 justify-between p-4 sm:p-6 border-b border-[#404040] bg-[#262626]">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-semibold text-white">Hello, John</h1>
          <p className="text-sm text-gray-400 hidden sm:block">Thursday, February 15</p>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchModalOpen(true)}
            className="hidden sm:flex text-white hover:text-white bg-[#525252] rounded-full hover:bg-[#606060] w-10 h-10 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110 focus:outline-none"
          >
            <Search className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            className="text-white hover:text-white bg-[#525252] rounded-[40px] hover:bg-[#606060]  px-4 py-2 sm:px-4 sm:py-2 h-10 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 focus:outline-none"
            onClick={() => setIsAlertModalOpen(true)}
          >
            <AlarmClockPlus className="w-4 h-4 sm:mr-2" />
            <span className="text-sm hidden sm:inline">Set alert</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-white bg-[#525252] rounded-[40px] hover:bg-[#606060]  w-10 h-10 relative transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110 focus:outline-none"
            onClick={() => handleNotificationModalChange(true)}
          >
            <Bell className="w-4 h-4" />
          </Button>

         
          <div className="relative w-[72px] h-[36px] flex items-center">
           
            <div className="absolute inset-0 flex items-center justify-between bg-teal-600 dark:bg-[#00695C] rounded-full px-4 transition-colors duration-300" style={{ borderRadius: "36px" }}>
              <Moon className="w-5 h-5 text-white opacity-70" />
              <Sun className="w-5 h-5 text-white opacity-70" />
            </div>
           
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`
                absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full shadow-md flex items-center justify-center
                transition-all duration-300 cursor-pointer
                ${theme === "dark" ? "left-1 bg-white text-teal-600" : "right-1 bg-teal-400 text-white"}
              `}
              aria-label="Toggle theme"
              style={{ borderRadius: "36px" }}
            >
              {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <ExactAlertModal isOpen={isAlertModalOpen} onClose={() => setIsAlertModalOpen(false)} />
      <NotificationModal isOpen={isNotificationModalOpen} onClose={() => handleNotificationModalChange(false)} />
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
    </>
  )
}
