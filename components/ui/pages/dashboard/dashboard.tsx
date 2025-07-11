'use client'

import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/layout/dashboard-header'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { CommodityWidget } from '@/components/layout/dashboard/community-widget'
import { DepotWidget } from '@/components/layout/dashboard/depot-widget'
import { OnboardingTour } from '@/components/ui/pages/dashboard/onboarding-tour'
import { ReportsWidget } from '@/components/layout/dashboard/reports-widget'
import { IceWidget } from '@/components/layout/dashboard/ice-widget'
import { FlightWidget } from '@/components/layout/dashboard/flight-widget'
import { FloatingRequestButton } from '@/components/common/button/floating-request-button'
import { Button } from '@/components/common/button/button'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding')
    if (!hasSeenOnboarding) {
      setShowOnboarding(true)
    }
  }, [])

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true')
    setShowOnboarding(false)
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#262626] text-white">
      <div className="flex">
        <DashboardSidebar
          isCollapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
        />

        <div className="flex-1 min-w-0">
          <DashboardHeader
            onNotificationModalChange={setIsNotificationModalOpen}
          />

          <main className="p-4 md:p-8 bg-[#262626]">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 md:gap-10  mb-4 md:mb-8 items-center">
              <div className="w-full">
                <CommodityWidget />
              </div>
              <div className="w-full flex justify-center xl:justify-start">
                <DepotWidget isSidebarCollapsed={sidebarCollapsed} />
              </div>
            </div>

            <div className="mb-4 md:mb-8">
              {/* Mobile  */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-row gap-4 md:gap-8 xl:justify-start">
                <div className="w-full xl:w-auto xl:flex-shrink-0 flex justify-center sm:justify-start">
                  <ReportsWidget />
                </div>
                <div className="w-full xl:w-auto xl:flex-shrink-0 flex justify-center sm:justify-start">
                  <IceWidget />
                </div>
                <div className="col-span-2 lg:col-span-1 w-full xl:w-auto xl:flex-shrink-0 flex justify-center sm:justify-start overflow-hidden">
                  <div className="w-full sm:w-auto">
                    <FlightWidget isSidebarCollapsed={sidebarCollapsed} />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent cursor-pointer"
                onClick={() => router.push('/edit-widget')}
              >
                Edit widget
              </Button>
            </div>
          </main>
        </div>
      </div>

      <FloatingRequestButton isHidden={isNotificationModalOpen} />

      <OnboardingTour
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />
    </div>
  )
}
