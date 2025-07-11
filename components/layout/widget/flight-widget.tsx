"use client"

import { Card } from "@/components/ui/card"
import { SizeSelector } from "@/components/common/button/size-selector"
import type { FlightData } from "@/lib/types/types"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer} from "recharts"
import { Plane } from "lucide-react"



interface FlightWidgetProps {
  data: FlightData[]
  selectedWidget: string | null
  selectedSize: "S" | "M" | "L"
  onWidgetSelect: (widgetId: string) => void
  onSizeChange: (size: "S" | "M" | "L") => void
}

export function FlightWidget({ data, selectedWidget, selectedSize, onWidgetSelect, onSizeChange }: FlightWidgetProps) {
  

  const extendedAirportData = [
    { name: "Murtala Mohammed International Airport", flights: "12,489 flights" },
    { name: "Nnamdi Azikiwe International Airport", flights: "934,483 flights" },
    { name: "Mallam Aminu Kano International Airport", flights: "10,722 flights" },
    { name: "Port Harcourt International Airport", flights: "9,823 flights" },
    { name: "Akanu Ibiam International Airport", flights: "489 flights" },
    { name: "Murtala Mohammed International Airport", flights: "88 flights" },
  ]

  const baseClasses = "bg-[#404040] rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-750 border-2"
  const selectedClasses = selectedWidget === "flight-widget" ? "border-[#F5F5F5]" : "border-transparent"

  return (
    <div className="max-w-md">
      <Card className={`${baseClasses} ${selectedClasses}`} onClick={() => onWidgetSelect("flight-widget")}>
        {/* Header  */}
       
          <div className="mb-4">
            <h3 className="text-[#F5F5F5] font-medium mb-1">Flight widget</h3>
            <p className="text-[#D4D4D4] font-light text-sm">
              View the weekly number of flights, categorized by international and domestic routes
            </p>
          </div>
   

        <div className="bg-[#171717] rounded-lg p-4 mb-4">
          {/* Header  */}
          {selectedSize === "S" || selectedSize === "L" && (
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#E0F2F1] rounded-full flex items-center justify-center">
                <Plane className="w-5 h-5 text-[#1E88E5] fill-[#1E88E5]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-[20px]">284,774</span>
                <span className="text-gray-400 text-[12px] font-medium">Flights</span>
              </div>
            </div>
          )}

          {/* Small Size*/}
          {selectedSize === "S" && (
            <div className="h-52">
              <ResponsiveContainer width="100%" height={192}>
                <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9CA3AF", fontSize: 12 }}
                    hide={selectedSize !== "S"}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9CA3AF", fontSize: 12 }}
                    tickFormatter={(value) => `${value / 1000}k`}
                    domain={[100000, 600000]}
                    hide={selectedSize !== "S"}
                  />
                  {selectedSize === "S" && (
                    <div className="flex gap-6 text-xs  border-t border-gray-700">
          <span className="text-teal-400 font-medium border-t-2 pt-6 border-teal-400 pb-1">
            International
          </span>
          <span className="text-gray-400 font-medium">Domestic</span>
        </div>
                  )}
                  <Bar dataKey="international" fill="#3B82F6" name="International" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="domestic" fill="#F59E0B" name="Domestic" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex gap-6 text-xs mt-2  border-t border-gray-700">
          <span className="text-teal-400 font-medium border-t-2 border-teal-400 pb-1">
            International
          </span>
          <span className="text-gray-400 font-medium">Domestic</span>
        </div>
            </div>
          )}

          {/* Medium Size  */}
          {selectedSize === "M" && (
            <div className="flex justify-center items-center w-full h-40">
              <img src="/assets/images/Card.png" alt="Flight Widget Card" className="rounded-xl object-cover w-full h-full max-w-md" />
            </div>
          )}

          {/* Large Size  */}
          {selectedSize === "L" && (
            <>
              <div className="h-40 mb-4">
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9CA3AF", fontSize: 12 }}
                      hide={selectedSize === "L"}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9CA3AF", fontSize: 12 }}
                      tickFormatter={(value) => `${value / 1000}k`}
                      domain={[100000, 600000]}
                      hide={selectedSize !== "L"}
                    />
                         {selectedSize === "L" && (
                    <div className="flex gap-6 text-xs  border-t border-gray-700">
          <span className="text-teal-400 font-medium border-t-2 pt-6 border-teal-400 pb-1">
            International
          </span>
          <span className="text-gray-400 font-medium">Domestic</span>
        </div>
                  )}
                  <Bar dataKey="international" fill="#3B82F6" name="International" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="domestic" fill="#F59E0B" name="Domestic" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {extendedAirportData.map((airport, index) => (
                  <div key={index} className="flex justify-between items-center text-xs py-1">
                    <span className="text-gray-300">{airport.name}</span>
                    <span className="text-white font-medium">{airport.flights}</span>
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
