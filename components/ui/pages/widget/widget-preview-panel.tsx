"use client"

import { Button } from "@/components/common/button/button"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { useRouter } from "next/navigation"


const generateSampleData = () =>
  Array.from({ length: 10 }, (_, i) => ({
    x: i,
    value: Math.random() * 100,
  }))

interface WidgetPreviewPanelProps {
  selectedWidget: string | null
  selectedSize: "S" | "M" | "L"
  onDone: () => void
}

export function WidgetPreviewPanel({ selectedWidget, selectedSize, onDone }: WidgetPreviewPanelProps) {
  const router = useRouter();
  const chartOptions = {
    chart: {
      type: "line" as const,
      height: 48,
      sparkline: { enabled: true },
      background: "transparent",
      toolbar: { show: false },
    },
    stroke: { curve: "smooth" as const, width: 2 },
    grid: { show: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { show: false } },
    tooltip: { enabled: false },
  }

  return (
    <div className="w-[400px] bg-[#262626] p-6 flex flex-col">
      <div className="flex">
       
        <div className="flex items-center justify-center min-h-[200px]">
          <img src="/assets/images/widget-panel.png" alt="Widget Preview" className="rounded-lg object-cover w-full max-w-xs" />
        </div>
      </div>
      
      <Button
        className="w-[200px] mx-auto bg-[#525252] rounded-full hover:bg-gray-600 text-white cursor-pointer"
        onClick={() => router.push("/")}
      >
        Done
      </Button>
    </div>
  )
}
