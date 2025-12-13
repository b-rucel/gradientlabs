import { useState } from 'react'
import { useGradient } from './hooks/useGradient'
import { generateBackgroundCSS, generateCSSCode } from './utils/gradientUtils'
import { downloadGradientPNG } from './utils/canvasUtils'
import { Sidebar } from './components/Sidebar'
import { PreviewArea } from './components/PreviewArea'

function App() {
  const { gradient, activePreset, updateGradient, applyPreset, randomizeGradient } = useGradient()
  const [isDownloading, setIsDownloading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    presets: true,
    mainGradient: true,
    grainPattern: true,
    patternCard: true,
    noiseTexture: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const cssCode = generateCSSCode(gradient)

  const copyCSSCode = () => {
    navigator.clipboard.writeText(cssCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = (): void => {
    setIsDownloading(true)
    try {
      downloadGradientPNG(gradient)
    } finally {
      setIsDownloading(false)
    }
  }

  const backgroundStyle = {
    background: generateBackgroundCSS(gradient),
    backgroundSize: 'cover',
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <Sidebar
        gradient={gradient}
        activePreset={activePreset}
        isDownloading={isDownloading}
        copied={copied}
        expandedSections={expandedSections}
        cssCode={cssCode}
        onUpdateGradient={updateGradient}
        onApplyPreset={applyPreset}
        onRandomize={randomizeGradient}
        onDownload={handleDownload}
        onToggleSection={toggleSection}
        onCopyCSSCode={copyCSSCode}
      />

      <PreviewArea backgroundStyle={backgroundStyle} gradient={gradient} />
    </div>
  )
}

export default App
