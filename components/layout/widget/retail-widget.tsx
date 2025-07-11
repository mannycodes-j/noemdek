'use client'

import { Card } from '@/components/ui/card'
import { SizeSelector } from '@/components/common/button/size-selector'
import type { WidgetOption } from '@/lib/types/types'
// import { LineChart, Line, AreaChart, Area, XAxis, ResponsiveContainer } from "recharts"
import { getTimeSeriesData } from '@/lib/data/data'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from 'chart.js'
import React, { useState } from 'react'
import { Triangle } from 'lucide-react'

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
)

const generateTimeSeriesData = () => [
  { name: 'MON', value: 680 },
  { name: 'TUE', value: 690 },
  { name: 'WED', value: 710 },
  { name: 'THU', value: 705 },
  { name: 'FRI', value: 714 },
  { name: 'SAT', value: 720 },
  { name: 'SUN', value: 716 },
]

interface RetailWidgetsProps {
  options: WidgetOption[]
  selectedWidget: string | null
  selectedSize: 'S' | 'M' | 'L'
  onWidgetSelect: (widgetId: string) => void
  onSizeChange: (size: 'S' | 'M' | 'L') => void
}

export function RetailWidgets({
  options,
  selectedWidget,
  onWidgetSelect,
}: Omit<RetailWidgetsProps, 'selectedSize' | 'onSizeChange'>) {
  const [widgetSizes, setWidgetSizes] = useState<{
    [id: string]: 'S' | 'M' | 'L'
  }>(() => Object.fromEntries(options.map((opt) => [opt.id, 'S'])))

  const handleSizeChange = (widgetId: string, size: 'S' | 'M' | 'L') => {
    setWidgetSizes((prev) => ({ ...prev, [widgetId]: size }))
  }

  const timeSeriesData = getTimeSeriesData(['Lagos'], 'PMS')

  const getChartOptions = (size: 'S' | 'M' | 'L') => {
    return {
      chart: {
        type: 'line' as const,
        height: size === 'S' ? 60 : size === 'M' ? 100 : 140,
        sparkline: { enabled: size === 'S' },
        background: 'transparent',
        toolbar: { show: false },
      },
      stroke: { curve: 'smooth' as const, width: 2, colors: ['#10b981'] },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.1,
          stops: [0, 100],
          colorStops: [
            { offset: 0, color: '#10b981', opacity: 0.3 },
            { offset: 100, color: '#10b981', opacity: 0.1 },
          ],
        },
      },
      grid: { show: size !== 'S', borderColor: '#374151', strokeDashArray: 1 },
      xaxis: {
        labels: {
          show: size === 'L',
          style: { colors: '#9CA3AF', fontSize: '10px' },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          show: size === 'L',
          style: { colors: '#9CA3AF', fontSize: '10px' },
        },
      },
      tooltip: { enabled: false },
    }
  }

  const chartSeries = [
    { name: 'PMS', data: timeSeriesData.slice(-10).map((item) => item.y) },
  ]

  const baseClasses =
    'bg-[#404040] rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-750 border-2'

  const renderWidget = (option: WidgetOption) => {
    const selectedClasses =
      selectedWidget === option.id ? 'border-[#F5F5F5]' : 'border-transparent'
    const selectedSize = widgetSizes[option.id] || 'S'

    switch (option.type) {
      case 'retail':
        return (
          <Card
            key={option.id}
            className={`${baseClasses} ${selectedClasses}`}
            onClick={() => onWidgetSelect(option.id)}
          >
            <div className="mb-4">
              <h3 className="text-[#F5F5F5] font-medium mb-1">
                {option.title}
              </h3>
              <p className="text-[#D4D4D4] font-light text-sm">
                {option.description}
              </p>
            </div>

            <div className="bg-[#171717] rounded-lg p-4 mb-4">
              {/* Small Size (S) */}
              {selectedSize === 'S' && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Triangle className="w-4 h-4 text-green-500 fill-green-500" />
                      <span className="text-green-500 text-sm font-medium">
                        PMS
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-green-500 text-sm">+0.37</div>
                      <div className="text-green-500 text-xs">+0.09%</div>
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs mb-3">
                    Premium Motor Spirit
                  </div>
                  <div className="h-20 mb-4">
                    <Line
                      data={{
                        labels: generateTimeSeriesData().map(
                          (item) => item.name
                        ),
                        datasets: [
                          {
                            label: 'PMS',
                            data: generateTimeSeriesData().map(
                              (item) => item.value
                            ),
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16,185,129,0.10)',
                            fill: true,
                            tension: 0.4,
                            pointRadius: 0,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { display: false },
                          tooltip: { enabled: false },
                        },
                        elements: { line: { borderWidth: 2 } },
                        scales: { x: { display: true }, y: { display: true } },
                      }}
                      height={80}
                    />
                  </div>
                  <div className="text-white text-[35px] font-medium ml-2 md:ml-20">
                    ₦714.26
                  </div>
                </>
              )}

              {/* Medium Size  */}
              {selectedSize === 'M' && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Triangle className="w-4 h-4 text-green-500 fill-green-500" />
                      <span className="text-green-500 text-sm font-medium">
                        PMS
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-green-500 text-sm">+0.37</div>
                      <div className="text-green-500 text-xs">+0.09%</div>
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs mb-4">
                    Premium Motor Spirit
                  </div>

                  <div className="flex gap-4 mb-4">
                    <div className="text-white text-xl font-bold">₦714.26</div>
                    {/* <div className="flex-1 space-y-2 text-xs">
                                     <div className="flex justify-between">
                                       <span className="text-gray-400">Highest price</span>
                                       <span className="text-white">800.12</span>
                                     </div>
                                     <div className="flex justify-between">
                                       <span className="text-gray-400">Median price</span>
                                       <span className="text-white">712.49</span>
                                     </div>
                                     <div className="flex justify-between">
                                       <span className="text-gray-400">Current price</span>
                                       <span className="text-white">700.00</span>
                                     </div>
                                   </div> */}
                  </div>

                  <div className="h-32">
                    <Line
                      data={{
                        labels: generateTimeSeriesData().map(
                          (item) => item.name
                        ),
                        datasets: [
                          {
                            label: 'PMS',
                            data: generateTimeSeriesData().map(
                              (item) => item.value
                            ),
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16,185,129,0.10)',
                            fill: true,
                            tension: 0.4,
                            pointRadius: 0,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: { display: false },
                          tooltip: { enabled: true },
                        },
                        elements: {
                          line: { borderWidth: 2 },
                        },
                        scales: {
                          x: {
                            display: true,
                            ticks: {
                              color: '#9CA3AF',
                              font: { size: 10 },
                            },
                            grid: {
                              color: 'rgba(255,255,255,0.05)',
                            },
                          },
                          y: {
                            display: true,
                            ticks: {
                              color: '#9CA3AF',
                              font: { size: 10 },
                              callback: function (value) {
                                return `₦${value}`
                              },
                            },
                            grid: {
                              color: 'rgba(255,255,255,0.05)',
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </>
              )}

              {/* Large Size  */}
              {selectedSize === 'L' && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Triangle className="w-4 h-4 text-green-500 fill-green-500" />
                      <span className="text-green-500 text-sm font-medium">
                        PMS
                      </span>
                      <div className="text-gray-400 text-xs ml-2">
                        Premium Motor Spirit
                      </div>
                    </div>
                    <div className="text-white text-3xl font-bold">₦714.26</div>
                  </div>

                  <div className="flex gap-6 mb-4">
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Highest price</span>
                          <span className="text-white">800.12</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Change</span>
                          <span className="text-green-500">+0.37</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Median price</span>
                          <span className="text-white">712.49</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">% Change</span>
                          <span className="text-green-500">+0.09%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Current price</span>
                          <span className="text-white">700.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Volume</span>
                          <span className="text-white">1.2M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Low price</span>
                          <span className="text-white">695.50</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Market cap</span>
                          <span className="text-white">45.8B</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-40">
                    <Line
                      data={{
                        labels: generateTimeSeriesData().map(
                          (item) => item.name
                        ),
                        datasets: [
                          {
                            label: 'PMS',
                            data: generateTimeSeriesData().map(
                              (item) => item.value
                            ),
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16,185,129,0.10)',
                            fill: true,
                            tension: 0.4,
                            pointRadius: 0,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { display: false },
                          tooltip: { enabled: false },
                        },
                        elements: { line: { borderWidth: 2 } },
                        scales: { x: { display: true }, y: { display: true } },
                      }}
                      height={128}
                    />
                  </div>
                </>
              )}
            </div>

            <SizeSelector
              selectedSize={selectedSize}
              onSizeChange={(size) => handleSizeChange(option.id, size)}
              onClick={(e) => e.stopPropagation()}
            />
          </Card>
        )

      case 'retail-news':
        return (
          <Card
            key={option.id}
            className={`${baseClasses} ${selectedClasses}`}
            onClick={() => onWidgetSelect(option.id)}
          >
            <div className="mb-4">
              <h3 className="text-[#F5F5F5] font-medium mb-1">
                {option.title}
              </h3>
              <p className="text-[#D4D4D4] font-light text-sm">
                {option.description}
              </p>
            </div>

            <div className="bg-[#171717] rounded-lg p-4 mb-4">
              {/* Small Size (S) */}
              {selectedSize === 'S' && (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Triangle className="w-4 h-4 text-green-500 fill-green-500" />
                      <span className="text-green-500 text-sm font-medium">
                        PMS
                      </span>
                    </div>
                    <div className="text-white text-lg font-bold">₦714.26</div>
                  </div>

                  <div className="h-16 mb-4">
                    <Line
                      data={{
                        labels: generateTimeSeriesData().map(
                          (item) => item.name
                        ),
                        datasets: [
                          {
                            label: 'PMS',
                            data: generateTimeSeriesData().map(
                              (item) => item.value
                            ),
                            borderColor: '#10b981',
                            borderWidth: 2,
                            pointRadius: 0,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { display: false },
                          tooltip: { enabled: false },
                        },
                        elements: { line: { borderWidth: 2 } },
                        scales: { x: { display: true }, y: { display: true } },
                      }}
                      height={80}
                    />
                  </div>

                  <div className="border-t border-gray-700 pt-3">
                    <div className="text-gray-400 text-xs mb-1">Vanguard</div>
                    <div className="text-white text-sm font-medium">
                      Heirs Energies doubles oil production – Official...
                    </div>
                  </div>
                </>
              )}

              {/* Medium Size (M) */}
              {selectedSize === 'M' && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Triangle className="w-4 h-4 text-green-500 fill-green-500" />
                      <span className="text-green-500 text-sm font-medium">
                        PMS
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-12">
                        <Line
                          data={{
                            labels: generateTimeSeriesData().map(
                              (item) => item.name
                            ),
                            datasets: [
                              {
                                label: 'PMS',
                                data: generateTimeSeriesData().map(
                                  (item) => item.value
                                ),
                                borderColor: '#10b981',
                                borderWidth: 2,
                                pointRadius: 0,
                              },
                            ],
                          }}
                          options={{
                            responsive: true,
                            plugins: {
                              legend: { display: false },
                              tooltip: { enabled: false },
                            },
                            elements: { line: { borderWidth: 2 } },
                            scales: {
                              x: { display: true },
                              y: { display: true },
                            },
                          }}
                          height={48}
                        />
                      </div>
                      <div className="text-right">
                        <div className="text-white text-lg font-bold">
                          ₦714.26
                        </div>
                        <div className="text-green-500 text-xs">+0.37</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs mb-4">
                    Premium Motor Spirit
                  </div>

                  <div className="space-y-3">
                    {[1, 2].map((item) => (
                      <div key={item} className="flex gap-3">
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium mb-1">
                            Heirs Energies doubles oil production – Official
                          </div>
                          <div className="text-gray-400 text-xs">
                            Heirs Energies announces first-ever cost of Nigeria
                            oil production amid a similar share of domestic gas
                            production.
                          </div>
                        </div>
                        <div className="mb-4">
                          <img
                            src="/assets/images/Image.png"
                            alt="Widget"
                            className="w-full h-18 object-contain rounded"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Large Size (L) */}
              {selectedSize === 'L' && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Triangle className="w-4 h-4 text-green-500 fill-green-500" />
                      <span className="text-green-500 text-sm font-medium">
                        PMS
                      </span>
                      <div className="text-gray-400 text-xs ml-2">
                        Premium Motor Spirit
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-16">
                        <Line
                          data={{
                            labels: generateTimeSeriesData().map(
                              (item) => item.name
                            ),
                            datasets: [
                              {
                                label: 'PMS',
                                data: generateTimeSeriesData().map(
                                  (item) => item.value
                                ),
                                borderColor: '#10b981',
                                borderWidth: 2,
                                pointRadius: 0,
                              },
                            ],
                          }}
                          options={{
                            responsive: true,
                            plugins: {
                              legend: { display: false },
                              tooltip: { enabled: false },
                            },
                            elements: { line: { borderWidth: 2 } },
                            scales: {
                              x: { display: true },
                              y: { display: true },
                            },
                          }}
                          height={64}
                        />
                      </div>
                      <div className="text-right">
                        <div className="text-white text-xl font-bold">
                          ₦714.26
                        </div>
                        <div className="text-green-500 text-sm">+0.37</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div
                        key={item}
                        className="flex gap-3 pb-3 border-b border-gray-800 last:border-b-0"
                      >
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium mb-1">
                            Heirs Energies doubles oil production – Official
                          </div>
                          <div className="text-gray-400 text-xs leading-relaxed">
                            Heirs Energies announces first-ever cost of Nigeria
                            oil production amid a similar share of domestic gas
                            production.
                          </div>
                        </div>
                        <div className="mb-4">
                          <img
                            src="/assets/images/Image.png"
                            alt="Widget"
                            className="w-full h-18 object-contain rounded"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <SizeSelector
              selectedSize={selectedSize}
              onSizeChange={(size) => handleSizeChange(option.id, size)}
              onClick={(e) => e.stopPropagation()}
            />
          </Card>
        )

      case 'watchlist':
        return (
          <Card
            key={option.id}
            className={`${baseClasses} ${selectedClasses}`}
            onClick={() => onWidgetSelect(option.id)}
          >
            <div className="mb-4">
              <h3 className="text-white font-medium mb-1">{option.title}</h3>
              <p className="text-gray-400 text-sm">{option.description}</p>
            </div>

            <div className="bg-[#171717] rounded-lg p-4 mb-4">
              {/* Small Size  */}
              {selectedSize === 'S' && (
                <div className="space-y-4">
                  {[
                    {
                      name: 'PMS',
                      fullName: 'Premium Motor Spirit',
                      price: '₦714.26',
                      change: '+0.37',
                      color: 'green',
                    },
                    {
                      name: 'AGO',
                      fullName: 'Automotive Gas Oil',
                      price: '₦1249.06',
                      change: '-9.01',
                      color: 'red',
                    },
                    {
                      name: 'ICE',
                      fullName: 'ICE Brent Crude',
                      price: '₦0.00',
                      change: '0.00',
                      color: 'green',
                    },
                    {
                      name: 'DPK',
                      fullName: 'Dual Purpose Kerosene',
                      price: '₦1088.92',
                      change: '-50.00',
                      color: 'red',
                    },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Triangle
                          className={`w-4 h-4 ${
                            item.color === 'green'
                              ? 'text-green-500 fill-green-500'
                              : 'text-red-500 fill-red-500 rotate-180'
                          }`}
                        />
                        <div>
                          <div
                            className={`${
                              item.color === 'green'
                                ? 'text-green-500'
                                : 'text-red-500'
                            } text-sm font-medium`}
                          >
                            {item.name}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {item.fullName}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">
                          {item.price}
                        </div>
                        <div
                          className={`${
                            item.color === 'green'
                              ? 'text-green-500'
                              : 'text-red-500'
                          } text-xs`}
                        >
                          {item.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Medium Size  */}
              {selectedSize === 'M' && (
                <div className="space-y-3">
                  {[
                    {
                      name: 'PMS',
                      fullName: 'Premium Motor Spirit',
                      price: '₦714.26',
                      change: '+0.37',
                      color: 'green',
                      trend: 'up',
                    },
                    {
                      name: 'AGO',
                      fullName: 'Automotive Gas Oil',
                      price: '₦1249.06',
                      change: '-9.01',
                      color: 'red',
                      trend: 'down',
                    },
                    {
                      name: 'ICE',
                      fullName: 'ICE Brent Crude',
                      price: '₦0.00',
                      change: '0.00',
                      color: 'green',
                      trend: 'flat',
                    },
                    {
                      name: 'DPK',
                      fullName: 'Dual Purpose Kerosene',
                      price: '₦1088.92',
                      change: '-50.00',
                      color: 'red',
                      trend: 'down',
                    },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Triangle
                          className={`w-4 h-4 ${
                            item.color === 'green'
                              ? 'text-green-500 fill-green-500'
                              : 'text-red-500 fill-red-500 rotate-180'
                          }`}
                        />
                        <div>
                          <div
                            className={`${
                              item.color === 'green'
                                ? 'text-green-500'
                                : 'text-red-500'
                            } text-sm font-medium`}
                          >
                            {item.name}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {item.fullName}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-16 h-8">
                          <Line
                            data={{
                              labels: generateTimeSeriesData().map(
                                (item) => item.name
                              ),
                              datasets: [
                                {
                                  label: item.name,
                                  data: generateTimeSeriesData().map(
                                    (item) => item.value
                                  ),
                                  borderColor:
                                    item.color === 'green'
                                      ? '#10b981'
                                      : '#ef4444',
                                  borderWidth: 2,
                                  pointRadius: 0,
                                },
                              ],
                            }}
                            options={{
                              responsive: true,
                              plugins: {
                                legend: { display: false },
                                tooltip: { enabled: false },
                              },
                              elements: { line: { borderWidth: 2 } },
                              scales: {
                                x: { display: true },
                                y: { display: true },
                              },
                            }}
                            height={32}
                          />
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium text-sm">
                            {item.price}
                          </div>
                          <div
                            className={`${
                              item.color === 'green'
                                ? 'text-green-500'
                                : 'text-red-500'
                            } text-xs`}
                          >
                            {item.change}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Large Size */}
              {selectedSize === 'L' && (
                <div className="space-y-4">
                  {[
                    {
                      name: 'PMS',
                      fullName: 'Premium Motor Spirit',
                      price: '₦714.26',
                      change: '+0.37',
                      color: 'green',
                      trend: 'up',
                    },
                    {
                      name: 'AGO',
                      fullName: 'Automotive Gas Oil',
                      price: '₦1249.06',
                      change: '-9.01',
                      color: 'red',
                      trend: 'down',
                    },
                    {
                      name: 'ICE',
                      fullName: 'ICE Brent Crude',
                      price: '₦0.00',
                      change: '0.00',
                      color: 'green',
                      trend: 'flat',
                    },
                    {
                      name: 'DPK',
                      fullName: 'Dual Purpose Kerosene',
                      price: '₦1088.92',
                      change: '-50.00',
                      color: 'red',
                      trend: 'down',
                    },
                    {
                      name: 'LPG',
                      fullName: 'Liquefied Petroleum Gas',
                      price: '₦1088.92',
                      change: '-50.00',
                      color: 'red',
                      trend: 'down',
                    },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Triangle
                          className={`w-4 h-4 ${
                            item.color === 'green'
                              ? 'text-green-500 fill-green-500'
                              : 'text-red-500 fill-red-500 rotate-180'
                          }`}
                        />
                        <div>
                          <div
                            className={`${
                              item.color === 'green'
                                ? 'text-green-500'
                                : 'text-red-500'
                            } text-sm font-medium`}
                          >
                            {item.name}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {item.fullName}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-24 h-12">
                          <Line
                            data={{
                              labels: generateTimeSeriesData().map(
                                (item) => item.name
                              ),
                              datasets: [
                                {
                                  label: item.name,
                                  data: generateTimeSeriesData().map(
                                    (item) => item.value
                                  ),
                                  borderColor:
                                    item.color === 'green'
                                      ? '#10b981'
                                      : '#ef4444',
                                  borderWidth: 2,
                                  pointRadius: 0,
                                },
                              ],
                            }}
                            options={{
                              responsive: true,
                              plugins: {
                                legend: { display: false },
                                tooltip: { enabled: false },
                              },
                              elements: { line: { borderWidth: 2 } },
                              scales: {
                                x: { display: true },
                                y: { display: true },
                              },
                            }}
                            height={48}
                          />
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">
                            {item.price}
                          </div>
                          <div
                            className={`${
                              item.color === 'green'
                                ? 'text-green-500'
                                : 'text-red-500'
                            } text-xs`}
                          >
                            {item.change}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <SizeSelector
              selectedSize={selectedSize}
              onSizeChange={(size) => handleSizeChange(option.id, size)}
              onClick={(e) => e.stopPropagation()}
            />
          </Card>
        )

      case 'watchlist-news':
        return (
          <Card
            key={option.id}
            className={`${baseClasses} ${selectedClasses}`}
            onClick={() => onWidgetSelect(option.id)}
          >
            <div className="mb-4">
              <h3 className="text-white font-medium mb-1">{option.title}</h3>
              <p className="text-gray-400 text-sm">{option.description}</p>
            </div>

            <div className="bg-[#171717] rounded-lg p-4 mb-4">
              {/* Small Size  */}
              {selectedSize === 'S' && (
                <>
                  <div className="space-y-3 mb-4">
                    {[
                      {
                        name: 'PMS',
                        fullName: 'Premium Motor Spirit',
                        price: '₦714.26',
                        change: '+0.37',
                        color: 'green',
                      },
                      {
                        name: 'AGO',
                        fullName: 'Automotive Gas Oil',
                        price: '₦1249.06',
                        change: '-9.01',
                        color: 'red',
                      },
                      {
                        name: 'ICE',
                        fullName: 'ICE Brent Crude',
                        price: '₦0.00',
                        change: '0.00',
                        color: 'green',
                      },
                    ].map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <Triangle
                            className={`w-4 h-4 ${
                              item.color === 'green'
                                ? 'text-green-500 fill-green-500'
                                : 'text-red-500 fill-red-500 rotate-180'
                            }`}
                          />
                          <div>
                            <div
                              className={`${
                                item.color === 'green'
                                  ? 'text-green-500'
                                  : 'text-red-500'
                              } text-sm font-medium`}
                            >
                              {item.name}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {item.fullName}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">
                            {item.price}
                          </div>
                          <div
                            className={`${
                              item.color === 'green'
                                ? 'text-green-500'
                                : 'text-red-500'
                            } text-xs`}
                          >
                            {item.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-700 pt-3">
                    <div className="text-gray-400 text-xs mb-1">Vanguard</div>
                    <div className="text-white text-sm font-medium">
                      Heirs Energies doubles oil production – Official...
                    </div>
                  </div>
                </>
              )}

              {/* Medium Size  */}
              {selectedSize === 'M' && (
                <>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-xs">
                    {[
                      {
                        name: 'PMS',
                        price: '₦714.26',
                        change: '+0.37',
                        color: 'green',
                      },
                      {
                        name: 'AGO',
                        price: '₦1249.06',
                        change: '-9.01',
                        color: 'red',
                      },
                      {
                        name: 'ICE',
                        price: '₦0.00',
                        change: '0.00',
                        color: 'green',
                      },
                      {
                        name: 'LPG',
                        price: '₦1088.92',
                        change: '-50.00',
                        color: 'red',
                      },
                    ].map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-1">
                          <Triangle
                            className={`w-4 h-4 ${
                              item.color === 'green'
                                ? 'text-green-500 fill-green-500'
                                : 'text-red-500 fill-red-500 rotate-180'
                            }`}
                          />
                          <span
                            className={`${
                              item.color === 'green'
                                ? 'text-green-500'
                                : 'text-red-500'
                            } font-medium`}
                          >
                            {item.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">
                            {item.price}
                          </div>
                          <div
                            className={`${
                              item.color === 'green'
                                ? 'text-green-500'
                                : 'text-red-500'
                            }`}
                          >
                            {item.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-700 pt-3">
                    <div className="space-y-3">
                      {[1, 2].map((item) => (
                        <div key={item} className="flex gap-3">
                          <div className="flex-1">
                            <div className="text-white text-sm font-medium mb-1">
                              Heirs Energies doubles oil production – Official
                            </div>
                            <div className="text-gray-400 text-xs">
                              Heirs Energies announces first-ever cost of
                              Nigeria oil production amid a similar share of
                              domestic gas production.
                            </div>
                          </div>
                          <div className="mb-4">
                            <img
                              src="/assets/images/Image.png"
                              alt="Widget"
                              className="w-full h-18 object-contain rounded"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Large Size  */}
              {selectedSize === 'L' && (
                <>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-4 text-xs">
                    {[
                      {
                        name: 'PMS',
                        price: '₦714.26',
                        change: '+0.37',
                        color: 'green',
                      },
                      {
                        name: 'AGO',
                        price: '₦1249.06',
                        change: '-9.01',
                        color: 'red',
                      },
                      {
                        name: 'ICE',
                        price: '₦0.00',
                        change: '0.00',
                        color: 'green',
                      },
                      {
                        name: 'DPK',
                        price: '₦1088.92',
                        change: '-50.00',
                        color: 'red',
                      },
                      {
                        name: 'LPG',
                        price: '₦1088.92',
                        change: '-50.00',
                        color: 'red',
                      },
                    ]
                      .slice(0, 4)
                      .map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Triangle
                              className={`w-4 h-4 ${
                                item.color === 'green'
                                  ? 'text-green-500 fill-green-500'
                                  : 'text-red-500 fill-red-500 rotate-180'
                              }`}
                            />
                            <span
                              className={`${
                                item.color === 'green'
                                  ? 'text-green-500'
                                  : 'text-red-500'
                              } font-medium`}
                            >
                              {item.name}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-medium">
                              {item.price}
                            </div>
                            <div
                              className={`${
                                item.color === 'green'
                                  ? 'text-green-500'
                                  : 'text-red-500'
                              }`}
                            >
                              {item.change}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="border-t border-gray-700 pt-3">
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div
                          key={item}
                          className="flex gap-3 pb-3 border-b border-gray-800 last:border-b-0"
                        >
                          <div className="flex-1">
                            <div className="text-white text-sm font-medium mb-1">
                              Heirs Energies doubles oil production – Official
                            </div>
                            <div className="text-gray-400 text-xs leading-relaxed">
                              Heirs Energies announces first-ever cost of
                              Nigeria oil production amid a similar share of
                              domestic gas production.
                            </div>
                          </div>
                          <div className="mb-4">
                            <img
                              src="/assets/images/Image.png"
                              alt="Widget"
                              className="w-full h-18 object-contain rounded"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <SizeSelector
              selectedSize={selectedSize}
              onSizeChange={(size) => handleSizeChange(option.id, size)}
              onClick={(e) => e.stopPropagation()}
            />
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {options.map(renderWidget)}
    </div>
  )
}
