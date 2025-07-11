"use client"

import { useState, useEffect } from "react"
import {LayoutGrid, ChartNoAxesColumnIncreasing, BookOpen, Sparkle, BookmarkMinus, Settings, ChevronsLeft, X, Search } from "lucide-react"
import { Button } from "@/components/common/button/button"
import Image from "next/image"
import { SearchModal } from "@/components/common/modals/search-modal"

const navigationItems = [
  { icon: LayoutGrid, label: "Dashboard", active: true },
  { icon: ChartNoAxesColumnIncreasing, label: "Analysis", active: false },
  { icon: BookOpen, label: "News & Report", active: false },
  { icon: Sparkle, label: "Exclusive report", active: false },
  { icon: BookmarkMinus, label: "Watchlist", active: false },
  { icon: Settings, label: "Settings", active: false },
]

interface DashboardSidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function DashboardSidebar({ isCollapsed, onToggle }: DashboardSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileOpen])

  return (
    <>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-[#171717] hover:bg-gray-700 text-white w-10 h-10 rounded-lg"
      >
        <LayoutGrid className="w-5 h-5" />
      </Button>

      
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile  */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-[#171717] border-r border-gray-800 flex flex-col transition-transform duration-300 z-50 md:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        
        <div className="p-4 sm:p-6 border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/assets/images/logo.png"
              alt="Petrodata"
              width={isMobileOpen ? 20 : 17}
              height={isMobileOpen ? 20 : 17}
              className="object-cover cursor-pointer"
            />
            <h1 className="text-lg sm:text-xl font-medium text-teal-400 whitespace-nowrap">
              Petro<span className="text-white">data</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => setIsSearchModalOpen(true)}
            >
              <Search className="w-5 h-5 text-gray-400" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Nav-icon */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`w-full justify-start ${isMobileOpen ? "px-4 gap-2 text-base" : "px-6 gap-3 text-lg"} h-12 ${
                  item.active
                    ? "bg-teal-500/10 text-teal-400 border-r-2 border-teal-400"
                    : "text-white hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => setIsMobileOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Button>
            ))}
          </div>
        </nav>
      </aside>

      {/* Desktop  */}
      <aside
        className={`${
          isCollapsed ? "w-16" : "w-64"
        } bg-[#171717] border-r border-gray-800 flex flex-col transition-all duration-300 relative hidden md:flex`}
      >
        {/* Logo  */}
        {!isCollapsed && (
          <div className="p-6  border-gray-800">
            <div className="flex items-center gap-3">
            <Image
            src="/assets/images/logo.png"
            alt="Petrodata"
             width={15}
             height={15}
            className="object-cover cursor-pointer"
    />
    <div>
    <h1 className="text-[24px] font-light text-teal-400">Petro<span className="text-white font-light">data</span></h1>
    </div>

            </div>
          </div>
        )}

        
        {isCollapsed && (
          <div className="p-4 border-b border-gray-800 flex justify-center">
                <Image
            src="/assets/images/logo.png"
            alt="Petrodata"
             width={17}
             height={17}
            className="object-cover cursor-pointer"
    />
          </div>
        )}

        {/* Navigation Toggle Button  */}
        <div className="relative py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#262626] border border-[#404040] text-gray-400 hover:text-white hover:bg-gray-700 z-10"
          >
            <ChevronsLeft className={`w-4 h-4 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <div className="space-y-2 p-4">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative">
                {item.active && (
                  <div className="absolute right-[-15px] top-0 h-full w-[2px] bg-teal-400 rounded-l" />
                )}
                <Button
                  variant="ghost"
                  className={` w-full cursor-pointer ${isCollapsed ? "justify-center px-0" : "justify-start px-6"} gap-3 h-12 ${
                    item.active
                      ? "text-teal-400 hover:bg-teal-500/10"
                      : "text-white hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </Button>
              </div>
            ))}
          </div>
        </nav>
      </aside>
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
    </>
  )
}
