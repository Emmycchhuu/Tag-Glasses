import { Howl } from 'howler'

export interface SoundConfig {
  volume?: number
  loop?: boolean
  preload?: boolean
}

class SoundManager {
  private sounds: Map<string, Howl> = new Map()
  private isMuted: boolean = false
  private masterVolume: number = 0.7

  constructor() {
    // Initialize with default sounds
    this.initializeSounds()
  }

  private initializeSounds() {
    // Button click sound (using a simple tone)
    this.addSound('click', {
      src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU6k9n1unEiBC13yO/eizEIHWq+8+OWT'],
      volume: 0.3,
      preload: true
    })

    // Hover sound
    this.addSound('hover', {
      src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU6k9n1unEiBC13yO/eizEIHWq+8+OWT'],
      volume: 0.2,
      preload: true
    })

    // Success sound
    this.addSound('success', {
      src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU6k9n1unEiBC13yO/eizEIHWq+8+OWT'],
      volume: 0.4,
      preload: true
    })

    // Upload sound
    this.addSound('upload', {
      src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU6k9n1unEiBC13yO/eizEIHWq+8+OWT'],
      volume: 0.5,
      preload: true
    })

    // Ambient background sound
    this.addSound('ambient', {
      src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU6k9n1unEiBC13yO/eizEIHWq+8+OWT'],
      volume: 0.1,
      loop: true,
      preload: true
    })
  }

  addSound(name: string, config: SoundConfig & { src: string[] }) {
    const sound = new Howl({
      src: config.src,
      volume: (config.volume || 1) * this.masterVolume,
      loop: config.loop || false,
      preload: config.preload !== false
    })

    this.sounds.set(name, sound)
  }

  play(name: string, volume?: number) {
    if (this.isMuted) return

    const sound = this.sounds.get(name)
    if (sound) {
      if (volume !== undefined) {
        sound.volume(volume * this.masterVolume)
      }
      sound.play()
    }
  }

  stop(name: string) {
    const sound = this.sounds.get(name)
    if (sound) {
      sound.stop()
    }
  }

  pause(name: string) {
    const sound = this.sounds.get(name)
    if (sound) {
      sound.pause()
    }
  }

  setVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume))
    this.sounds.forEach(sound => {
      sound.volume(this.masterVolume)
    })
  }

  mute() {
    this.isMuted = true
    this.sounds.forEach(sound => {
      sound.mute(true)
    })
  }

  unmute() {
    this.isMuted = false
    this.sounds.forEach(sound => {
      sound.mute(false)
    })
  }

  toggleMute() {
    if (this.isMuted) {
      this.unmute()
    } else {
      this.mute()
    }
    return !this.isMuted
  }

  isSoundMuted(): boolean {
    return this.isMuted
  }

  getVolume(): number {
    return this.masterVolume
  }

  // Convenience methods for common sounds
  playClick() {
    this.play('click')
  }

  playHover() {
    this.play('hover')
  }

  playSuccess() {
    this.play('success')
  }

  playUpload() {
    this.play('upload')
  }

  playAmbient() {
    this.play('ambient')
  }

  stopAmbient() {
    this.stop('ambient')
  }
}

// Create a singleton instance
export const soundManager = new SoundManager()

// Export the class for testing
export { SoundManager }

