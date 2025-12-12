import { useState } from 'react'
import Slider from './components/Slider'

interface GradientState {
  color1: string
  color2: string
  color3: string
  gradientAngle: number
  grainOpacity: number
  grainColor: string
  pattern1Angle: number
  pattern1Size: number
  pattern2Angle: number
  pattern2Size: number
}

interface Preset {
  name: string
  config: GradientState
}

const PRESETS: Preset[] = [
  {
    name: 'Classic',
    config: {
      color1: '#0088cc',
      color2: '#ff8844',
      color3: '#1a3a52',
      gradientAngle: 135,
      grainOpacity: 5,
      grainColor: '#ffffff',
      pattern1Angle: 45,
      pattern1Size: 10,
      pattern2Angle: -45,
      pattern2Size: 10,
    },
  },
  {
    name: 'Ocean',
    config: {
      color1: '#001a4d',
      color2: '#0066ff',
      color3: '#00ccff',
      gradientAngle: 45,
      grainOpacity: 3,
      grainColor: '#ffffff',
      pattern1Angle: 30,
      pattern1Size: 12,
      pattern2Angle: -30,
      pattern2Size: 12,
    },
  },
  {
    name: 'Sunset',
    config: {
      color1: '#ff6b00',
      color2: '#ffaa00',
      color3: '#ff0066',
      gradientAngle: 180,
      grainOpacity: 8,
      grainColor: '#ffffff',
      pattern1Angle: 60,
      pattern1Size: 8,
      pattern2Angle: -60,
      pattern2Size: 8,
    },
  },
  {
    name: 'Forest',
    config: {
      color1: '#0d3b0d',
      color2: '#228b22',
      color3: '#32cd32',
      gradientAngle: 120,
      grainOpacity: 6,
      grainColor: '#ffffff',
      pattern1Angle: 45,
      pattern1Size: 15,
      pattern2Angle: -45,
      pattern2Size: 15,
    },
  },
  {
    name: 'Purple Storm',
    config: {
      color1: '#2d1b4e',
      color2: '#7b2cbf',
      color3: '#b5179e',
      gradientAngle: 315,
      grainOpacity: 7,
      grainColor: '#ffffff',
      pattern1Angle: 75,
      pattern1Size: 11,
      pattern2Angle: -75,
      pattern2Size: 11,
    },
  },
  {
    name: 'Minimalist',
    config: {
      color1: '#f5f5f5',
      color2: '#cccccc',
      color3: '#888888',
      gradientAngle: 90,
      grainOpacity: 2,
      grainColor: '#000000',
      pattern1Angle: 45,
      pattern1Size: 8,
      pattern2Angle: -45,
      pattern2Size: 8,
    },
  },
  {
    name: 'Neon',
    config: {
      color1: '#ff006e',
      color2: '#ffbe0b',
      color3: '#00f5ff',
      gradientAngle: 225,
      grainOpacity: 10,
      grainColor: '#ffffff',
      pattern1Angle: 90,
      pattern1Size: 6,
      pattern2Angle: 0,
      pattern2Size: 6,
    },
  },
  {
    name: 'Rose Gold',
    config: {
      color1: '#d4a574',
      color2: '#f4d4b0',
      color3: '#b8860b',
      gradientAngle: 135,
      grainOpacity: 4,
      grainColor: '#ffffff',
      pattern1Angle: 45,
      pattern1Size: 12,
      pattern2Angle: -45,
      pattern2Size: 12,
    },
  },
]

