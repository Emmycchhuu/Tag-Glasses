"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import {
  Upload,
  Loader2,
  Download,
  RotateCw,
  ZoomIn,
  ZoomOut,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Save,
  Eye,
  AlertCircle,
} from "lucide-react"
import { useFaceDetection } from "@/hooks/use-face-detection"

interface UploadSectionProps {
  onComplete: (imageData: string) => void
}

export default function UploadSection({ onComplete }: UploadSectionProps) {
  const [image, setImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [glassesPosition, setGlassesPosition] = useState({ x: 50, y: 35, scale: 1.2, rotation: 0 })
  const [showGlasses, setShowGlasses] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [isSaved, setIsSaved] = useState(false)
  const [glassesLoaded, setGlassesLoaded] = useState(false)
  const [faceDetectionStatus, setFaceDetectionStatus] = useState<'idle' | 'detecting' | 'success' | 'error'>('idle')
  const [faceDetectionError, setFaceDetectionError] = useState<string | null>(null)
  const [autoPositionEnabled, setAutoPositionEnabled] = useState(true)

  // Face detection hook
  const { isLoaded: modelsLoaded, isLoading: modelsLoading, error: modelsError, detectFaces } = useFaceDetection()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const glassesRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (event) => {
      const imageData = event.target?.result as string
      setImage(imageData)
      setShowGlasses(false)
      setIsProcessing(true)
      setFaceDetectionStatus('idle')
      setFaceDetectionError(null)

      // Create image element for face detection
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = async () => {
        try {
          if (autoPositionEnabled && modelsLoaded) {
            setFaceDetectionStatus('detecting')
            console.log('[Upload] Starting face detection...')
            
            const faceResults = await detectFaces(img)
            
            if (faceResults.length > 0) {
              // Use the first detected face for glasses positioning
              const firstFace = faceResults[0]
              if (firstFace.glassesPosition) {
                // Face detection already returns percentage coordinates
                const position = {
                  x: firstFace.glassesPosition.x,
                  y: firstFace.glassesPosition.y,
                  scale: firstFace.glassesPosition.scale,
                  rotation: firstFace.glassesPosition.rotation
                }
                
                setGlassesPosition(position)
                setFaceDetectionStatus('success')
                console.log('[Upload] Face detected and glasses positioned automatically:', position)
                console.log('[Upload] Glasses should be at:', `${position.x}%, ${position.y}%`)
              }
            } else {
              setFaceDetectionStatus('error')
              setFaceDetectionError('No faces detected in the image')
              console.log('[Upload] No faces detected, using default position')
            }
          }
        } catch (error) {
          setFaceDetectionStatus('error')
          setFaceDetectionError(error instanceof Error ? error.message : 'Face detection failed')
          console.error('[Upload] Face detection error:', error)
        } finally {
        setIsProcessing(false)
        setShowGlasses(true)
        }
      }
      img.src = imageData
    }
    reader.readAsDataURL(file)
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const currentX = (glassesPosition.x / 100) * rect.width
      const currentY = (glassesPosition.y / 100) * rect.height
      setDragStart({ x: clientX - currentX, y: clientY - currentY })
    }
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()
    e.stopPropagation()

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((clientX - dragStart.x - rect.left) / rect.width) * 100
    const y = ((clientY - dragStart.y - rect.top) / rect.height) * 100

    setGlassesPosition((prev) => ({
      ...prev,
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    }))
    setIsSaved(false)
  }

  const handleDragEnd = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation()
    }
    setIsDragging(false)
  }

  const adjustScale = (delta: number) => {
    setGlassesPosition((prev) => ({
      ...prev,
      scale: Math.max(0.1, prev.scale + delta),
    }))
    setIsSaved(false)
  }

  const adjustRotation = (delta: number) => {
    setGlassesPosition((prev) => ({
      ...prev,
      rotation: prev.rotation + delta,
    }))
    setIsSaved(false)
  }

  const moveGlasses = (direction: "up" | "down" | "left" | "right") => {
    const step = 2
    setGlassesPosition((prev) => {
      switch (direction) {
        case "up":
          return { ...prev, y: Math.max(0, prev.y - step) }
        case "down":
          return { ...prev, y: Math.min(100, prev.y + step) }
        case "left":
          return { ...prev, x: Math.max(0, prev.x - step) }
        case "right":
          return { ...prev, x: Math.min(100, prev.x + step) }
        default:
          return prev
      }
    })
    setIsSaved(false)
  }

  const detectFaceManually = async () => {
    if (!imageRef.current || !modelsLoaded) return

    try {
      setFaceDetectionStatus('detecting')
      setFaceDetectionError(null)
      
      const faceResults = await detectFaces(imageRef.current)
      
      if (faceResults.length > 0) {
        const firstFace = faceResults[0]
        if (firstFace.glassesPosition) {
          // Face detection already returns percentage coordinates
          const position = {
            x: firstFace.glassesPosition.x,
            y: firstFace.glassesPosition.y,
            scale: firstFace.glassesPosition.scale,
            rotation: firstFace.glassesPosition.rotation
          }
          
          setGlassesPosition(position)
          setFaceDetectionStatus('success')
          setIsSaved(false)
        }
      } else {
        setFaceDetectionStatus('error')
        setFaceDetectionError('No faces detected in the image')
      }
    } catch (error) {
      setFaceDetectionStatus('error')
      setFaceDetectionError(error instanceof Error ? error.message : 'Face detection failed')
    }
  }

  const generateComposite = async () => {
    if (!canvasRef.current || !imageRef.current || !glassesRef.current) {
      console.error("[TAG Glasses] Missing required elements for composite generation")
      return
    }

    if (!glassesLoaded) {
      console.log("[TAG Glasses] Waiting for glasses image to load...")
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = imageRef.current
    const glasses = glassesRef.current

    console.log("[TAG Glasses] Generating composite image...")
    console.log("[TAG Glasses] Image dimensions:", img.naturalWidth, "x", img.naturalHeight)
    console.log("[TAG Glasses] Glasses position:", glassesPosition)

    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight

    ctx.drawImage(img, 0, 0)

    const glassesX = (glassesPosition.x / 100) * img.naturalWidth
    const glassesY = (glassesPosition.y / 100) * img.naturalHeight

    // Match on-screen sizing rules exactly:
    // On-screen width: min(40% of displayed image width, 200px) * scale
    // Convert displayed pixels to natural pixels for canvas drawing
    const displayedImageWidth = imageRef.current.clientWidth || img.naturalWidth
    const naturalToDisplayScale = img.naturalWidth / displayedImageWidth
    const baseDisplayedWidth = Math.min(displayedImageWidth * 0.4, 200)
    const glassesWidth = baseDisplayedWidth * glassesPosition.scale * naturalToDisplayScale
    const glassesHeight = (glasses.naturalHeight / glasses.naturalWidth) * glassesWidth

    ctx.save()
    ctx.translate(glassesX, glassesY)
    ctx.rotate(glassesPosition.rotation)
    ctx.drawImage(glasses, -glassesWidth / 2, -glassesHeight / 2, glassesWidth, glassesHeight)
    ctx.restore()

    const compositeData = canvas.toDataURL("image/png")
    console.log("[TAG Glasses] Composite generated successfully")
    onComplete(compositeData)
    setIsSaved(true)
  }

  useEffect(() => {
    if (imageRef.current && containerRef.current) {
      const updateSize = () => {
        if (containerRef.current) {
          setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
          })
        }
      }
      updateSize()
      window.addEventListener("resize", updateSize)
      return () => window.removeEventListener("resize", updateSize)
    }
  }, [image])

  return (
    <section className="relative min-h-screen px-4 py-24 z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Try It On
            </span>
            <span className="text-transparent bg-gradient-to-r from-[#00ff88] via-cyan-500 to-blue-500 bg-clip-text inline-block animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              .
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            Upload your photo and position the glasses exactly how you want
          </p>
        </div>

        {!image ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative p-16 border-2 border-dashed border-[#00ff88]/30 rounded-3xl bg-gradient-to-br from-gray-900/20 to-black/40 backdrop-blur-sm hover:border-[#00ff88]/50 hover:bg-gradient-to-br hover:from-gray-900/30 hover:to-black/50 transition-all duration-500 cursor-pointer group animate-scale-in"
            style={{ animationDelay: "0.8s" }}
          >
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
            
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-[#00ff88]/20 rounded-full animate-particle-float"
                  style={{
                    left: `${10 + i * 8}%`,
                    top: `${20 + i * 6}%`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 text-center space-y-6">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-[#00ff88]/20 to-cyan-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-12 h-12 text-[#00ff88] group-hover:text-cyan-400 transition-colors duration-300" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00ff88] transition-colors duration-300">
                  Upload Your Photo
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Click to browse or drag and drop
                </p>
              </div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-[#00ff88]/10 to-transparent rounded-3xl" />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-700">
            {/* Compact Image Card */}
            <div className="relative bg-white/5 backdrop-blur-sm border border-[#00ff88]/20 rounded-2xl overflow-hidden max-w-md mx-auto">
              {isProcessing && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 text-[#00ff88] animate-spin mx-auto" />
                    <p className="text-white">
                      {faceDetectionStatus === 'detecting' ? 'Detecting faces...' : 'Loading your photo...'}
                    </p>
                    {modelsLoading && (
                      <p className="text-sm text-gray-400">Loading AI models...</p>
                    )}
                  </div>
                </div>
              )}

              <div
                ref={containerRef}
                className="relative select-none touch-none"
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
              >
                <img
                  ref={imageRef}
                  src={image || "/placeholder.svg"}
                  alt="Uploaded"
                  className="w-full h-auto block pointer-events-none max-h-96 object-cover"
                  crossOrigin="anonymous"
                  onLoad={() => {
                    if (containerRef.current) {
                      setContainerSize({
                        width: containerRef.current.offsetWidth,
                        height: containerRef.current.offsetHeight,
                      })
                    }
                  }}
                />
                {showGlasses && (
                  <>
                    <img
                      ref={glassesRef}
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3569-yqlsJfaZ1tSxMdiLVYnfFUN4PMBHFy.png"
                      alt="Glasses"
                      className="absolute cursor-move z-10"
                      style={{
                        left: `${glassesPosition.x}%`,
                        top: `${glassesPosition.y}%`,
                        transform: `translate(-50%, -50%) scale(${glassesPosition.scale}) rotate(${glassesPosition.rotation}rad)`,
                        width: "40%",
                        maxWidth: "200px",
                        height: "auto",
                        opacity: showGlasses ? 1 : 0,
                        touchAction: "none",
                      }}
                      onMouseDown={handleDragStart}
                      onTouchStart={handleDragStart}
                      crossOrigin="anonymous"
                      draggable={false}
                      onLoad={() => {
                        console.log("[TAG Glasses] Glasses image loaded")
                        setGlassesLoaded(true)
                      }}
                    />
                    
                    {/* Face Detection Status */}
                    <div className="absolute top-2 right-2 z-20">
                      {faceDetectionStatus === 'success' && (
                        <div className="bg-green-500/20 border border-green-500/50 px-2 py-1 rounded-lg backdrop-blur-sm">
                          <p className="text-xs text-green-400 font-medium flex items-center gap-1">
                            <Eye size={10} />
                            Auto-positioned
                          </p>
                        </div>
                      )}
                      {faceDetectionStatus === 'error' && (
                        <div className="bg-red-500/20 border border-red-500/50 px-2 py-1 rounded-lg backdrop-blur-sm">
                          <p className="text-xs text-red-400 font-medium flex items-center gap-1">
                            <AlertCircle size={10} />
                            Error
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Inline Controls */}
                    <div className="absolute bottom-2 left-2 right-2 z-20">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 space-y-2">
                        <p className="text-xs text-[#00ff88] font-medium text-center">
                          👆 Drag to move • Use controls below
                        </p>
                        
                        {/* Quick Controls Row */}
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={detectFaceManually}
                            disabled={!modelsLoaded || faceDetectionStatus === 'detecting'}
                            className="px-3 py-1 bg-[#00ff88]/20 border border-[#00ff88]/50 text-[#00ff88] rounded text-xs hover:bg-[#00ff88]/30 transition-all flex items-center gap-1 disabled:opacity-50"
                          >
                            {faceDetectionStatus === 'detecting' ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <Eye size={12} />
                            )}
                            <span>Auto-Detect</span>
                          </button>
                        </div>
                        
                        {/* Movement Controls */}
                        <div className="flex flex-col items-center gap-1">
                          <button
                            onClick={() => moveGlasses("up")}
                            className="px-2 py-1 bg-white/10 border border-white/30 text-white rounded text-xs hover:bg-white/20 transition-all"
                            title="Move Up"
                          >
                            <ArrowUp size={12} />
                          </button>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => moveGlasses("left")}
                              className="px-2 py-1 bg-white/10 border border-white/30 text-white rounded text-xs hover:bg-white/20 transition-all"
                              title="Move Left"
                            >
                              <ArrowLeft size={12} />
                            </button>
                            <button
                              onClick={() => moveGlasses("down")}
                              className="px-2 py-1 bg-white/10 border border-white/30 text-white rounded text-xs hover:bg-white/20 transition-all"
                              title="Move Down"
                            >
                              <ArrowDown size={12} />
                            </button>
                            <button
                              onClick={() => moveGlasses("right")}
                              className="px-2 py-1 bg-white/10 border border-white/30 text-white rounded text-xs hover:bg-white/20 transition-all"
                              title="Move Right"
                            >
                              <ArrowRight size={12} />
                            </button>
                          </div>
                        </div>
                        
                        {/* Size & Rotation Controls */}
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => adjustScale(0.2)}
                            className="px-2 py-1 bg-white/10 border border-white/30 text-white rounded text-xs hover:bg-white/20 transition-all"
                            title="Bigger"
                          >
                            <ZoomIn size={12} />
                          </button>
                          
                          <button
                            onClick={() => adjustScale(-0.2)}
                            className="px-2 py-1 bg-white/10 border border-white/30 text-white rounded text-xs hover:bg-white/20 transition-all"
                            title="Smaller"
                          >
                            <ZoomOut size={12} />
                          </button>
                          
                          <button
                            onClick={() => adjustRotation(0.1)}
                            className="px-2 py-1 bg-white/10 border border-white/30 text-white rounded text-xs hover:bg-white/20 transition-all"
                            title="Rotate Right"
                          >
                            <RotateCw size={12} />
                          </button>
                          
                          <button
                            onClick={() => adjustRotation(-0.1)}
                            className="px-2 py-1 bg-white/10 border border-white/30 text-white rounded text-xs hover:bg-white/20 transition-all"
                            title="Rotate Left"
                          >
                            <RotateCw size={12} className="scale-x-[-1]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Additional Controls */}
            <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
              <label className="flex items-center gap-2 text-sm text-gray-400">
                <input
                  type="checkbox"
                  checked={autoPositionEnabled}
                  onChange={(e) => setAutoPositionEnabled(e.target.checked)}
                  className="rounded border-[#00ff88]/30 bg-white/5"
                />
                Auto-position glasses on upload
              </label>
              
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-white/5 border border-[#00ff88]/30 text-white rounded-full hover:bg-[#00ff88]/10 hover:border-[#00ff88]/50 transition-all"
                >
                  Change Photo
                </button>
              
              {modelsError && (
                <p className="text-xs text-red-400 text-center">
                  Face detection unavailable: {modelsError}
                </p>
              )}
            </div>

            <div className="text-center space-y-3">
              <button
                onClick={generateComposite}
                className={`group relative px-8 py-4 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 ${
                  isSaved
                    ? "bg-gray-600 text-gray-300 cursor-default"
                    : "bg-[#00ff88] text-black hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]"
                }`}
                disabled={isSaved}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isSaved ? (
                    <>
                      <Download size={20} />
                      Saved! Ready to Download
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      Save My Look
                    </>
                  )}
                </span>
                {!isSaved && (
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                )}
              </button>
              {!isSaved && (
                <p className="text-xs text-gray-400">
                  Click "Save My Look" before downloading to capture your current glasses position
                </p>
              )}
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </section>
  )
}
