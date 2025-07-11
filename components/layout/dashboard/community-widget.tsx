"use client"

import { Triangle } from "lucide-react"
import { getTimeSeriesData } from "@/lib/data/data"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from "chart.js"

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler)

interface CommodityData {
  symbol: string
  name: string
  price: string
  change: string
  isPositive: boolean
  chartData: any[]
}

const commodities: CommodityData[] = [
  {
    symbol: "PMS",
    name: "Premium Motor Spirit",
    price: "₦714.26",
    change: "+0.37",
    isPositive: true,
    chartData: getTimeSeriesData(["Lagos", "Abuja"], "PMS"),
  },
  {
    symbol: "AGO",
    name: "Automotive Gas Oil",
    price: "₦1249.06",
    change: "-9.01",
    isPositive: false,
    chartData: getTimeSeriesData(["Lagos", "Abuja"], "AGO"),
  },
  {
    symbol: "ICE",
    name: "ICE Brent Crude",
    price: "₦0.00",
    change: "0.00",
    isPositive: true,
    chartData: getTimeSeriesData(["Lagos", "Abuja"], "DPK"),
  },
  {
    symbol: "DPK",
    name: "Dual Purpose Kerosene",
    price: "₦1088.92",
    change: "-50.90",
    isPositive: false,
    chartData: getTimeSeriesData(["Lagos", "Abuja"], "DPK"),
  },
]

function MiniChart({ data, isPositive }: { data: any[]; isPositive: boolean }) {
  const chartData = {
    labels: data.map((item) => item.x),
    datasets: [
      {
        label: "Price",
        data: data.map((item) => item.y),
        borderColor: isPositive ? "#10b981" : "#ef4444",
        backgroundColor: isPositive ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    elements: { line: { borderWidth: 2 } },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  }

  return (
    <div className="w-full h-16">
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}

export function CommodityWidget() {
  return (
    <div className="bg-[#171717] rounded-3xl p-4 sm:p-6 border border-gray-800 w-full max-w-4xl h-auto ">
      <div className="space-y-4 sm:space-y-2">
        {commodities.map((commodity, index) => (
          <div key={commodity.symbol}>
            {/* Mobile View */}
            <div className="flex flex-row items-center justify-between gap-2 sm:hidden py-2">
              <div className="flex items-center gap-2 min-w-[90px]">
                <Triangle
                  className={`w-4 h-4 ${commodity.isPositive ? "text-green-500" : "text-red-500 rotate-180"}`}
                />
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-base">{commodity.symbol}</span>
                  <span className="text-gray-400 text-xs">{commodity.name}</span>
                </div>
              </div>

              <div className="flex-1 flex justify-center">
                <div className="w-20">
                  <MiniChart data={commodity.chartData} isPositive={commodity.isPositive} />
                </div>
              </div>

              <div className="text-right min-w-[70px]">
                <div className="text-white font-semibold text-base">{commodity.price}</div>
                <div
                  className={`text-xs font-medium ${
                    commodity.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {commodity.change}
                </div>
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:flex items-center justify-between py-2">
              <div className="flex items-center gap-3 min-w-[150px]">
                <Triangle
                  className={`w-4 h-4 ${
                    commodity.isPositive ? "text-green-500 fill-green-500" : "text-red-500 fill-red-500 rotate-180"
                  }`}
                />
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-lg">{commodity.symbol}</span>
                  <span className="text-gray-400 text-sm">{commodity.name}</span>
                </div>
              </div>

              <div className="flex-1 flex justify-center">
                <div className="w-32">
                  <MiniChart data={commodity.chartData} isPositive={commodity.isPositive} />
                </div>
              </div>

              <div className="text-right min-w-[100px]">
                <div className="text-white font-semibold text-lg">{commodity.price}</div>
                <div
                  className={`text-sm font-medium ${
                    commodity.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {commodity.change}
                </div>
              </div>
            </div>

            {index !== commodities.length - 1 && (
              <hr className="my-2 border-[#36353A] opacity-60" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