function App() {
  const [gradient, setGradient] = useState<GradientState>(PRESETS[0].config)
  const [activePreset, setActivePreset] = useState(0)

  const [copied, setCopied] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    presets: true,
    mainGradient: true,
    grainPattern: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 255, g: 255, b: 255 }
  }

  const generateBackgroundCSS = () => {
    const grainRGB = hexToRgb(gradient.grainColor)
    const grainOpacityDecimal = (gradient.grainOpacity / 100).toFixed(2)

    return `repeating-linear-gradient(${gradient.pattern1Angle}deg, rgba(${grainRGB.r}, ${grainRGB.g}, ${grainRGB.b}, ${grainOpacityDecimal}) 0px, rgba(${grainRGB.r}, ${grainRGB.g}, ${grainRGB.b}, ${grainOpacityDecimal}) ${gradient.pattern1Size}px, transparent ${gradient.pattern1Size + 4}px, transparent ${gradient.pattern1Size + 5}px),
repeating-linear-gradient(${gradient.pattern2Angle}deg, rgba(${grainRGB.r}, ${grainRGB.g}, ${grainRGB.b}, ${grainOpacityDecimal}) 0px, rgba(${grainRGB.r}, ${grainRGB.g}, ${grainRGB.b}, ${grainOpacityDecimal}) ${gradient.pattern2Size}px, transparent ${gradient.pattern2Size + 4}px, transparent ${gradient.pattern2Size + 5}px),
linear-gradient(${gradient.gradientAngle}deg, ${gradient.color1} 0%, ${gradient.color2} 50%, ${gradient.color3} 100%)`
  }

  const cssCode = `background: ${generateBackgroundCSS()};
background-size: cover;`

  const updateGradient = (key: keyof GradientState, value: string | number) => {
    setGradient((prev) => ({ ...prev, [key]: value }))
    setActivePreset(-1)
  }

  const copyCSSCode = () => {
    navigator.clipboard.writeText(cssCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const applyPreset = (index: number) => {
    setGradient(PRESETS[index].config)
    setActivePreset(index)
  }

  const randomizeGradient = () => {
    const randomColor = () =>
      '#' + Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')

    setGradient({
      color1: randomColor(),
      color2: randomColor(),
      color3: randomColor(),
      gradientAngle: Math.floor(Math.random() * 360),
      grainOpacity: Math.floor(Math.random() * 20) + 2,
      grainColor: '#ffffff',
      pattern1Angle: Math.floor(Math.random() * 90),
      pattern1Size: Math.floor(Math.random() * 30) + 5,
      pattern2Angle: Math.floor(Math.random() * 90) - 90,
      pattern2Size: Math.floor(Math.random() * 30) + 5,
    })
    setActivePreset(-1)
  }

  const backgroundStyle = {
    background: generateBackgroundCSS(),
    backgroundSize: 'cover',
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Preview */}
      <div className="flex-1 relative overflow-hidden shadow-2xl" style={backgroundStyle} />

      {/* Controls Panel */}
      <div className="w-96 bg-white overflow-y-auto flex flex-col gap-8 p-8 border-l border-gray-200">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Gradient Studio
          </h1>
          <p className="text-sm text-gray-500 mt-1">Design beautiful gradient backgrounds</p>
        </div>

        {/* Presets */}
        <div>
          <button
            onClick={() => toggleSection('presets')}
            className="w-full text-xs font-semibold text-gray-700 uppercase tracking-widest mb-4 flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <div className="w-1 h-4 bg-blue-600 rounded"></div>
            Presets
            <span className={`ml-auto transition-transform duration-300 ${expandedSections.presets ? '' : '-rotate-90'}`}>
              ▼
            </span>
          </button>
          {expandedSections.presets && (
          <div className="grid grid-cols-2 gap-3 animate-in fade-in duration-300">
            {PRESETS.map((preset, index) => (
              <button
                key={index}
                onClick={() => applyPreset(index)}
                className={`group relative overflow-hidden rounded-lg transition-all duration-200 ${
                  activePreset === index
                    ? 'ring-2 ring-blue-600 shadow-lg'
                    : 'hover:shadow-md'
                }`}
              >
                <div
                  className="w-full h-20 border-2 transition-all"
                  style={{
                    background: `linear-gradient(${preset.config.gradientAngle}deg, ${preset.config.color1}, ${preset.config.color2}, ${preset.config.color3})`,
                    borderColor: activePreset === index ? '#2563eb' : '#e5e7eb',
                  }}
                />
                <div className={`px-3 py-2 text-xs font-medium text-center transition-all ${
                  activePreset === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-50 text-gray-700 group-hover:bg-gray-100'
                }`}>
                  {preset.name}
                </div>
              </button>
            ))}
          </div>
          )}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Main Gradient */}
        <div>
          <button
            onClick={() => toggleSection('mainGradient')}
            className="w-full text-xs font-semibold text-gray-700 uppercase tracking-widest mb-4 flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <div className="w-1 h-4 bg-emerald-500 rounded"></div>
            Main Gradient
            <span className={`ml-auto transition-transform duration-300 ${expandedSections.mainGradient ? '' : '-rotate-90'}`}>
              ▼
            </span>
          </button>
          {expandedSections.mainGradient && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-4 border border-gray-200">
            {/* Color 1 */}
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Color 1</label>
              <div className="flex gap-3 mt-2">
                <input
                  type="color"
                  value={gradient.color1}
                  onChange={(e) => updateGradient('color1', e.target.value)}
                  className="w-14 h-14 rounded-lg cursor-pointer border-2 border-gray-300 hover:border-blue-400 transition-colors"
                />
                <input
                  type="text"
                  value={gradient.color1}
                  onChange={(e) => {
                    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                      updateGradient('color1', e.target.value)
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Color 2 */}
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Color 2</label>
              <div className="flex gap-3 mt-2">
                <input
                  type="color"
                  value={gradient.color2}
                  onChange={(e) => updateGradient('color2', e.target.value)}
                  className="w-14 h-14 rounded-lg cursor-pointer border-2 border-gray-300 hover:border-blue-400 transition-colors"
                />
                <input
                  type="text"
                  value={gradient.color2}
                  onChange={(e) => {
                    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                      updateGradient('color2', e.target.value)
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Color 3 */}
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Color 3</label>
              <div className="flex gap-3 mt-2">
                <input
                  type="color"
                  value={gradient.color3}
                  onChange={(e) => updateGradient('color3', e.target.value)}
                  className="w-14 h-14 rounded-lg cursor-pointer border-2 border-gray-300 hover:border-blue-400 transition-colors"
                />
                <input
                  type="text"
                  value={gradient.color3}
                  onChange={(e) => {
                    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                      updateGradient('color3', e.target.value)
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Angle */}
            <div className="pt-2">
              <Slider
                label="Angle"
                value={gradient.gradientAngle}
                onChange={(value) => updateGradient('gradientAngle', value)}
                min={0}
                max={360}
                unit="°"
                color="blue"
              />
            </div>
          </div>
          )}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Grain Pattern */}
        <div>
          <button
            onClick={() => toggleSection('grainPattern')}
            className="w-full text-xs font-semibold text-gray-700 uppercase tracking-widest mb-4 flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <div className="w-1 h-4 bg-purple-500 rounded"></div>
            Grain Pattern
            <span className={`ml-auto transition-transform duration-300 ${expandedSections.grainPattern ? '' : '-rotate-90'}`}>
              ▼
            </span>
          </button>
          {expandedSections.grainPattern && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-4 border border-gray-200">
            {/* Grain Opacity */}
            <div>
              <Slider
                label="Grain Opacity"
                value={gradient.grainOpacity}
                onChange={(value) => updateGradient('grainOpacity', value)}
                min={0}
                max={50}
                unit="%"
                color="purple"
              />
            </div>

            {/* Grain Color */}
            <div>
              <label className="text-sm font-medium text-gray-700">Grain Color</label>
              <input
                type="color"
                value={gradient.grainColor}
                onChange={(e) => updateGradient('grainColor', e.target.value)}
                className="w-full h-10 rounded cursor-pointer border-none mt-2"
              />
            </div>

            {/* Pattern 1 Angle */}
            <div>
              <Slider
                label="Pattern 1 Angle"
                value={gradient.pattern1Angle}
                onChange={(value) => updateGradient('pattern1Angle', value)}
                min={0}
                max={360}
                unit="°"
                color="purple"
              />
            </div>

            {/* Pattern 1 Size */}
            <div>
              <Slider
                label="Pattern 1 Size"
                value={gradient.pattern1Size}
                onChange={(value) => updateGradient('pattern1Size', value)}
                min={2}
                max={50}
                unit="px"
                color="purple"
              />
            </div>

            {/* Pattern 2 Angle */}
            <div>
              <Slider
                label="Pattern 2 Angle"
                value={gradient.pattern2Angle}
                onChange={(value) => updateGradient('pattern2Angle', value)}
                min={-180}
                max={180}
                unit="°"
                color="purple"
              />
            </div>

            {/* Pattern 2 Size */}
            <div>
              <Slider
                label="Pattern 2 Size"
                value={gradient.pattern2Size}
                onChange={(value) => updateGradient('pattern2Size', value)}
                min={2}
                max={50}
                unit="px"
                color="purple"
              />
            </div>
          </div>
          )}
        </div>

        <div className="h-px bg-gray-200" />

        {/* CSS Code */}
        <div>
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
            CSS Code
          </h3>
          <div className="bg-gray-50 p-3 rounded border border-gray-200 text-xs font-mono text-gray-700 whitespace-pre-wrap break-words max-h-32 overflow-y-auto">
            {cssCode}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={copyCSSCode}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            {copied ? 'Copied!' : 'Copy CSS'}
          </button>
          <button
            onClick={randomizeGradient}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded transition-colors"
          >
            Randomize
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
