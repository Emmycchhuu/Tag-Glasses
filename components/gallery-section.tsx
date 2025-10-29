"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"

interface GallerySectionProps {
  onNavigate: (section: "upload") => void
}

export default function GallerySection({ onNavigate }: GallerySectionProps) {
  const sampleImages = [
    "/images/gallery-1.png",
    "/images/gallery-2.png",
    "/images/gallery-3.png",
    "/images/gallery-4.png",
    "/images/gallery-5.png",
  ]

  return (
    <section className="relative min-h-screen px-4 py-24 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top duration-700">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Gallery<span className="text-[#00ff88]">.</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">See how others rock the Tag Glasses look</p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sampleImages.map((src, i) => (
            <div
              key={i}
              className="group relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900/30 to-black/50 backdrop-blur-sm border border-gray-800/50 hover:border-[#00ff88]/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#00ff88]/20 animate-fade-in-up"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={`Gallery image ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Animated overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Glowing border effect */}
              <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-[#00ff88]/50 transition-all duration-500 rounded-3xl shadow-lg" />
              
              {/* Floating particles on hover */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {[...Array(8)].map((_, j) => (
                  <div
                    key={j}
                    className="absolute w-1 h-1 bg-[#00ff88]/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-particle-float"
                    style={{
                      left: `${10 + j * 12}%`,
                      top: `${20 + j * 8}%`,
                      animationDelay: `${j * 0.3}s`,
                    }}
                  />
                ))}
              </div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center animate-in fade-in slide-in-from-bottom duration-700">
          <button
            onClick={() => onNavigate("upload")}
            className="group relative px-8 py-4 bg-[#00ff88] text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Create Yours
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  )
}
