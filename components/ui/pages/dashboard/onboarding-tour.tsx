"use client"

import { useState } from "react"
import { Button } from "@/components/common/button/button"
import { X } from "lucide-react"
import Image from "next/image"

interface OnboardingTourProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

const tourSteps = [
  {
    title: "Welcome to Petrodata",
    description: "We're glad to have you onboard. Here are some quick tips to get you up and running.",
    image: "/assets/images/Video player.png",
  },
  {
    title: "Track Your Commodities",
    description: "Monitor real-time prices for PMS, AGO, ICE, and DPK with interactive charts and analytics.",
    image: "/assets/images/Video player.png",
  },
  {
    title: "Manage Your Depots",
    description: "Keep track of your depot operations, inventory levels, and performance metrics in one place.",
    image: "/assets/images/Video player.png", 
  },
  {
    title: "Stay Informed",
    description: "Get the latest industry news, reports, and insights to make informed decisions.",
    image: "/assets/images/Video player.png",
  },
]

export function OnboardingTour({ isOpen, onClose, onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)

  if (!isOpen) return null

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentTourStep = tourSteps[currentStep]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-grey/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-[#171717] rounded-2xl overflow-hidden shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          
          <div className="relative h-64 bg-gray-800">
            <Image
              src={currentTourStep.image || "/placeholder.svg"}
              alt="Petrodata onboarding"
              fill
              className="object-cover cursor-pointer"
            />
         
          </div>

          {/* Content */}
          <div className="p-6 text-center">
            <h2 className="text-xl font-semibold text-white mb-3">{currentTourStep.title}</h2>
            <p className="text-gray-300 font-light text-sm leading-relaxed mb-6">{currentTourStep.description}</p>

           
            <div className="flex justify-center gap-2 mb-6">
              {tourSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? "bg-teal-500" : index < currentStep ? "bg-gray-500" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>

            {/*  buttons */}
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={onClose}
                className="flex-1 bg-[#404040] hover:bg-[#404040] text-white border-0 rounded-[40px] p-6"
              >
                Cancel
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-[40px] p-6 cursor-pointer">
                {currentStep === 0
                  ? "Get Started"
                  : currentStep === tourSteps.length - 1
                    ? "Confirm"
                    : "Continue"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
