"use client"

import { Download, Twitter } from "lucide-react"

interface ShareSectionProps {
  compositeImage: string
  onNavigate: (section: "upload") => void
}

export default function ShareSection({ compositeImage, onNavigate }: ShareSectionProps) {
  const downloadImage = () => {
    const link = document.createElement("a")
    link.download = "tag-glasses-look.png"
    link.href = compositeImage
    link.click()
  }

  const shareToTwitter = async () => {
    // First download the image so user can attach it to their tweet
    downloadImage()

    const text = encodeURIComponent("I just grabbed my TAG Lens 👀

TAG is powering the digital identity economy layer.

#IDFI Awakening campaign is live powered by SBTs.

Get yours 👉 ")
    const url = encodeURIComponent(window.location.href)

    // Open Twitter with pre-filled text
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank")
  }

  return (
    <section className="relative min-h-screen px-4 py-24 z-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Your Look<span className="text-[#00ff88]">.</span>
          </h2>
          <p className="text-lg text-gray-400">Share your Tag Glasses style with the world</p>
        </div>

        <div className="mb-8 animate-in fade-in zoom-in duration-700">
          <div className="relative bg-white/5 backdrop-blur-sm border-2 border-[#00ff88]/30 rounded-2xl overflow-hidden p-4 sm:p-8">
            <div className="flex justify-center">
              <img
                src={compositeImage || "/placeholder.svg"}
                alt="Your Tag Glasses Look"
                className="max-w-full h-auto rounded-xl shadow-2xl shadow-[#00ff88]/20"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-in fade-in slide-in-from-bottom duration-700">
          <button
            onClick={downloadImage}
            className="group relative px-8 py-4 bg-[#00ff88] text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Download size={20} />
              Download
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          <button
            onClick={shareToTwitter}
            className="group px-8 py-4 bg-transparent border-2 border-[#00ff88] text-[#00ff88] font-semibold rounded-full transition-all duration-300 hover:bg-[#00ff88]/10 hover:scale-105 w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              <Twitter size={20} />
              Share on X
            </span>
          </button>
        </div>

        <div className="text-center mb-8 animate-in fade-in duration-700">
          <p className="text-sm text-gray-400">
            Click "Share on X" to download your image and open Twitter. Attach the downloaded image to your tweet!
          </p>
        </div>

        {/* Try Again */}
        <div className="text-center animate-in fade-in duration-700">
          <button
            onClick={() => onNavigate("upload")}
            className="text-gray-400 hover:text-[#00ff88] transition-colors underline"
          >
            Try another photo
          </button>
        </div>
      </div>
    </section>
  )
}
