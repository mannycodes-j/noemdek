'use client'

import { Card } from '@/components/ui/card'
import { SizeSelector } from '@/components/common/button/size-selector'
import { File } from 'lucide-react'
import Image from 'next/image'

interface ReportWidgetProps {
  selectedWidget: string | null
  selectedSize: 'S' | 'M' | 'L'
  onWidgetSelect: (widgetId: string) => void
  onSizeChange: (size: 'S' | 'M' | 'L') => void
}

export function ReportWidget({
  selectedWidget,
  selectedSize,
  onWidgetSelect,
  onSizeChange,
}: ReportWidgetProps) {
  const baseClasses =
    'bg-[#404040] rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-750 border-2'
  const selectedClasses =
    selectedWidget === 'report-widget'
      ? 'border-[#F5F5F5]'
      : 'border-transparent'

  const reportsWeek31 = [
    { commodity: 'PMS', dateRange: 'Aug 12-17' },
    { commodity: 'DPK', dateRange: 'Aug 12-17' },
    { commodity: 'AGO', dateRange: 'Aug 12-17' },
    { commodity: 'ICE', dateRange: 'Aug 12-17' },
    { commodity: 'LPG', dateRange: 'Aug 12-17' },
  ]

  const reportsWeek30 = [
    { commodity: 'PMS', dateRange: 'Aug 5-10' },
    { commodity: 'DPK', dateRange: 'Aug 5-10' },
    { commodity: 'AGO', dateRange: 'Aug 5-10' },
    { commodity: 'ICE', dateRange: 'Aug 5-10' },
    { commodity: 'LPG', dateRange: 'Aug 5-10' },
  ]

  const reportsWeek29 = [
    { commodity: 'PMS', dateRange: 'Jul 29-3' },
    { commodity: 'DPK', dateRange: 'Jul 29-3' },
    { commodity: 'AGO', dateRange: 'Jul 29-3' },
    { commodity: 'ICE', dateRange: 'Jul 29-3' },
    { commodity: 'LPG', dateRange: 'Jul 29-3' },
  ]

  const reportsWeek28 = [
    { commodity: 'PMS', dateRange: 'Jul 22-26' },
    { commodity: 'DPK', dateRange: 'Jul 22-26' },
    { commodity: 'AGO', dateRange: 'Jul 22-26' },
    { commodity: 'ICE', dateRange: 'Jul 22-26' },
  ]

 

  const ReportSection = ({
    title,
    reports,
    showAll = true,
  }: {
    title: string
    reports: any[]
    showAll?: boolean
  }) => (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-10 h-10 bg-[#E0F2F1] rounded-full flex items-center justify-center">
          <File className="w-7 h-7 text-white fill-[#26A69A]" />
        </div>
        <span className="text-white text-sm font-medium">{title}</span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {reports.slice(0, showAll ? reports.length : 5).map((report, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-2 hover:bg-gray-700 transition-colors cursor-pointer rounded"
          >
            <Image
              src="/assets/images/report-image.png"
              alt="Report"
              width={50}
              height={50}
              className="object-contain"
            />
            <div className="text-center mt-1">
              <div className="text-white text-xs font-medium">
                {report.commodity}
              </div>
              <div className="text-gray-400 text-xs">{report.dateRange}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="max-w-md">
      <Card
        className={`${baseClasses} ${selectedClasses}`}
        onClick={() => onWidgetSelect('report-widget')}
      >
        <div className="mb-4">
          <h3 className="text-[#F5F5F5] font-medium mb-1">Report widget</h3>
          <p className="text-[#D4D4D4] text-sm">
            Get comprehensive reports & insights
          </p>
        </div>

        <div className="bg-[#171717] rounded-lg p-4 mb-4">
          {/* Small Size */}
          {selectedSize === 'S' && (
            <>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#E0F2F1] rounded-full flex items-center justify-center">
                  <File className="w-7 h-7 text-white fill-[#26A69A]" />
                </div>
                <span className="text-white text-sm font-medium">
                  Reports - week 31
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {reportsWeek31.slice(0, 4).map((report, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-3 hover:bg-gray-800 transition-colors cursor-pointer rounded"
                  >
                    <Image
                      src="/assets/images/report-image.png"
                      alt="Report"
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                    <div className="text-center mt-2">
                      <div className="text-white text-sm font-medium">
                        {report.commodity}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {report.dateRange}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Medium Size */}
          {selectedSize === 'M' && (
            <div className="space-y-4">
              <ReportSection
                title="Reports - week 31"
                reports={reportsWeek31}
              />
              <ReportSection
                title="Reports - week 30"
                reports={reportsWeek30.slice(0, 1)}
                showAll={false}
              />
            </div>
          )}

          {/* Large Size */}
          {selectedSize === 'L' && (
            <div className="space-y-4 max-h-64 overflow-y-auto">
              <ReportSection
                title="Reports - week 31"
                reports={reportsWeek31}
              />
              <ReportSection
                title="Reports - week 30"
                reports={reportsWeek30}
              />
              <ReportSection
                title="Reports - week 29"
                reports={reportsWeek29}
              />
              <ReportSection
                title="Reports - week 28"
                reports={reportsWeek28}
              />
            </div>
          )}
        </div>

        <SizeSelector
          selectedSize={selectedSize}
          onSizeChange={onSizeChange}
          onClick={(e) => e.stopPropagation()}
        />
      </Card>
    </div>
  )
}
