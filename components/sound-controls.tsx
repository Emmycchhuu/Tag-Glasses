"use client"

import { Volume2, VolumeX } from "lucide-react"
import { useSound } from "@/hooks/use-sound"

export default function SoundControls() {
  const { isMuted, volume, toggleMute, updateVolume } = useSound()

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-black/80 backdrop-blur-sm border border-[#00ff88]/30 rounded-full px-3 py-2">
      <button
        onClick={toggleMute}
        className="p-1 text-[#00ff88] hover:text-white transition-colors"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
      
      {!isMuted && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => updateVolume(parseFloat(e.target.value))}
          className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #00ff88 0%, #00ff88 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
          }}
        />
      )}
    </div>
  )
}

