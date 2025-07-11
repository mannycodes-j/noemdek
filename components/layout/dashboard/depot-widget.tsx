"use client"

import { useState } from "react"
import { Triangle } from "lucide-react"
import dynamic from "next/dynamic"
import { getTimeSeriesData } from "@/lib/data/data"
import Image from "next/image"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

interface DepotData {
  name: string
  location: string
  price: string
  change: string
  chartData: any[]
}

const commodityTypes = ["PMS", "AGO", "DPK", "LPG"] as const
type CommodityType = (typeof commodityTypes)[number]

export function DepotWidget({ isSidebarCollapsed }: { isSidebarCollapsed: boolean }) {
  const [selectedCommodity, setSelectedCommodity] = useState<CommodityType>("PMS")

  const depots: DepotData[] = [
    {
      name: "NIPCO",
      location: "Lagos",
      price: "₦714.26",
      change: "+0.37",
      chartData: getTimeSeriesData(["Lagos"], selectedCommodity),
    },
    {
      name: "Oando PLC",
      location: "Rivers",
      price: "₦714.26",
      change: "+0.37",
      chartData: getTimeSeriesData(["Rivers"], selectedCommodity),
    },
    {
      name: "MRS Oil Nigeria P...",
      location: "Oyo",
      price: "₦714.26",
      change: "+0.37",
      chartData: getTimeSeriesData(["Oyo"], selectedCommodity),
    },
  ]

  function DepotChart({ data }: { data: any[] }) {
    const chartOptions = {
      chart: {
        type: "line" as const,
        height: 40,
        sparkline: {
          enabled: true,
        },
        toolbar: { show: false },
        background: "transparent",
      },
      stroke: {
        curve: "smooth" as const,
        width: 2,
      },
      colors: ["#10b981"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 90, 100],
        },
      },
      tooltip: {
        enabled: false,
      },
      grid: { show: false },
      xaxis: { type: "datetime" as const },
      yaxis: { show: false },
    }

    const series = [
      {
        name: "Price",
        data: data.slice(0, 20).map((item) => ({
          x: new Date(item.x).getTime(),
          y: item.y,
        })),
      },
    ]

    return (
      <div className="w-full h-10 sm:h-12 mb-1">
        <Chart options={chartOptions} series={series} type="area" height={40} />
      </div>
    )
  }

  const Width = isSidebarCollapsed ? "max-w-[610px]" : "max-w-[610px]"

  return (
    <div className={`bg-[#171717] rounded-3xl p-4 sm:p-6 border border-gray-800 w-full max-w-4xl h-auto ${Width} `}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 flex-shrink-0 mt-8">
        <Image
          src="/assets/images/depot_icon.png"
          alt="Depot"
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
        <span className="text-white font-semibold text-lg ">Depot</span>
      </div>

      {/* Depot List */}
      <div className="space-y-2 sm:space-y-2 flex-1 min-h-0 overflow-hidden">
        {depots.map((depot, index) => (
          <div key={index}>
          
            <div className="flex flex-col gap-2 sm:hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Triangle className="w-4 h-4 text-green-500 fill-green-500" />
                  <div>
                    <div className="text-white font-medium text-sm">{depot.name}</div>
                    <div className="text-gray-400 text-xs">{depot.location}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold text-sm">{depot.price}</div>
                  <div className="text-green-500 text-xs font-medium">{depot.change}</div>
                </div>
              </div>
              <div className="ml-6">
                <DepotChart data={depot.chartData} />
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden  sm:flex items-center justify-between gap-1 pt-2">
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 min-w-0">
                <Triangle className="w-4 h-4 text-green-500 flex-shrink-0 fill-green-500" />
                <div className="min-w-0">
                  <div className="text-white font-medium text-xs md:text-sm truncate">{depot.name}</div>
                  <div className="text-gray-400 text-xs truncate">{depot.location}</div>
                </div>
              </div>

              <div className="flex-1 mx-2 md:mx-4 min-w-0">
                <DepotChart data={depot.chartData} />
              </div>

              <div className="text-right flex-shrink-0 min-w-[60px] md:min-w-[80px]">
                <div className="text-white font-semibold text-xs md:text-sm">{depot.price}</div>
                <div className="text-green-500 text-xs font-medium">{depot.change}</div>
              </div>
            </div>

            <hr className="my-2 border-[#36353A] opacity-60" />
          </div>
        ))}
      </div>

      {/* Commodity Tabs */}
      <div className="relative mt-4 flex-shrink-0">
        <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide">
          {commodityTypes.map((commodity) => (
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
  )
}
