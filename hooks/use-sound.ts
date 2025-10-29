import { useEffect, useState } from 'react'
import { soundManager } from '@/lib/sound-manager'

export function useSound() {
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(soundManager.getVolume())

  useEffect(() => {
    // Check if user has previously muted sounds
    const savedMuteState = localStorage.getItem('tag-glasses-sound-muted')
    const savedVolume = localStorage.getItem('tag-glasses-sound-volume')
    
    if (savedMuteState === 'true') {
      soundManager.mute()
      setIsMuted(true)
    }
    
    if (savedVolume) {
      const vol = parseFloat(savedVolume)
      soundManager.setVolume(vol)
      setVolume(vol)
    }
  }, [])

  const toggleMute = () => {
    const newMutedState = soundManager.toggleMute()
    setIsMuted(newMutedState)
    localStorage.setItem('tag-glasses-sound-muted', newMutedState.toString())
  }

  const updateVolume = (newVolume: number) => {
    soundManager.setVolume(newVolume)
    setVolume(newVolume)
    localStorage.setItem('tag-glasses-sound-volume', newVolume.toString())
  }

  return {
    isMuted,
    volume,
    toggleMute,
    updateVolume,
    playClick: soundManager.playClick,
    playHover: soundManager.playHover,
    playSuccess: soundManager.playSuccess,
    playUpload: soundManager.playUpload,
    playAmbient: soundManager.playAmbient,
    stopAmbient: soundManager.stopAmbient,
  }
}

