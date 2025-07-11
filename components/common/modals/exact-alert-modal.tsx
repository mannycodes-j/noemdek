"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, ChevronDown, ChevronUp } from "lucide-react"
import { DatePickerCalendar } from "../../layout/dashboard/date-picker-calendar"
import { Toaster } from 'react-hot-toast';
import { showSuccessToast } from "../toast/toaster"


interface ExactAlertModalProps {
  isOpen: boolean
  onClose: () => void
}

const commodities = [
  { value: "PMS", label: "PMS", fullName: "Premium Motor Spirit" },
  { value: "AGO", label: "AGO", fullName: "Automotive Gas Oil" },
  { value: "DPK", label: "DPK", fullName: "Dual Purpose Kerosene" },
  { value: "ICE", label: "ICE", fullName: "ICE Brent Crude" },
  { value: "LPG", label: "LPG", fullName: "Liquefied Petroleum Gas" },
]

const conditions = [
  { value: "crossing-up", label: "Crossing up" },
  { value: "crossing-down", label: "Crossing down" },
]


export function ExactAlertModal({ isOpen, onClose }: ExactAlertModalProps) {
  const [commodity, setCommodity] = useState("PMS")
  const [condition, setCondition] = useState("crossing-up")
  const [price, setPrice] = useState("714.25")
  const [triggerType, setTriggerType] = useState<"once" | "every">("once")
  const [alertName, setAlertName] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 1, 16, 9, 0))
  const [showCommodityDropdown, setShowCommodityDropdown] = useState(false)
  const [showConditionDropdown, setShowConditionDropdown] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)

  
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      requestAnimationFrame(() => {
        setTimeout(() => setIsAnimating(true), 30)
      })
    } else {
      setIsAnimating(false)
      setTimeout(() => setShouldRender(false), 400)
    }
  }, [isOpen])


  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onClose()
    }, 400)
  }


  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!shouldRender) return null

  const selectedCommodity = commodities.find((c) => c.value === commodity)
  const selectedCondition = conditions.find((c) => c.value === condition)
  const alertDescription = `${commodity} ${selectedCondition?.label.toLowerCase()} ${price}`

  const formatDate = (date: Date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    const month = months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")

    return `${month} ${day}, ${year} at ${hours}:${minutes}`
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isAnimating ? "bg-black/80 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none"
        }`}
        onClick={handleBackdropClick}
      >
        <div className="relative w-full max-w-[480px] max-h-[90vh] mx-auto">
          <div
            className={`bg-[#171717] border border-gray-800 shadow-2xl flex flex-col transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] transform ${
              isAnimating ? "translate-y-0 opacity-100 scale-100" : "-translate-y-12 opacity-0 scale-95"
            }`}
            style={{
              borderRadius: "16px",
              borderWidth: "1px",
              height: "min(640px, 90vh)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="flex items-center justify-between p-4 sm:p-6 pb-1 flex-shrink-0 ">
              <h2 className="text-lg sm:text-xl font-medium text-white">Set an alert</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-all duration-300 ease-out hover:scale-110 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

           
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-6">
             
              <div className="space-y-3">
                <div className="text-[15px] text-[#A3A3A3]">Condition</div>

               
                <div className="relative ml-20">
                  <button
                    onClick={() => setShowCommodityDropdown(!showCommodityDropdown)}
                    className="w-full bg-[#404040] hover:bg-[#404040] rounded-full px-5 py-3 text-left flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.02] focus:outline-none"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-white font-medium">{commodity}</span>
                      <span className="text-gray-400 text-sm truncate">{selectedCommodity?.fullName}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        showCommodityDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showCommodityDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-[#404040] rounded-xl border border-gray-600 shadow-xl z-10 animate-in slide-in-from-top-2 duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
                      {commodities.map((item) => (
                        <button
                          key={item.value}
                          onClick={() => {
                            setCommodity(item.value)
                            setShowCommodityDropdown(false)
                          }}
                          className="w-full px-5 py-3 text-left hover:bg-gray-600 first:rounded-t-xl last:rounded-b-xl flex items-center justify-between transition-all duration-300 ease-out hover:scale-[1.02] focus:outline-none"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-white font-medium">{item.label}</span>
                            <span className="text-gray-400 text-sm truncate">{item.fullName}</span>
                          </div>
                          {commodity === item.value && (
                            <div className="w-3 h-3 text-teal-400 flex-shrink-0 transition-all duration-300 ease-out">
                              ✓
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Condition Dropdown */}
                <div className="relative ml-20">
                  <button
                    onClick={() => setShowConditionDropdown(!showConditionDropdown)}
                    className="w-full bg-[#404040] hover:bg-[#404040] rounded-full px-5 py-3 text-left flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.02] focus:outline-none"
                  >
                    <span className="text-white font-medium">{selectedCondition?.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        showConditionDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showConditionDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-[#404040] rounded-xl border border-gray-600 shadow-xl z-10 animate-in slide-in-from-top-2 duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
                      {conditions.map((item) => (
                        <button
                          key={item.value}
                          onClick={() => {
                            setCondition(item.value)
                            setShowConditionDropdown(false)
                          }}
                          className="w-full px-5 py-3 text-left hover:bg-gray-600 first:rounded-t-xl last:rounded-b-xl flex items-center justify-between transition-all duration-300 ease-out hover:scale-[1.02] focus:outline-none"
                        >
                          <span className="text-white font-medium">{item.label}</span>
                          {condition === item.value && (
                            <div className="w-3 h-3 text-teal-400 transition-all duration-300 ease-out">✓</div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Input */}
                <div className="flex items-center gap-4">
                  <div className="text-gray-400 text-base flex-shrink-0 ml-20">Price:</div>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-[#404040] rounded-full px-5 py-3 text-white font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/50 pr-12 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#404040]"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col">
                      <button
                        onClick={() => setPrice((Number.parseFloat(price) + 0.01).toFixed(2))}
                        className="text-gray-400 hover:text-white p-0.5 transition-all duration-300 ease-out hover:scale-125 focus:outline-none"
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setPrice((Number.parseFloat(price) - 0.01).toFixed(2))}
                        className="text-gray-400 hover:text-white p-0.5 transition-all duration-300 ease-out hover:scale-125 focus:outline-none"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>


              <div className="h-px bg-gray-700"></div>

              
              <div className="space-y-2">
                <div className="text-[15px] text-[#A3A3A3]">Trigger</div>

              
                <div className="bg-[#171717] border-2 rounded-2xl border-[#404040]]  p-1 flex ml-20">
                  <button
                    onClick={() => setTriggerType("once")}
                    className={`flex-1 py-2 px-5 ml-1 rounded-[10px] text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:outline-none ${
                      triggerType === "once"
                        ? "bg-[#404040] text-white shadow-lg transform scale-105"
                        : "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    Only once
                  </button>
                  <button
                    onClick={() => setTriggerType("every")}
                    className={`flex-1 py-2 px-5 mr-1 rounded-[10px] text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:outline-none ${
                      triggerType === "every"
                        ? "bg-[#404040] text-white shadow-lg transform scale-105"
                        : "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    Every time
                  </button>
                </div>

                <div className="text-gray-400 text-sm leading-relaxed">
                  {triggerType === "once"
                    ? "The alert will only trigger once and will not be repeated"
                    : "The alert will trigger every time the condition is met"}
                </div>
              </div>

              
              <div className="space-y-4 flex flex-row justify-between items-center text-center">
                <div className="text-[15px] text-[#A3A3A3]">Expiration</div>

                <div className="relative">
                  <button
                    onClick={() => setShowDatePicker(true)}
                    className="w-full text-left flex items-center justify-between py-2 hover:text-gray-300 transition-all duration-300 ease-out focus:outline-none"
                  >
                    <span className="text-white">{formatDate(selectedDate)}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              
              <div className="h-px bg-gray-700"></div>

              {/* Alert Name Section */}
              <div className="space-y-4">
                <div className="text-[15px] text-[#A3A3A3]">Alert name</div>

                <input
                  type="text"
                  placeholder="Name your alert"
                  value={alertName}
                  onChange={(e) => setAlertName(e.target.value)}
                  className="w-[75%] ml-20 bg-[#404040] rounded-full px-5 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#404040]"
                />

                <div className="bg-[#404040] ml-20 rounded-t-2xl px-5 py-6 transition-all duration-300 ease-out hover:bg-[#404040]">
                  <div className="text-white">{alertDescription}</div>
                </div>
              </div>

              
              <div className="h-4"></div>
            </div>

           
            <div className="flex-shrink-0 p-4 sm:p-6 pt-4 border-t border-gray-800">
              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 bg-[#525252] hover:bg-[#525252] text-white rounded-full py-3 font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:shadow-lg focus:outline-none text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log("Alert created:", {
                      commodity,
                      condition,
                      price,
                      triggerType,
                      alertName,
                      description: alertDescription,
                      expirationDate: selectedDate,
                    })
                    showSuccessToast();
                    handleClose()
                  }}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-full py-3 font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:shadow-lg focus:outline-none text-sm sm:text-base"
                >
                  Create alert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date Picker Modal */}
      <DatePickerCalendar isOpen={showDatePicker} onClose={() => setShowDatePicker(false)} onApply={handleDateSelect} />
      <Toaster position="top-right" />
    </>
  )
}
