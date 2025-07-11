"use client"

import { Plane } from "lucide-react"
import dynamic from "next/dynamic"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const chartData = [
  { period: "24 Jan", international: 40, domestic: 25 },
  { period: "31 Jan", international: 35, domestic: 30 },
  { period: "7 Feb", international: 80, domestic: 45 },
  { period: "14 Feb", international: 70, domestic: 40 },
]

const airports = [
  { name: "Murtala Muhammed I...", flights: "12,489 flights" },
  { name: "Nnamdi Azikiwe Inter...", flights: "934,483 flights" },
  { name: "Mallam Aminu Kano I...", flights: "10,722 flights" },
  { name: "Port Harcourt Interna...", flights: "9,823 flights" },
  { name: "Akanu Ibiam Internati...", flights: "489 flights" },
  { name: "Muritala Mohamm...", flights: "89 flights" },
]

export function FlightWidget({ isSidebarCollapsed }: { isSidebarCollapsed: boolean }) {
  const chartOptions = {
    chart: {
      type: "bar" as const,
      height: 200,
      toolbar: { show: false },
      background: "transparent",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 4,
        endingShape: "rounded",
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: chartData.map((item) => item.period),
      labels: {
        style: { colors: "#9CA3AF", fontSize: "12px" },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      opposite: true,
      labels: {
        style: { colors: "#A0AEC0" },
        formatter: (val: number) => `${val}k`,
      },
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (val: number) => val + "k flights" },
    },
    fill: { opacity: 1 },
    colors: ["#3B82F6", "#F59E0B"],
    grid: {
      borderColor: "#374151",
      strokeDashArray: 3,
    },
    legend: { show: false },
  }

  const series = [
    {
      name: "International",
      data: chartData.map((item) => item.international),
    },
    {
      name: "Domestic",
      data: chartData.map((item) => item.domestic),
    },
  ]

  
  const leftWidth = isSidebarCollapsed ? "w-[60%]" : "w-[50%]";
  const rightWidth = isSidebarCollapsed ? "w-[45%]" : "w-[45%]";

  return (
    <div className="flex flex-row sm:flex-row rounded-xl overflow-hidden border border-gray-800 h-auto md:h-[320px]  mr-0 md:mr-52">
      {/* Left side */}
      <div className={`bg-[#171717] p-4  flex flex-col justify-between ${leftWidth}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#E0F2F1] rounded-full flex items-center justify-center">
            <Plane className="w-5 h-5 text-[#1E88E5] fill-[#1E88E5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-[20px]">284,774</span>
              <span className="text-gray-400 text-[12px] font-medium">Flights</span>
            </div>
          </div>
        </div>

        <Chart options={chartOptions} series={series} type="bar" height={200} className="mt-[-15px]" />

        <div className="flex gap-6 text-xs mt-2  border-t border-gray-700">
          <span className="text-teal-400 font-medium border-t-2 border-teal-400 pb-1">
            International
          </span>
          <span className="text-gray-400 font-medium">Domestic</span>
        </div>
      </div>

      {/* Right side */}
      <div className={`bg-[#2E2E2E] rounded-r-xl py-6 px-4 space-y-6 overflow-y-auto overflow-x-hidden ${rightWidth}`}>
        {airports.map((airport, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-white  truncate pr-2">{airport.name}</span>
            <span className="text-gray-400 whitespace-nowrap">{airport.flights}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
