"use client"

import { Card } from "@/components/ui/card"
import { SizeSelector } from "@/components/common/button/size-selector"
import { ArrowRightLeft } from "lucide-react"
import { useState } from "react"

interface ExchangeRateWidgetProps {
  selectedWidget: string | null
  selectedSize: "S" | "M" | "L"
  onWidgetSelect: (widgetId: string) => void
  onSizeChange: (size: "S" | "M" | "L") => void
}

export function ExchangeRateWidget({
  selectedWidget,
  selectedSize,
  onWidgetSelect,
  onSizeChange,
}: ExchangeRateWidgetProps) {
  const baseClasses = "bg-[#404040] rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-750 border-2"
  const selectedClasses = selectedWidget === "exchange-rate-widget" ? "border-[#F5F5F5]" : "border-transparent"

  const historicalData = [
    { rate: "₦1493", date: "15 Feb, 2024" },
    { rate: "₦1493", date: "15 Feb, 2024" },
    { rate: "₦1493", date: "15 Feb, 2024" },
    { rate: "₦1493", date: "15 Feb, 2024" },
    { rate: "₦1493", date: "15 Feb, 2024" },
    { rate: "₦1493", date: "15 Feb, 2024" },
  ]

  const extendedHistoricalData = [
    { rate: "₦1493", date: "15 Feb, 2024" },
    { rate: "₦1493", date: "15 Feb, 2024" },
    { rate: "₦1493", date: "15 Feb, 2024" },
    { rate: "₦1493", date: "15 Feb, 2024" },
  ]

  const rateTypes = ["Official rate", "Black market"];
  const [selectedRateType, setSelectedRateType] = useState(rateTypes[0]);

  return (
    <div className="max-w-md">
      <Card className={`${baseClasses} ${selectedClasses}`} onClick={() => onWidgetSelect("exchange-rate-widget")}>
        <div className="mb-4">
          <h3 className="text-[#F5F5F5] font-medium mb-1">Exchange rate</h3>
          <p className="text-[#D4D4D4] text-sm">Get updates on new prices of dollar</p>
        </div>

        <div className="bg-[#171717] rounded-lg p-4 mb-4">
          {/* Small Size */}
          {selectedSize === "S" && (
            <>
              {/* Header  */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 text-teal-500 bg-[#262626] rounded-full flex items-center justify-center">
                  <ArrowRightLeft className="w-5 h-5" />
                </div>
                <span className="text-gray-300 text-sm">Exchange rate</span>
              </div>

              {/* Currency and Rate */}
              <div className="mb-6">
                <div className="text-gray-400 text-sm mb-2">Naira (₦)</div>
                <div className="text-white text-4xl font-bold">1544.71</div>
              </div>

              {/* Rate Type Tabs */}
              <div className="relative mt-4 flex-shrink-0">
                <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide">
                  {rateTypes.map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSelectedRateType(rate)}
                      className={`relative px-0 py-2 text-xs focus-outline-none font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                        rate === selectedRateType ? "text-teal-400" : "text-gray-400 hover:text-gray-300"
                      }`}
                    >
                      {rate === selectedRateType && (
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-teal-400"></div>
                      )}
                      {rate}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Medium Size */}
          {selectedSize === "M" && (
            <div className="flex gap-4">
             
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 text-teal-500">
                    <ArrowRightLeft className="w-5 h-5" />
                  </div>
                  <span className="text-gray-300 text-sm">Exchange rate</span>
                </div>

                <div className="mb-4">
                  <div className="text-gray-400 text-sm mb-1">Naira (₦)</div>
                  <div className="text-white text-2xl font-bold">1544.71</div>
                </div>

                <div className="flex gap-1">
                <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide">
                  {rateTypes.map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSelectedRateType(rate)}
                      className={`relative px-0 py-2 text-xs focus-outline-none font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                        rate === selectedRateType ? "text-teal-400" : "text-gray-400 hover:text-gray-300"
                      }`}
                    >
                      {rate === selectedRateType && (
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-teal-400"></div>
                      )}
                      {rate}
                    </button>
                  ))}
                </div>
                </div>
              </div>

              
              <div className="flex-1">
                <div className="space-y-1">
                  {historicalData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-xs py-1">
                      <span className="text-white font-medium">{item.rate}</span>
                      <span className="text-gray-400">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Large Size  */}
          {selectedSize === "L" && (
            <>
             
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 text-teal-500">
                  <ArrowRightLeft className="w-5 h-5" />
                </div>
                <span className="text-gray-300 text-sm">Exchange rate</span>
              </div>

              {/* Currency and Rate */}
              <div className="mb-4">
                <div className="text-gray-400 text-sm mb-1">Naira (₦)</div>
                <div className="text-white text-3xl font-bold">1544.71</div>
              </div>

              {/* Rate Type Tabs */}
              <div className="flex gap-1 mb-4">
              <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide">
                  {rateTypes.map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSelectedRateType(rate)}
                      className={`relative px-0 py-2 text-xs focus-outline-none font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                        rate === selectedRateType ? "text-teal-400" : "text-gray-400 hover:text-gray-300"
                      }`}
                    >
                      {rate === selectedRateType && (
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-teal-400"></div>
                      )}
                      {rate}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extended Historical Data */}
              <div className="space-y-2">
                {extendedHistoricalData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm py-1">
                    <span className="text-white font-medium">{item.rate}</span>
                    <span className="text-gray-400">{item.date}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <SizeSelector selectedSize={selectedSize} onSizeChange={onSizeChange} onClick={(e) => e.stopPropagation()} />
      </Card>
    </div>
  )
}
