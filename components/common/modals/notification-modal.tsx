"use client"

import type React from "react"
import { notifications } from "@/lib/data/data"

import { useState, useEffect } from "react"
import { X, CheckCheck } from "lucide-react"

interface NotificationModalProps {
  isOpen: boolean
  onClose: () => void
}

type NotificationTab = "all" | "comments" | "mentioned"



export function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  const [activeTab, setActiveTab] = useState<NotificationTab>("all")
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    const maxScroll = scrollHeight - clientHeight
    const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0
    setScrollProgress(Math.min(100, Math.max(0, progress)))
  }

  
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      
      const scrollY = window.scrollY

    
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflow = "hidden"

      requestAnimationFrame(() => {
        setTimeout(() => setIsAnimating(true), 20)
      })
    } else {
      setIsAnimating(false)

      
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""

      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)
      }

      setTimeout(() => setShouldRender(false), 400)
    }

    
    return () => {
      if (isOpen) {
        const scrollY = document.body.style.top
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.width = ""
        document.body.style.overflow = ""

        if (scrollY) {
          window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)
        }
      }
    }
  }, [isOpen])

  
  const handleClose = () => {
    setIsAnimating(false)

    
    const scrollY = document.body.style.top
    document.body.style.position = ""
    document.body.style.top = ""
    document.body.style.width = ""
    document.body.style.overflow = ""

    if (scrollY) {
      window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)
    }

    setTimeout(() => {
      onClose()
    }, 400)
  }

  
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  
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

  
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "comments") return notification.type === "comment"
    if (activeTab === "mentioned") return notification.type === "mention"
    return true
  })

  
  const handleMarkAllAsRead = () => {
    console.log("Marking all notifications as read")
    handleClose()
  }

  if (!shouldRender) return null

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return (
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 ease-out hover:bg-gray-600">
            <CheckCheck className="w-5 h-5 text-white" />
          </div>
        )
      case "report":
        return (
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 ease-out hover:bg-gray-600">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isAnimating ? "bg-black/50 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-[#171717] shadow-2xl transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] transform ${
          isAnimating ? "translate-x-0 opacity-100" : "translate-x-full opacity-90"
        } flex flex-col`}
        style={{
          borderTopLeftRadius: window.innerWidth >= 640 ? "24px" : "0px",
          borderBottomLeftRadius: window.innerWidth >= 640 ? "24px" : "0px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex items-center justify-between p-4 sm:p-6 pb-4 flex-shrink-0">
          <h2
            className={`text-lg sm:text-xl font-medium text-white transition-all duration-500 ease-out ${
              isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Your notifications
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-all duration-300 ease-out hover:scale-110 focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        
        <div className="px-4 sm:px-6 pb-4 flex-shrink-0">
          <div
            className={`bg-[#171717] border-1 border-[#404040] rounded-[10px] p-1 flex transition-all duration-500 ease-out ${
              isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 py-2 px-4 rounded-[10px] text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:outline-none ${
                activeTab === "all"
                  ? "bg-[#404040] text-white shadow-lg transform scale-105"
                  : "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("comments")}
              className={`flex-1 py-2 px-4 rounded-[10px] text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:outline-none ${
                activeTab === "comments"
                  ? "bg-[#404040] text-white shadow-lg transform scale-105"
                  : "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
              }`}
            >
              Comments
            </button>
            <button
              onClick={() => setActiveTab("mentioned")}
              className={`flex-1 py-2 px-4 rounded-[10px] text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:outline-none ${
                activeTab === "mentioned"
                  ? "bg-[#404040] text-white shadow-lg transform scale-105"
                  : "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
              }`}
            >
              Mentioned
            </button>
          </div>
        </div>

        
        <div
          className="flex-1 overflow-y-auto px-4 sm:px-6 pb-6 unique-notification-scrollbar relative min-h-0"
          onScroll={handleScroll}
          style={{
            maxHeight: "calc(100vh - 200px)",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          
          <div className="absolute right-1 top-2 bottom-2 w-1 bg-gray-800 rounded-full overflow-hidden z-10">
            <div
              className="w-full bg-gradient-to-b from-teal-400 to-teal-600 rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{
                height: `${scrollProgress}%`,
                boxShadow: "0 0 8px rgba(20, 184, 166, 0.6)",
              }}
            />
          </div>

          <style jsx>{`
            .unique-notification-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #14b8a6 #1f2937;
            }
            
            .unique-notification-scrollbar::-webkit-scrollbar {
              width: 12px;
              background: transparent;
            }
            
            .unique-notification-scrollbar::-webkit-scrollbar-track {
              background: linear-gradient(180deg, #1f2937 0%, #111827 50%, #1f2937 100%);
              border-radius: 20px;
              border: 1px solid #374151;
              box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
              margin: 4px;
            }
            
            .unique-notification-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(180deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%);
              border-radius: 20px;
              border: 2px solid #1f2937;
              box-shadow: 
                0 0 10px rgba(20, 184, 166, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                inset 0 -1px 0 rgba(0, 0, 0, 0.2);
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .unique-notification-scrollbar::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(180deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%);
              box-shadow: 
                0 0 15px rgba(6, 182, 212, 0.6),
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                inset 0 -1px 0 rgba(0, 0, 0, 0.3);
              transform: scaleX(1.2);
              border-color: #0f172a;
            }
            
            .unique-notification-scrollbar::-webkit-scrollbar-thumb:active {
              background: linear-gradient(180deg, #f59e0b 0%, #d97706 50%, #b45309 100%);
              box-shadow: 
                0 0 20px rgba(245, 158, 11, 0.8),
                inset 0 2px 4px rgba(0, 0, 0, 0.4);
              transform: scaleX(1.3);
            }
            
            .unique-notification-scrollbar::-webkit-scrollbar-corner {
              background: #1f2937;
              border-radius: 10px;
            }
          `}</style>

          <div className="space-y-4">
            {filteredNotifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`flex items-start gap-3 p-3 rounded-xl hover:bg-gray-800/50 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer group ${
                  isAnimating ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{
                  transitionDelay: `${200 + index * 80}ms`,
                }}
              >
                
                <div className="relative flex-shrink-0 transition-all duration-300 ease-out group-hover:scale-105">
                  {notification.type === "alert" || notification.type === "report" ? (
                    getNotificationIcon(notification.type)
                  ) : (
                    <>
                      <img
                        src={notification.user.avatar || "/placeholder.svg"}
                        alt={notification.user.name}
                        className="w-10 h-10 rounded-full object-cover transition-all duration-300 ease-out group-hover:ring-2 group-hover:ring-teal-400/50"
                      />
                      {notification.user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-green-400"></div>
                      )}
                    </>
                  )}
                </div>

                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium text-sm transition-all duration-300 ease-out group-hover:text-teal-400">
                          {notification.user.name}
                        </span>
                        <span className="text-gray-400 text-xs transition-all duration-300 ease-out">
                          {notification.timestamp}
                        </span>
                      </div>

                      <div className="text-gray-300 text-sm mb-1 transition-all duration-300 ease-out group-hover:text-gray-200">
                        {notification.title.includes("PMS Price Analysis") ? (
                          <>
                            {notification.title.split("PMS Price Analysis")[0]}
                            <span className="text-teal-400 transition-all duration-300 ease-out group-hover:text-teal-300">
                              PMS Price Analysis
                            </span>
                            {notification.title.split("PMS Price Analysis")[1]}
                          </>
                        ) : notification.title.includes("Aliyu Tosin") ? (
                          <>
                            Invited{" "}
                            <span className="text-teal-400 transition-all duration-300 ease-out group-hover:text-teal-300">
                              Aliyu Tosin
                            </span>{" "}
                            to the La'organisation
                          </>
                        ) : notification.title.includes("₦500/Liter") ? (
                          <>
                            <span className="text-teal-400 transition-all duration-300 ease-out group-hover:text-teal-300">
                              PMS Falls Below ₦500/Liter
                            </span>
                          </>
                        ) : notification.title.includes("Now Available") ? (
                          <>
                            <span className="text-teal-400 transition-all duration-300 ease-out group-hover:text-teal-300">
                              PMS Market Analysis Now Available
                            </span>
                          </>
                        ) : (
                          notification.title
                        )}
                      </div>

                      {notification.content && (
                        <div className="text-gray-400 text-sm leading-relaxed transition-all duration-300 ease-out group-hover:text-gray-300">
                          {notification.content.includes("@john") ? (
                            <>
                              <span className="text-teal-400 transition-all duration-300 ease-out group-hover:text-teal-300">
                                @john
                              </span>{" "}
                              {notification.content.replace("@john ", "")}
                            </>
                          ) : (
                            `"${notification.content}"`
                          )}
                        </div>
                      )}
                    </div>

                    
                    {notification.isUnread && (
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2 transition-all duration-300 ease-out group-hover:scale-125 group-hover:bg-green-400"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div
          className={`p-4 sm:p-6 pt-4 border-t border-gray-800 flex-shrink-0 transition-all duration-500 ease-out ${
            isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 bg-[#404040] hover:bg-[#404040] text-white rounded-full py-3 font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:shadow-lg focus:outline-none text-sm sm:text-base"
            >
              Close
            </button>
            <button
              onClick={handleMarkAllAsRead}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-full py-3 font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg focus:outline-none text-sm sm:text-base"
            >
              <CheckCheck className="w-4 h-4 transition-all duration-300 ease-out" />
              <span className="hidden xs:inline">Mark all as read</span>
              <span className="xs:hidden">Mark all as read</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
