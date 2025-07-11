"use client"

import { Card } from "@/components/ui/card"
import { SizeSelector } from "@/components/common/button/size-selector"
import { ArrowUpRight } from "lucide-react"
import { IceWidget as DashboardIceWidget } from "@/components/layout/dashboard/ice-widget"

interface NewsWidgetProps {
  selectedWidget: string | null
  selectedSize: "S" | "M" | "L"
  onWidgetSelect: (widgetId: string) => void
  onSizeChange: (size: "S" | "M" | "L") => void
}

export function NewsWidget({ selectedWidget, selectedSize, onWidgetSelect, onSizeChange }: NewsWidgetProps) {
  const baseClasses = "bg-[#404040] rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-750 border-2"
  const selectedClasses = selectedWidget === "news-widget" ? "border-[#F5F5F5]" : "border-transparent"

  const newsItems = [
    {
      title: "Shareholders Enjoy a Massive Windfall as BP Expands Global Operations",
      description:
        "BP's latest dividend can expect a multi-billion-dollar payout this year after the oil giant reported better-than-expected quarterly earnings of almost $3.3 billion and set out a...",
      source: "Vanguard",
      thumbnail: "bp",
      category: "ICE",
    },
    {
      title: "Eni granted regulator consent for NAOC sales to Oando",
      description:
        "Eni granted regulator consent from the Nigerian Upstream Petroleum Regulatory Commission (NUPRC) for the sale of Nigerian Agip Oil Company (NAOC) to Oando...",
      source: "BusinessDay",
      thumbnail: "circular",
      category: "Oil",
    },
    {
      title: "General Electric to Secure SIDC-AI Interest in Nigeria from TotalEnergies",
      description:
        "General Electric disclosed that the interest in Nigeria from TotalEnergies has been secured through the Strategic Investment and Development Company...",
      source: "ThisDay",
      thumbnail: "rectangular",
      category: "Gas",
    },
  ]

  const forYouItem = {
    title:
      "Dangote Refinery Products Inferior to Imported Ones, Nigeria Can Rely On Them Alone To Avoid Monopoly - Nigerian Age...",
    description: "Dangote Refinery Advisory Committee (DRAC) has assured Nigerians against sub-st...",
    source: "Nigerian Age",
    thumbnail: "person",
  }

  return (
    <div className="max-w-md">
      <Card className={`${baseClasses} ${selectedClasses}`} onClick={() => onWidgetSelect("news-widget")}>
        <div className="mb-4">
          <h3 className="text-[#F5F5F5] font-medium mb-1">News widget</h3>
          <p className="text-[#D4D4D4] text-sm">Get the latest industry news and updates</p>
        </div>

        
          {/* Small Size */}
          <div className="mx-auto">
          {selectedSize === "S" && (
            <DashboardIceWidget />
          )}
          </div>
          

          {/* Medium Size  */}
          <div className="bg-[#171717] rounded-lg overflow-hidden mb-4">
          {selectedSize === "M" && (
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-500 text-sm font-medium">Top Stories</span>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </div>

              {/* News items */}
              <div className="space-y-4">
                {newsItems.slice(0, 2).map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-medium mb-1 leading-tight">{item.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed mb-1">{item.description}</p>
                      <div className="text-gray-500 text-xs">{item.source}</div>
                    </div>
                    <div className="w-12 h-12 bg-gray-700 rounded flex-shrink-0">
                      {item.thumbnail === "bp" ? (
                        <img src="/assets/images/bp-logo.png" alt="BP Logo" className="w-full h-full object-cover rounded" />
                      ) : (
                        <img src="/assets/images/news-fallback.png" alt="News Thumbnail" className="w-full h-full object-cover rounded-full" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Large Size */}
          {selectedSize === "L" && (
            <div className="p-4">
              {/* Top Stories Header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-500 text-sm font-medium">Top Stories</span>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </div>

              {/* Top Stories */}
              <div className="space-y-3 mb-4">
                {newsItems.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-medium mb-1 leading-tight">{item.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed mb-1">{item.description}</p>
                      <div className="text-gray-500 text-xs">{item.source}</div>
                    </div>
                    <div className="w-12 h-12 bg-gray-700 rounded flex-shrink-0">
                      {item.thumbnail === "bp" ? (
                        <img src="/assets/images/bp-logo.png" alt="BP Logo" className="w-full h-full object-cover rounded" />
                      ) : item.thumbnail === "circular" ? (
                        <img src="/assets/images/news-fallback.png" alt="News Thumbnail" className="w-full h-full object-cover rounded-full" />
                      ) : (
                        <img src="/assets/images/news-fallback.png" alt="News Thumbnail" className="w-full h-full object-cover rounded" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* For You*/}
              <div className="border-t border-gray-700 pt-3">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-green-500 text-sm font-medium">For You</span>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <h4 className="text-white text-sm font-medium mb-1 leading-tight">{forYouItem.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed mb-1">{forYouItem.description}</p>
                    <div className="text-gray-500 text-xs">{forYouItem.source}</div>
                  </div>
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex-shrink-0">
                  <img src="/assets/images/dangote.png" alt="News Thumbnail" className="w-full h-full object-cover rounded" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <SizeSelector selectedSize={selectedSize} onSizeChange={onSizeChange} onClick={(e) => e.stopPropagation()} />
      </Card>
    </div>
  )
}
