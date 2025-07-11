"use client"

import { useState } from "react"
import { EditWidgetSidebar } from "@/components/layout/edit-widget-sedebar"  
import { WidgetPreviewPanel } from "./widget-preview-panel"
import { RetailWidgets } from "@/components/layout/widget/retail-widget"
import { FlightWidget } from "@/components/layout/widget/flight-widget"
import { DepotWidget } from "@/components/layout/widget/depot-widget"
import { NewsWidget } from "@/components/layout/widget/news-widget"
import { ReportWidget } from "@/components/layout/widget/report-widget"
import { ExchangeRateWidget } from "@/components/layout/widget/exchange-rate-widget"
import { widgetOptions, flightData, sidebarItems } from "@/lib/data/data"
import dynamic from "next/dynamic"

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

export function EditWidgetPage() {
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<"S" | "M" | "L">("M")
  const [activeSidebarItem, setActiveSidebarItem] = useState("product-retail-price")

  const handleDone = () => {
    // Handle widget selection completion
    console.log("Selected widget:", selectedWidget, "Size:", selectedSize)
  }

  const renderMainContent = () => {
    switch (activeSidebarItem) {
      case "product-retail-price":
        return (
          <RetailWidgets
            options={widgetOptions}
            selectedWidget={selectedWidget}
            onWidgetSelect={setSelectedWidget}
          />
        )

      case "flight-widget":
        return (
          <FlightWidget
            data={flightData}
            selectedWidget={selectedWidget}
            selectedSize={selectedSize}
            onWidgetSelect={setSelectedWidget}
            onSizeChange={setSelectedSize}
          />
        )

      case "depot-widget":
        return (
          <DepotWidget
            selectedWidget={selectedWidget}
            selectedSize={selectedSize}
            onWidgetSelect={setSelectedWidget}
            onSizeChange={setSelectedSize}
          />
        )

      case "news-widget":
        return (
          <NewsWidget
            selectedWidget={selectedWidget}
            selectedSize={selectedSize}
            onWidgetSelect={setSelectedWidget}
            onSizeChange={setSelectedSize}
          />
        )

      case "report-widget":
        return (
          <ReportWidget
            selectedWidget={selectedWidget}
            selectedSize={selectedSize}
            onWidgetSelect={setSelectedWidget}
            onSizeChange={setSelectedSize}
          />
        )

      case "exchange-rate":
        return (
          <ExchangeRateWidget
            selectedWidget={selectedWidget}
            selectedSize={selectedSize}
            onWidgetSelect={setSelectedWidget}
            onSizeChange={setSelectedSize}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#262626] text-white flex flex-col md:flex-row">
      
      <div className="w-full md:w-auto">
        <EditWidgetSidebar items={sidebarItems} activeItem={activeSidebarItem} onItemSelect={setActiveSidebarItem} />
      </div>

     
      <div className="flex-1 p-4 md:p-8 order-2 md:order-none">
        <div className="max-w-6xl mx-auto">{renderMainContent()}</div>
      </div>

      
      <div className="w-full md:w-auto order-3 md:order-none mt-4 md:mt-0 flex-shrink-0">
        <WidgetPreviewPanel selectedWidget={selectedWidget} selectedSize={selectedSize} onDone={handleDone} />
      </div>
    </div>
  )
}
