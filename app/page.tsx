"use client"

import { useState, useEffect } from "react"
import HeroSection from "@/components/hero-section"
import GallerySection from "@/components/gallery-section"
import UploadSection from "@/components/upload-section"
import ShareSection from "@/components/share-section"
import Navigation from "@/components/navigation"
import LoadingScreen from "@/components/loading-screen"
import DocumentationSection from "@/components/documentation-section"

export default function Home() {
  const [currentSection, setCurrentSection] = useState<"home" | "gallery" | "upload" | "share">("home")
  const [compositeImage, setCompositeImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation currentSection={currentSection} onNavigate={setCurrentSection} />

      <div className="relative">
        {currentSection === "home" && <HeroSection onNavigate={setCurrentSection} />}

        {currentSection === "gallery" && <GallerySection onNavigate={setCurrentSection} />}

        {currentSection === "upload" && (
          <UploadSection
            onComplete={(imageData) => {
              setCompositeImage(imageData)
              setCurrentSection("share")
            }}
          />
        )}

        {currentSection === "share" && compositeImage && (
          <ShareSection compositeImage={compositeImage} onNavigate={setCurrentSection} />
        )}
      </div>

      {currentSection === "home" && <DocumentationSection />}

      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black animate-gradient" />
        {[...Array(20)].map((_, i) => {
          // Use fixed values to prevent hydration mismatch
          const positions = [
            { left: 10, top: 20, delay: 0.5, duration: 8 },
            { left: 85, top: 15, delay: 2.1, duration: 12 },
            { left: 30, top: 80, delay: 1.8, duration: 10 },
            { left: 70, top: 60, delay: 3.5, duration: 15 },
            { left: 20, top: 40, delay: 0.3, duration: 7 },
            { left: 90, top: 30, delay: 4.1, duration: 11 },
            { left: 15, top: 70, delay: 2.9, duration: 13 },
            { left: 75, top: 85, delay: 1.8, duration: 9 },
            { left: 40, top: 10, delay: 1.6, duration: 14 },
            { left: 60, top: 50, delay: 3.4, duration: 8 },
            { left: 25, top: 90, delay: 0.7, duration: 12 },
            { left: 80, top: 45, delay: 2.7, duration: 10 },
            { left: 50, top: 25, delay: 1.6, duration: 11 },
            { left: 35, top: 65, delay: 0.4, duration: 9 },
            { left: 95, top: 75, delay: 3.9, duration: 13 },
            { left: 5, top: 35, delay: 2.1, duration: 8 },
            { left: 65, top: 5, delay: 1.5, duration: 14 },
            { left: 45, top: 95, delay: 0.2, duration: 7 },
            { left: 55, top: 15, delay: 3.7, duration: 12 },
            { left: 12, top: 55, delay: 1.8, duration: 10 }
          ]
          const pos = positions[i] || { left: 50, top: 50, delay: 2, duration: 10 }
          
          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#00ff88] rounded-full animate-float"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDelay: `${pos.delay}s`,
                animationDuration: `${pos.duration}s`,
              }}
            />
          )
        })}
      </div>
    </main>
  )
}
