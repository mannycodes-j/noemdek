"use client"

import { Card } from "@/components/ui/card"
import { SizeSelector } from "@/components/common/button/size-selector"
import { AreaChart, Area, ResponsiveContainer } from "recharts"
import { getTimeSeriesData } from "@/lib/data/data"
import Image from "next/image"
import { useState } from "react"


const generateChartData = (trend: "up" | "down" | "neutral") => {
  if (trend === "up")
    return [
      { value: 650 },
      { value: 680 },
      { value: 690 },
      { value: 700 },
      { value: 710 },
      { value: 714 },
      { value: 720 },
      { value: 715 },
      { value: 714 },
      { value: 716 },
    ]
  if (trend === "down")
    return [
      { value: 750 },
      { value: 740 },
      { value: 730 },
      { value: 720 },
      { value: 710 },
      { value: 700 },
      { value: 690 },
      { value: 680 },
      { value: 670 },
      { value: 665 },
    ]
  return [
    { value: 700 },
    { value: 705 },
    { value: 698 },
    { value: 702 },
    { value: 699 },
    { value: 704 },
    { value: 701 },
    { value: 703 },
    { value: 700 },
    { value: 702 },
  ]
}

interface DepotWidgetProps {
  selectedWidget: string | null
  selectedSize: "S" | "M" | "L"
  onWidgetSelect: (widgetId: string) => void
  onSizeChange: (size: "S" | "M" | "L") => void
}

