import { useState, useEffect, useCallback } from 'react'
import { faceDetectionService, FaceDetectionResult } from '@/lib/face-detection'

export interface UseFaceDetectionReturn {
  isLoaded: boolean
  isLoading: boolean
  error: string | null
  detectFaces: (image: HTMLImageElement) => Promise<FaceDetectionResult[]>
  loadModels: () => Promise<void>
}

export function useFaceDetection(): UseFaceDetectionReturn {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadModels = useCallback(async () => {
    if (faceDetectionService.isLoaded) {
      setIsLoaded(true)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await faceDetectionService.loadModels()
      setIsLoaded(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load face detection models'
      setError(errorMessage)
      console.error('[useFaceDetection] Error loading models:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const detectFaces = useCallback(async (image: HTMLImageElement): Promise<FaceDetectionResult[]> => {
    if (!faceDetectionService.isLoaded) {
      throw new Error('Face detection models not loaded')
    }

    try {
      return await faceDetectionService.detectFaces(image)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to detect faces'
      console.error('[useFaceDetection] Error detecting faces:', err)
      throw new Error(errorMessage)
    }
  }, [])

  // Auto-load models on mount
  useEffect(() => {
    loadModels()
  }, [loadModels])

  return {
    isLoaded,
    isLoading,
    error,
    detectFaces,
    loadModels
  }
}

