"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DatePickerCalendarProps {
  isOpen: boolean
  onClose: () => void
  onApply: (date: Date) => void
}

export function DatePickerCalendar({ isOpen, onClose, onApply }: DatePickerCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 24)) // January 24, 2024
  const [selectedDate, setSelectedDate] = useState(24)
  const [isStartDate, setIsStartDate] = useState(true)

  if (!isOpen) return null

  const monthNames = [
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

  const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sat", "Su"]

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()


  const firstDay = new Date(year, month, 1)
  const firstDayOfWeek = (firstDay.getDay() + 6) % 7 

 
  const lastDay = new Date(year, month + 1, 0).getDate()


  const prevMonthLastDay = new Date(year, month, 0).getDate()


  const calendarDays = []


  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthLastDay - i,
      isCurrentMonth: false,
      isPrevMonth: true,
    })
  }


  for (let day = 1; day <= lastDay; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      isPrevMonth: false,
    })
  }


  const remainingDays = 42 - calendarDays.length
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      isPrevMonth: false,
    })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const handleApply = () => {
    const selectedFullDate = new Date(year, month, selectedDate)
    onApply(selectedFullDate)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#171717] rounded-2xl border border-gray-800 shadow-2xl w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-3">
          <button onClick={() => navigateMonth("prev")} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>

          <h3 className="text-[#FAFAFA] font-medium text-lg">
            {monthNames[month]} {year}
          </h3>

          <button onClick={() => navigateMonth("next")} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Date  */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsStartDate(true)}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                isStartDate ? "bg-[#525252] text-white" : "bg-[#525252] text-gray-400"
              }`}
            >
              Start date
            </button>
            <span className="text-gray-400">–</span>
            <button
              onClick={() => setIsStartDate(false)}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                !isStartDate ? "bg-[#525252] text-white" : "bg-[#525252] text-gray-400"
              }`}
            >
              End date
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="px-4">
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-[#FAFAFA]   text-sm font-medium py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((dateObj, index) => (
              <button
                key={index}
                onClick={() => dateObj.isCurrentMonth && setSelectedDate(dateObj.day)}
                className={`
                  aspect-square flex items-center justify-center text-sm  transition-colors cursor-pointer rounded-full
                  ${
                    dateObj.isCurrentMonth
                      ? dateObj.day === selectedDate
                        ? "bg-[#525252] text-white font-medium rounded-full"
                        : "text-white hover:bg-[#525252] rounded-full"
                      : "text-gray-500 rounded-full"
                  }
                  ${dateObj.day === 26 && !dateObj.isCurrentMonth && dateObj.isPrevMonth ? "relative" : ""}
                `}
                disabled={!dateObj.isCurrentMonth}
              >
                {dateObj.day}
               
                {dateObj.day === 26 && !dateObj.isCurrentMonth && dateObj.isPrevMonth && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 pt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-[#525252] hover:bg-[#525252] text-white rounded-full py-3 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-full py-3 font-medium transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