export function DepotWidget({ selectedWidget, selectedSize, onWidgetSelect, onSizeChange }: DepotWidgetProps) {
  const timeSeriesData = getTimeSeriesData(["Lagos"], "PMS")

  const commodities = ["PMS", "AGO", "DPK", "ICE", "LPG"]
  const activeCommodity = "PMS"
  const [selectedCommodity, setSelectedCommodity] = useState(commodities[0]);

  const depotDataMedium = [
    { name: "NIPCO", location: "Lagos", price: "₦714.26", change: "+0.37", trend: "up", symbol: "▲" },
    { name: "Oando PLC", location: "Lagos", price: "₦714.26", change: "", trend: "neutral", symbol: "●" },
    { name: "MRS Oil Nigeria P...", location: "Oyo", price: "₦714.26", change: "+0.37", trend: "up", symbol: "●" },
  ]

  const depotDataLarge = [
    { name: "Oando PLC", location: "Lagos", price: "₦714.26", change: "", trend: "up", symbol: "●" },
    { name: "NIPCO", location: "Lagos", price: "₦714.26", change: "", trend: "up", symbol: "●" },
    { name: "MRS Oil Nigeria P...", location: "Oyo", price: "₦714.26", change: "", trend: "up", symbol: "●" },
    { name: "Total Nigeria PLC", location: "Lagos", price: "₦714.26", change: "", trend: "down", symbol: "●" },
    { name: "Conoil PLC", location: "Lagos", price: "₦714.26", change: "", trend: "up", symbol: "●" },
    { name: "Ardova PLC", location: "Lagos", price: "₦714.26", change: "", trend: "up", symbol: "●" },
    { name: "Oando PLC", location: "Abuja", price: "₦714.26", change: "", trend: "up", symbol: "●" },
    { name: "MRS Oil Nigeria P...", location: "Lagos", price: "₦714.26", change: "", trend: "up", symbol: "●" },
  ]

  const baseClasses = "bg-[#404040] rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-750 border-2"
  const selectedClasses = selectedWidget === "depot-widget" ? "border-[#F5F5F5]" : "border-transparent"

  return (
    <div className="max-w-md">
      <Card className={`${baseClasses} ${selectedClasses}`} onClick={() => onWidgetSelect("depot-widget")}>
        {/* Header  */}
        
          <div className="mb-4">
            <h3 className="text-[#F5F5F5] font-medium mb-1">Depot widget</h3>
            <p className="text-[#D4D4D4] font-light text-sm">Monitor depot prices on a weekly basis</p>
          </div>


        <div className="bg-[#171717] rounded-lg p-4 mb-4">
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
            
        <Image
          src="/assets/images/depot_icon.png"
          alt="Depot"
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
        <span className="text-white font-semibold text-lg ">Depot</span>
              
            </div>
            {selectedSize === "S" && (
              <div className="text-right">
                <div className="text-green-500 text-sm font-medium">▲ NIPCO</div>
                <div className="text-gray-400 text-xs">Lagos</div>
              </div>
            )}
          </div>

          {/* Small Size  */}
          {selectedSize === "S" && (
            <>
              {/* Large chart */}
              <div className="h-20 mb-4">
                <ResponsiveContainer width="100%" height={80}>
                  <AreaChart data={generateChartData("up")}>
                    <defs>
                      <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#colorGreen)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Price and change */}
              <div className="flex items-end justify-between mb-4">
                <div className="text-white text-[35px] font-light ml-0 md:ml-20">₦714.26</div>
                <div className="text-right">
                  <div className="text-green-500 text-[12px]">+0.37</div>
                  <div className="text-green-500 text-[12px]">+0.09%</div>
                </div>
              </div>
            </>
          )}

          {/* Medium Size */}
          {selectedSize === "M" && (
            <div className="space-y-3 mb-4">
              {depotDataMedium.map((depot, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <span className={`text-sm ${depot.trend === "up" ? "text-green-500" : "text-gray-400"}`}>
                      {depot.symbol}
                    </span>
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">{depot.name}</div>
                      <div className="text-gray-400 text-xs">{depot.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-16 h-8">
                      <ResponsiveContainer width="100%" height={32}>
                        <AreaChart data={generateChartData(depot.trend as "up" | "down" | "neutral")}>
                          <defs>
                            <linearGradient
                              id={`color${depot.trend === "down" ? "Red" : "Green"}-${index}`}
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor={depot.trend === "down" ? "#ef4444" : "#10b981"}
                                stopOpacity={0.4}
                              />
                              <stop
                                offset="100%"
                                stopColor={depot.trend === "down" ? "#ef4444" : "#10b981"}
                                stopOpacity={0.1}
                              />
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke={depot.trend === "down" ? "#ef4444" : "#10b981"}
                            strokeWidth={2}
                            fill={`url(#color${depot.trend === "down" ? "Red" : "Green"}-${index})`}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm font-medium">{depot.price}</div>
                      {depot.change && <div className="text-green-500 text-xs">{depot.change}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Large Size  */}
          {selectedSize === "L" && (
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {depotDataLarge.map((depot, index) => (
                <div key={index} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-gray-400 text-sm">{depot.symbol}</span>
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">{depot.name}</div>
                      <div className="text-gray-400 text-xs">{depot.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-6">
                      <ResponsiveContainer width="100%" height={24}>
                        <AreaChart data={generateChartData(depot.trend as "up" | "down" | "neutral")}>
                          <defs>
                            <linearGradient
                              id={`color${depot.trend === "down" ? "Red" : "Green"}-${index}`}
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor={depot.trend === "down" ? "#ef4444" : "#10b981"}
                                stopOpacity={0.4}
                              />
                              <stop
                                offset="100%"
                                stopColor={depot.trend === "down" ? "#ef4444" : "#10b981"}
                                stopOpacity={0.1}
                              />
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke={depot.trend === "down" ? "#ef4444" : "#10b981"}
                            strokeWidth={2}
                            fill={`url(#color${depot.trend === "down" ? "Red" : "Green"}-${index})`}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm font-medium">{depot.price}</div>
                      {depot.change && <div className="text-green-500 text-xs">{depot.change}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Commodity tabs */}
          <div className="relative mt-4 flex-shrink-0">
            <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide">
              {commodities.map((commodity) => (
                <button
                  key={commodity}
                  onClick={() => setSelectedCommodity(commodity)}
                  className={`relative px-0 py-2 text-xs focus-outline-none font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                    commodity === selectedCommodity ? "text-teal-400" : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {commodity === selectedCommodity && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-teal-400"></div>
                  )}
                  {commodity}
                </button>
              ))}
            </div>
          </div>
        </div>

        <SizeSelector selectedSize={selectedSize} onSizeChange={onSizeChange} onClick={(e) => e.stopPropagation()} />
      </Card>
    </div>
  )
}
