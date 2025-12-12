import { useState, useRef, useEffect } from 'react'

interface PreviewAreaProps {
  backgroundStyle: {
    background: string
    backgroundSize: string
  }
}

export function PreviewArea({ backgroundStyle }: PreviewAreaProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const gradientCardRef = useRef<HTMLDivElement>(null)

  const handleFullscreen = async () => {
    if (!gradientCardRef.current) return

    try {
      if (!isFullscreen) {
        if (gradientCardRef.current.requestFullscreen) {
          await gradientCardRef.current.requestFullscreen()
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen()
        }
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  return (
    <div className="flex-1 relative bg-gray-200 flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Transparency Checkboard BG */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }}
      />

      {/* The Gradient Card */}
      <div
        ref={gradientCardRef}
        className="w-full h-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl relative overflow-hidden ring-8 ring-white/40 backdrop-blur-xl transition-all duration-500 ease-out"
        style={backgroundStyle}
      >
        {/* Optional: Add some overlay UI in the preview to show it's "Live" */}
        {!isFullscreen && (
          <div className="absolute bottom-8 left-8 text-white/90 text-sm font-medium px-4 py-2 bg-black/20 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Live Preview
          </div>
        )}

        {/* Fullscreen Button */}
        {!isFullscreen && (
          <button
            onClick={handleFullscreen}
            className="absolute top-8 right-8 text-white/90 hover:text-white text-sm font-medium px-3 py-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-lg border border-white/10 hover:border-white/30 transition-all duration-200 flex items-center gap-2"
            title="Enter fullscreen"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4m-4 0l5 5m11-5v4m0-4h-4m4 0l-5 5M4 20v-4m0 4h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
            Fullscreen
          </button>
        )}
      </div>
    </div>
  )
}
