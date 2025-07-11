"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X, BarChart3, FileText, Bookmark, Sparkles } from "lucide-react"
import Image from "next/image"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

type SearchTab = "search" | "ai"
type CategoryFilter = "all" | "analysis" | "news" | "report" | "exclusive"

interface SearchSuggestion {
  id: string
  symbol: string
  fullName: string
  category: CategoryFilter
  type: "commodity" | "analysis" | "news" | "report"
}

interface AIQuery {
  id: string
  text: string
}

const searchSuggestions: SearchSuggestion[] = [
  { id: "1", symbol: "PMS", fullName: "Petroleum Motor Spirit", category: "all", type: "commodity" },
  { id: "2", symbol: "AGO", fullName: "Automotive Gas Oil", category: "all", type: "commodity" },
  { id: "3", symbol: "DPK", fullName: "Dual Purpose Kerosene", category: "all", type: "commodity" },
  { id: "4", symbol: "LPG", fullName: "Liquified Petroleum Gas", category: "all", type: "commodity" },
  { id: "5", symbol: "ICE", fullName: "ICE Brent Crude", category: "all", type: "commodity" },
]

const popularAIQueries: AIQuery[] = [
  { id: "1", text: "Show me the current price of ICE Brent Crude." },
  { id: "2", text: "What is the historical price trend for PMS in the last 6 months?" },
  { id: "3", text: "Compare AGO prices in Lagos and Port Harcourt." },
  { id: "4", text: "Set an alert for when LPG prices drop below ₦300 per liter." },
  { id: "5", text: "Generate a report on the price volatility of AGO over the past year." },
]

