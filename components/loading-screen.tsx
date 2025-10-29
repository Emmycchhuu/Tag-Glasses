"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing...")

  useEffect(() => {
    const loadingSteps = [
      { text: "Initializing...", duration: 800 },
      { text: "Loading AI models...", duration: 1200 },
      { text: "Preparing interface...", duration: 1000 },
      { text: "Almost ready...", duration: 1000 },
    ]

    let currentStep = 0
    let progressInterval: NodeJS.Timeout

    const updateProgress = () => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => {
      setIsVisible(false)
      onLoadingComplete()
          }, 500)
          return 100
        }
        return prev + 1
      })
    }

    const updateLoadingText = () => {
      if (currentStep < loadingSteps.length) {
        setLoadingText(loadingSteps[currentStep].text)
        setTimeout(() => {
          currentStep++
          updateLoadingText()
        }, loadingSteps[currentStep].duration)
      }
    }

    // Start progress animation
    progressInterval = setInterval(updateProgress, 50)
    updateLoadingText()

    return () => {
      clearInterval(progressInterval)
    }
  }, [onLoadingComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-50 flex items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => {
          // Use fixed values to prevent hydration mismatch
          const positions = [
            { left: 10, top: 20, delay: 0.5, duration: 2.5 },
            { left: 85, top: 15, delay: 1.2, duration: 3.0 },
            { left: 30, top: 80, delay: 0.8, duration: 2.8 },
            { left: 70, top: 60, delay: 1.5, duration: 3.2 },
            { left: 20, top: 40, delay: 0.3, duration: 2.2 },
            { left: 90, top: 30, delay: 2.1, duration: 2.7 },
            { left: 15, top: 70, delay: 0.9, duration: 3.1 },
            { left: 75, top: 85, delay: 1.8, duration: 2.4 },
            { left: 40, top: 10, delay: 0.6, duration: 2.9 },
            { left: 60, top: 50, delay: 1.4, duration: 2.6 },
            { left: 25, top: 90, delay: 2.3, duration: 3.3 },
            { left: 80, top: 45, delay: 0.7, duration: 2.1 },
            { left: 50, top: 25, delay: 1.6, duration: 2.8 },
            { left: 35, top: 65, delay: 0.4, duration: 3.4 },
            { left: 95, top: 75, delay: 1.9, duration: 2.3 },
            { left: 5, top: 35, delay: 1.1, duration: 2.7 },
            { left: 65, top: 5, delay: 2.5, duration: 3.1 },
            { left: 45, top: 95, delay: 0.2, duration: 2.4 },
            { left: 55, top: 15, delay: 1.7, duration: 2.9 },
            { left: 12, top: 55, delay: 0.8, duration: 3.2 },
            { left: 88, top: 65, delay: 1.3, duration: 2.6 },
            { left: 38, top: 85, delay: 2.0, duration: 2.8 },
            { left: 72, top: 20, delay: 0.5, duration: 3.0 },
            { left: 28, top: 50, delay: 1.4, duration: 2.5 },
            { left: 82, top: 80, delay: 0.9, duration: 3.3 },
            { left: 18, top: 30, delay: 1.6, duration: 2.2 },
            { left: 68, top: 40, delay: 0.3, duration: 2.8 },
            { left: 42, top: 70, delay: 2.2, duration: 2.7 },
            { left: 58, top: 10, delay: 1.0, duration: 3.1 },
            { left: 92, top: 50, delay: 0.6, duration: 2.4 }
          ]
          const pos = positions[i] || { left: 50, top: 50, delay: 1, duration: 2.5 }
          
          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#00ff88] rounded-full animate-pulse opacity-30"
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

      <div className="flex flex-col items-center gap-8 relative z-10">
        {/* Enhanced logo animation */}
        <div className="relative">
          <div className="w-40 h-40 relative animate-spin" style={{ animationDuration: "4s" }}>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#00ff88] border-r-[#00ff88]/50 animate-spin" />
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-cyan-500 border-l-cyan-500/50 animate-spin" style={{ animationDirection: "reverse", animationDuration: "3s" }} />
            <div className="absolute inset-4 rounded-full border border-transparent border-t-white/30 animate-spin" style={{ animationDuration: "2s" }} />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-28 h-28 relative rounded-full border-2 border-[#00ff88]/30 bg-gradient-to-br from-gray-900/50 to-black/80 backdrop-blur-sm flex items-center justify-center animate-logo-landing"
              onAnimationEnd={() => {
                // Play a simple bell-like sound using Web Audio API
                const startBell = async () => {
                  try {
                    const AudioCtx: any = (window as any).AudioContext || (window as any).webkitAudioContext
                    const ctx = new AudioCtx()
                    if (ctx.state === 'suspended') {
                      await ctx.resume().catch(() => {})
                    }
                    const now = ctx.currentTime

                    const playBell = (frequency: number, startOffset: number, gainLevel: number) => {
                      const osc = ctx.createOscillator()
                      const gain = ctx.createGain()
                      const reverb = ctx.createDelay(0.35)
                      reverb.delayTime.value = 0.23

                      osc.type = "sine"
                      osc.frequency.value = frequency

                      gain.gain.setValueAtTime(gainLevel, now + startOffset)
                      gain.gain.exponentialRampToValueAtTime(0.0001, now + startOffset + 1.4)

                      osc.connect(gain)
                      gain.connect(ctx.destination)
                      gain.connect(reverb)
                      reverb.connect(ctx.destination)

                      osc.start(now + startOffset)
                      osc.stop(now + startOffset + 1.5)
                    }

                    // Fundamental + overtone for a soft bell with a slight echo feel
                    playBell(784, 0, 0.22)    // G5
                    playBell(1176, 0.03, 0.09) // overtone
                  } catch {
                    // If auto-play blocked, add a one-time user gesture fallback
                    const handler = () => {
                      document.removeEventListener('click', handler, { capture: true } as any)
                      startBell()
                    }
                    document.addEventListener('click', handler, { capture: true, once: true } as any)
                  }
                }
                startBell()
              }}
            >
              <Image
                src="/images/tag-logo.png"
                alt="TAG Glasses Logo"
                width={84}
                height={84}
                className="object-contain drop-shadow-lg rounded-full"
                priority
              />
            </div>
          </div>
        </div>

        {/* Enhanced loading text */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2 animate-pulse">
            <span className="bg-gradient-to-r from-[#00ff88] to-cyan-500 bg-clip-text text-transparent">
              TAG Glasses
            </span>
          </h1>
          <p className="text-gray-400 text-lg animate-fade-in">
            {loadingText}
          </p>
        </div>

        {/* Enhanced progress bar */}
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-[#00ff88] via-cyan-500 to-blue-500 rounded-full transition-all duration-300 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}
        <div className="text-[#00ff88] text-sm font-mono animate-pulse">
          {progress}%
        </div>

        {/* Loading dots */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-[#00ff88] rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
