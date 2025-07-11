'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  Search,
  Menu,
  X,
  Tag,
  Plane,
  Warehouse,
  Newspaper,
  StickyNote,
  ArrowLeftRight,
} from 'lucide-react'
import type { SidebarItem } from '@/lib/types/types'

interface EditWidgetSidebarProps {
  items: SidebarItem[]
  activeItem: string
  onItemSelect: (itemId: string) => void
}

export function EditWidgetSidebar({ items, activeItem, onItemSelect }: EditWidgetSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)
  const closeSidebar = () => setIsOpen(false)

  return (
    <>
      {/* Toggle button */}
      <div className="md:hidden p-4 flex items-center justify-between bg-[#262626]">
        {/* <h1 className="text-white text-lg font-semibold">Edit Widget</h1> */}
        <button onClick={toggleSidebar}>
          {isOpen ? <X className="text-white w-6 h-6" /> : <Menu className="text-white w-6 h-6" />}
        </button>
      </div>

      
      <div
        className={`
          fixed md:static top-0 left-0 h-full z-50 bg-[#262626] w-64 p-4 flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:flex
        `}
      >
        {/* Search */}
        <div className="relative mb-6 mt-4 md:mt-10 md:mb-10">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-[#404040] h-12 rounded-full border-none text-white placeholder-gray-400 focus:border-gray-600"
          />
        </div>

        
        <nav className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-[40px] cursor-pointer transition-colors ${
                activeItem === item.id
                  ? 'bg-[#404040] text-[#E5E5E5]'
                  : 'text-[#E5E5E5] hover:text-white hover:bg-gray-800'
              }`}
              onClick={() => {
                onItemSelect(item.id)
                closeSidebar()
              }}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {item.id === 'product-retail-price' && <Tag className="w-4 h-4" />}
                {item.id === 'flight-widget' && <Plane className="w-4 h-4" />}
                {item.id === 'depot-widget' && <Warehouse className="w-4 h-4" />}
                {item.id === 'news-widget' && <Newspaper className="w-4 h-4" />}
                {item.id === 'report-widget' && <StickyNote className="w-4 h-4" />}
                {item.id === 'exchange-rate' && <ArrowLeftRight className="w-4 h-4" />}
              </div>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}
    </>
  )
}