const categoryFilters = [
  { id: "all", label: "All", icon: Search },
  { id: "analysis", label: "Analysis", icon: BarChart3 },
  { id: "news", label: "News", icon: FileText },
  { id: "report", label: "Report", icon: Bookmark },
  { id: "exclusive", label: "Exclusive report", icon: Sparkles },
] as const

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [activeTab, setActiveTab] = useState<SearchTab>("search")
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [aiQuery, setAiQuery] = useState("")
  const [selectedSuggestion, setSelectedSuggestion] = useState("PMS")
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const aiInputRef = useRef<HTMLInputElement>(null)

  // Handle modal animation and focus management
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      // Lock body scroll
      document.body.style.overflow = "hidden"

      requestAnimationFrame(() => {
        setTimeout(() => {
          setIsAnimating(true)
          
          setTimeout(() => {
            if (activeTab === "search") {
              searchInputRef.current?.focus()
            } else {
              aiInputRef.current?.focus()
            }
          }, 200)
        }, 50)
      })
    } else {
      setIsAnimating(false)
  
      document.body.style.overflow = "unset"
      setTimeout(() => setShouldRender(false), 300)
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen, activeTab])

  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsAnimating(false)
    document.body.style.overflow = "unset"
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSelectedSuggestion(suggestion.symbol)
    setSearchQuery(suggestion.symbol)
    console.log("Selected:", suggestion)
  }

  const handleAIQueryClick = (query: AIQuery) => {
    setAiQuery(query.text)
    console.log("AI Query:", query.text)
  }

  const filteredSuggestions = searchSuggestions.filter((suggestion) => {
    const matchesCategory = activeCategory === "all" || suggestion.category === activeCategory
    const matchesQuery =
      searchQuery === "" ||
      suggestion.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suggestion.fullName.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesQuery
  })

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isAnimating ? "bg-black/50 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#171717] shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] transform ${
          isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{
          width: "712px",
          minHeight: "440px",
          borderRadius: "8px",
          maxWidth: "calc(100vw - 32px)",
          maxHeight: "calc(100vh - 32px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {activeTab === "search" ? (
    
          <>
            
            <div className="flex items-center justify-between p-6 pb-4  flex-shrink-0">
              <div className="flex items-center gap-6">
                {/* Logo */}
                <div className="flex items-center gap-3">
                <Image
            src="/assets/images/logo.png"
            alt="Petrodata"
             width={15}
             height={15}
            className="object-cover cursor-pointer"
    />
                </div>

                {/* Tab Navigation */}
                <div className="flex items-center gap-6">
                  <button onClick={() => setActiveTab("search")}  className={`px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
      activeTab === "search"
        ? "bg-[#262626] text-white"
        : "text-gray-400 hover:text-gray-300"
    }`}>
                    Search
                  </button>
                  <button
                    onClick={() => setActiveTab("ai")}
                    className="text-base font-medium text-gray-400 hover:text-gray-300 transition-all duration-300 ease-out cursor-pointer"
                  >
                    Ask Petrodata AI
                  </button>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-all duration-300 ease-out hover:scale-110 focus:outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Content */}
            <div className="flex-1 flex flex-col p-6 space-y-6">
              {/* Search Input */}
              <div className="relative flex-shrink-0">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8  rounded-full ">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-[#0A0A0A] pl-10 pr-0 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-[#0A0A0A] transition-all duration-300 ease-out text-base"
                />
              </div>

              {/* Category Filters */}
              <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-hide flex-shrink-0">
                {categoryFilters.map((filter) => {
                  const IconComponent = filter.icon
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setActiveCategory(filter.id as CategoryFilter)}
                      className={`flex items-center gap-2 px-0 py-2 text-sm font-medium transition-all duration-300 ease-out whitespace-nowrap relative cursor-pointer ${
                        activeCategory === filter.id ? "text-teal-400" : "text-gray-400 hover:text-gray-300"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{filter.label}</span>

                      {/* Active indicator */}
                      {activeCategory === filter.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 rounded-full"></div>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Suggestions Section */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-gray-400 text-sm font-medium mb-4 flex-shrink-0">Suggestions</h3>

                <div className="space-y-3">
                  {filteredSuggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-300 ease-out hover:bg-gray-700/50 group cursor-pointer ${
                        selectedSuggestion === suggestion.symbol
                          ? "bg-[#404040]/10"
                          : "hover:bg-gray-700/30"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-white font-semibold text-lg">{suggestion.symbol}</span>
                          <span className="text-gray-400 text-base">{suggestion.fullName}</span>
                        </div>

                        {selectedSuggestion === suggestion.symbol && (
                          <div className="text-teal-400 opacity-70">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {filteredSuggestions.length === 0 && (
                  <div className="flex-1 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No results found</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          
          <>
            {/* AI Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-700 flex-shrink-0">
              <div className="flex items-center gap-3">
               
                <button
                  onClick={() => setActiveTab("search")}
                  className="w-6 h-6  rounded-lg flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg focus:outline-none cursor-pointer"
                >
                <Image
            src="/assets/images/logo.png"
            alt="Petrodata"
             width={15}
             height={15}
            className="object-cover cursor-pointer"
    />
                </button>
                
                <h2 className="text-base font-medium text-white">Ask Petrodata AI</h2>
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-all duration-300 ease-out hover:scale-110 focus:outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Content */}
            <div className="flex-1 flex flex-col p-6 space-y-6">
              {/* AI Search Input */}
              <div className="relative flex-shrink-0">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8  rounded-full">
                  <Sparkles className="w-5 h-5" />
                </div>
                <input
                  ref={aiInputRef}
                  type="text"
                  placeholder="Search using petrodata AI"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-[#0A0A0A] pl-10 pr-0 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-[#0A0A0A] transition-all duration-300 ease-out text-base"
                />
              </div>

              {/* Popular Section */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-gray-400 text-sm font-medium mb-4 flex-shrink-0">Popular</h3>

                <div className="space-y-4">
                  {popularAIQueries.map((query) => (
                    <button
                      key={query.id}
                      onClick={() => handleAIQueryClick(query)}
                      className="w-full text-left p-4 rounded-xl transition-all duration-300 ease-out hover:bg-gray-700/30 group cursor-pointer"
                    >
                      <div className="text-gray-300 text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                        {query.text}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
