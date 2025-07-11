"use client"

import { File } from "lucide-react"
import Image from "next/image";

export function ReportsWidget() {
  return (
    <div
      className="bg-[#171717] border border-gray-800 p-6"
      style={{
        width: "300px",
        height: "320px",
        borderRadius: "24px",
        opacity: 1,
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#E0F2F1] rounded-full flex items-center justify-center">
          <File className="w-7 h-7 text-white fill-[#26A69A]" />
        </div>
        <span className="text-white font-medium text-[12px] ">Reports - week 31</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "PMS - Aug 12-17", period: "Aug 12-17" },
          { name: "DPK - Aug 12-17", period: "Aug 12-17" },
          { name: "AGO - Aug 12-17", period: "Aug 12-17" },
          { name: "ICE - Aug 12-17", period: "Aug 12-17" },
        ].map((report) => (
          <div key={report.name} className=" rounded-lg p-0">
            <div className="w-full h-16 flex  items-center justify-center">
              <Image
                src="/assets/images/report-image.png" 
                alt="Report"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
            <p className="text-xs mt-2 text-gray-400 text-center">{report.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
