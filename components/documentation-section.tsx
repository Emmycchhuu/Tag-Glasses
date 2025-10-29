"use client"

import { Zap, Upload, Palette, Share2, Shield } from "lucide-react"

export default function DocumentationSection() {
  const docs = [
    {
      title: "What are TAG Glasses?",
      description:
        "TAG Glasses are a digital identity layer that lets you customize and share your unique visual identity. Express yourself with personalized glasses overlays on your photos.",
      icon: Zap,
    },
    {
      title: "How to Use",
      description:
        "Upload a photo, position the glasses on your face using drag and drop, adjust the size and rotation, then save and share your TAG Glasses moment with the world.",
      icon: Upload,
    },
    {
      title: "Customize Your Look",
      description:
        "Choose from our gallery of pre-designed glasses or upload your own. Adjust positioning, size, and rotation to perfectly match your style and face.",
      icon: Palette,
    },
    {
      title: "Share Your Identity",
      description:
        "Once you've created your perfect TAG Glasses look, download and share it on social media. Show the world your digital identity with TAG Glasses.",
      icon: Share2,
    },
    {
      title: "Digital Identity Economy",
      description:
        "TAG Glasses are powered by SBTs (Soulbound Tokens), creating a verifiable digital identity layer for the Web3 era. Own your digital presence.",
      icon: Shield,
    },
  ]

  return (
    <section className="py-20 px-4 md:px-8 bg-black relative z-10 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-[#00ff88]">TAG Glasses</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover how TAG Glasses empowers your digital identity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {docs.map((doc, index) => {
            const Icon = doc.icon
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-900/50 to-black/80 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 hover:border-[#00ff88]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00ff88]/20 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-500" />
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-[#00ff88]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + i * 10}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10">
                  {/* Icon with enhanced animation */}
                  <div className="mb-6 text-[#00ff88] opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                    <div className="relative">
                      <Icon size={40} className="drop-shadow-lg" />
                      <div className="absolute inset-0 bg-[#00ff88]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Title with gradient text */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#00ff88] group-hover:to-cyan-500 group-hover:bg-clip-text transition-all duration-300">
                    {doc.title}
                  </h3>

                  {/* Description with enhanced styling */}
                  <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {doc.description}
                  </p>

                  {/* Enhanced bottom accent line */}
                  <div className="mt-6 h-1 w-0 bg-gradient-to-r from-[#00ff88] via-cyan-500 to-blue-500 group-hover:w-full transition-all duration-500 rounded-full shadow-lg" />
                  
                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-[#00ff88]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
