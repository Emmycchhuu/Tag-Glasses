"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

interface HeroSectionProps {
  onNavigate: (section: "gallery" | "upload") => void
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 pt-16 pb-20 z-10">
      <div className="max-w-6xl mx-auto text-center space-y-8 animate-in fade-in duration-1000">
        {/* Glasses Image */}
        <div className="relative w-80 h-80 mx-auto mb-8 animate-in zoom-in duration-1000">
          <div className="absolute inset-0 bg-[#00ff88]/20 blur-3xl animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/10 to-cyan-500/10 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
          <div className="absolute inset-4 bg-gradient-to-l from-cyan-500/10 to-[#00ff88]/10 rounded-full animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3569-yqlsJfaZ1tSxMdiLVYnfFUN4PMBHFy.png"
            alt="Tag Glasses"
            width={320}
            height={320}
            className="relative z-10 drop-shadow-[0_0_40px_rgba(0,255,136,0.6)] animate-float"
          />
        </div>

        {/* Hero Text */}
        <div className="space-y-6">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-white leading-tight">
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Experience the Future
            </span>
            <br />
            <span className="text-transparent bg-gradient-to-r from-[#00ff88] via-cyan-500 to-blue-500 bg-clip-text inline-block animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              of Vision
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            Try on Tag Glasses virtually with smart face detection. Create, customize, and share your futuristic look.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          <button
            onClick={() => onNavigate("upload")}
            className="group relative px-10 py-5 bg-gradient-to-r from-[#00ff88] to-cyan-500 text-black font-bold rounded-full overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-[0_0_40px_rgba(0,255,136,0.6)] hover:rotate-1"
          >
            <span className="relative z-10 flex items-center gap-3 text-lg">
              Try Glasses
              <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={24} />
            </span>
            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>

          <button
            onClick={() => onNavigate("gallery")}
            className="group px-8 py-4 bg-transparent border-2 border-[#00ff88] text-[#00ff88] font-semibold rounded-full transition-all duration-300 hover:bg-[#00ff88]/10 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <Sparkles size={20} />
              Explore Gallery
            </span>
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-4xl mx-auto">
          {[
            { title: "AI Detection", desc: "Automatic face recognition" },
            { title: "Customize", desc: "Drag, resize, and rotate" },
            { title: "Share", desc: "Download or post to socials" },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-4 bg-white/5 backdrop-blur-sm border border-[#00ff88]/20 rounded-xl hover:border-[#00ff88]/50 transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
