import { useState } from 'react'
import Slider from './components/Slider'

interface GradientState {
  color1: string
  color2: string
  color3: string
  color1Opacity: number
  color2Opacity: number
  color3Opacity: number
  color1Position: number
  color2Position: number
  color3Position: number
  gradientAngle: number
  patternOpacity: number
  patternColor: string
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
      color1Opacity: 100,
      color2Opacity: 100,
      color3Opacity: 100,
      color1Position: 0,
      color2Position: 50,
      color3Position: 100,
      gradientAngle: 135,
      patternOpacity: 5,
      patternColor: '#ffffff',
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
      color1Opacity: 100,
      color2Opacity: 100,
      color3Opacity: 100,
      color1Position: 0,
      color2Position: 50,
      color3Position: 100,
      gradientAngle: 45,
      patternOpacity: 3,
      patternColor: '#ffffff',
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
      color1Opacity: 100,
      color2Opacity: 100,
      color3Opacity: 100,
      color1Position: 0,
      color2Position: 50,
      color3Position: 100,
      gradientAngle: 180,
      patternOpacity: 8,
      patternColor: '#ffffff',
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
      color1Opacity: 100,
      color2Opacity: 100,
      color3Opacity: 100,
      color1Position: 0,
      color2Position: 50,
      color3Position: 100,
      gradientAngle: 120,
      patternOpacity: 6,
      patternColor: '#ffffff',
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
      color1Opacity: 100,
      color2Opacity: 100,
      color3Opacity: 100,
      color1Position: 0,
      color2Position: 50,
      color3Position: 100,
      gradientAngle: 315,
      patternOpacity: 7,
      patternColor: '#ffffff',
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
      color1Opacity: 100,
      color2Opacity: 100,
      color3Opacity: 100,
      color1Position: 0,
      color2Position: 50,
      color3Position: 100,
      gradientAngle: 90,
      patternOpacity: 2,
      patternColor: '#000000',
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
      color1Opacity: 100,
      color2Opacity: 100,
      color3Opacity: 100,
      color1Position: 0,
      color2Position: 50,
      color3Position: 100,
      gradientAngle: 225,
      patternOpacity: 10,
      patternColor: '#ffffff',
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
      color1Opacity: 100,
      color2Opacity: 100,
      color3Opacity: 100,
      color1Position: 0,
      color2Position: 50,
      color3Position: 100,
      gradientAngle: 135,
      patternOpacity: 4,
      patternColor: '#ffffff',
      pattern1Angle: 45,
      pattern1Size: 12,
      pattern2Angle: -45,
      pattern2Size: 12,
    },
  },
  {
    name: 'Ruby Storm',
    config: {
      color1: '#663135',
      color2: '#0f89db',
      color3: '#e2fa38',
      color1Opacity: 68,
      color2Opacity: 91,
      color3Opacity: 93,
      color1Position: 23,
      color2Position: 63,
      color3Position: 91,
      gradientAngle: 62,
      patternOpacity: 3,
      patternColor: '#ffffff',
      pattern1Angle: 154,
      pattern1Size: 8,
      pattern2Angle: -119,
      pattern2Size: 6,
    },
  },
  {
    name: 'Cyber Teal',
    config: {
      color1: '#31febc',
      color2: '#1414be',
      color3: '#58413a',
      color1Opacity: 87,
      color2Opacity: 69,
      color3Opacity: 83,
      color1Position: 20,
      color2Position: 42,
      color3Position: 75,
      gradientAngle: 12,
      patternOpacity: 3,
      patternColor: '#ffffff',
      pattern1Angle: 93,
      pattern1Size: 2,
      pattern2Angle: -131,
      pattern2Size: 2,
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
    const patternRGB = hexToRgb(gradient.patternColor)
    const patternOpacityDecimal = (gradient.patternOpacity / 100).toFixed(2)

    // Convert hex colors to rgba with opacity
    const color1RGB = hexToRgb(gradient.color1)
    const color2RGB = hexToRgb(gradient.color2)
    const color3RGB = hexToRgb(gradient.color3)

    const color1Opacity = (gradient.color1Opacity / 100).toFixed(2)
    const color2Opacity = (gradient.color2Opacity / 100).toFixed(2)
    const color3Opacity = (gradient.color3Opacity / 100).toFixed(2)

    const color1 = `rgba(${color1RGB.r}, ${color1RGB.g}, ${color1RGB.b}, ${color1Opacity})`
    const color2 = `rgba(${color2RGB.r}, ${color2RGB.g}, ${color2RGB.b}, ${color2Opacity})`
    const color3 = `rgba(${color3RGB.r}, ${color3RGB.g}, ${color3RGB.b}, ${color3Opacity})`

    return `repeating-linear-gradient(${gradient.pattern1Angle}deg, rgba(${patternRGB.r}, ${patternRGB.g}, ${patternRGB.b}, ${patternOpacityDecimal}) 0px, rgba(${patternRGB.r}, ${patternRGB.g}, ${patternRGB.b}, ${patternOpacityDecimal}) ${gradient.pattern1Size}px, transparent ${gradient.pattern1Size + 4}px, transparent ${gradient.pattern1Size + 5}px),
repeating-linear-gradient(${gradient.pattern2Angle}deg, rgba(${patternRGB.r}, ${patternRGB.g}, ${patternRGB.b}, ${patternOpacityDecimal}) 0px, rgba(${patternRGB.r}, ${patternRGB.g}, ${patternRGB.b}, ${patternOpacityDecimal}) ${gradient.pattern2Size}px, transparent ${gradient.pattern2Size + 4}px, transparent ${gradient.pattern2Size + 5}px),
linear-gradient(${gradient.gradientAngle}deg, ${color1} ${gradient.color1Position}%, ${color2} ${gradient.color2Position}%, ${color3} ${gradient.color3Position}%)`
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

    const pos1 = Math.floor(Math.random() * 30)
    const pos2 = Math.floor(Math.random() * 40) + 30
    const pos3 = Math.floor(Math.random() * 30) + 70

    setGradient({
      color1: randomColor(),
      color2: randomColor(),
      color3: randomColor(),
      color1Opacity: Math.floor(Math.random() * 40) + 60,
      color2Opacity: Math.floor(Math.random() * 40) + 60,
      color3Opacity: Math.floor(Math.random() * 40) + 60,
      color1Position: pos1,
      color2Position: pos2,
      color3Position: pos3,
      gradientAngle: Math.floor(Math.random() * 360),
      patternOpacity: Math.floor(Math.random() * 20) + 2,
      patternColor: '#ffffff',
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
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">

      {/* Sidebar Controls */}
      <div className="w-[400px] flex-shrink-0 flex flex-col bg-white border-r border-gray-200 h-full shadow-xl z-20 transition-all duration-300">

        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-white/50 backdrop-blur-sm sticky top-0 z-30">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-2">
            <span className="text-2xl">✨</span> Gradient Labs
          </h1>
          <p className="text-sm text-gray-500 mt-1 pl-9">Craft beautiful gradients & patterns</p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

          {/* Presets Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between group cursor-pointer select-none" onClick={() => toggleSection('presets')}>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                Presets
              </h2>
              <span className={`text-gray-400 transition-transform duration-300 ${expandedSections.presets ? 'rotate-180' : ''}`}>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </div>

            {expandedSections.presets && (
              <div className="grid grid-cols-2 gap-3 animate-slideDown">
                {PRESETS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyPreset(index)}
                    className={`group relative flex flex-col overflow-hidden rounded-xl border transition-all duration-200 hover:shadow-md ${activePreset === index
                        ? 'border-blue-500 ring-1 ring-blue-500 ring-offset-2'
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div
                      className="h-16 w-full"
                      style={{
                        background: `linear-gradient(${preset.config.gradientAngle}deg, ${preset.config.color1}, ${preset.config.color2}, ${preset.config.color3})`
                      }}
                    />
                    <div className="px-3 py-2 bg-white text-xs font-medium text-gray-700 text-left group-hover:text-blue-600 transition-colors">
                      {preset.name}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>

          <hr className="border-gray-100" />

          {/* Main Gradient Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between group cursor-pointer select-none" onClick={() => toggleSection('mainGradient')}>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Main Colors
              </h2>
              <span className={`text-gray-400 transition-transform duration-300 ${expandedSections.mainGradient ? 'rotate-180' : ''}`}>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </div>

            {expandedSections.mainGradient && (
              <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 space-y-6 animate-slideDown">
                {/* Color Stops */}
                <div className="space-y-4">
                  {/* Color 1 */}
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="relative group flex-shrink-0">
                        <div
                          className="w-10 h-10 rounded-lg shadow-inner border border-gray-200"
                          style={{ backgroundColor: gradient.color1 }}
                        />
                        <input
                          type="color"
                          value={gradient.color1}
                          onChange={(e) => updateGradient('color1', e.target.value)}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                      </div>
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-gray-700">Start Color</span>
                          <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 font-mono uppercase">{gradient.color1}</span>
                        </div>
                        <Slider value={gradient.color1Position} onChange={(v) => updateGradient('color1Position', v)} min={0} max={100} unit="%" color="blue" />
                      </div>
                    </div>
                  </div>

                  {/* Color 2 */}
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="relative group flex-shrink-0">
                        <div
                          className="w-10 h-10 rounded-lg shadow-inner border border-gray-200"
                          style={{ backgroundColor: gradient.color2 }}
                        />
                        <input
                          type="color"
                          value={gradient.color2}
                          onChange={(e) => updateGradient('color2', e.target.value)}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                      </div>
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-gray-700">Middle Color</span>
                          <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 font-mono uppercase">{gradient.color2}</span>
                        </div>
                        <Slider value={gradient.color2Position} onChange={(v) => updateGradient('color2Position', v)} min={0} max={100} unit="%" color="blue" />
                      </div>
                    </div>
                  </div>

                  {/* Color 3 */}
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="relative group flex-shrink-0">
                        <div
                          className="w-10 h-10 rounded-lg shadow-inner border border-gray-200"
                          style={{ backgroundColor: gradient.color3 }}
                        />
                        <input
                          type="color"
                          value={gradient.color3}
                          onChange={(e) => updateGradient('color3', e.target.value)}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                      </div>
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-gray-700">End Color</span>
                          <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 font-mono uppercase">{gradient.color3}</span>
                        </div>
                        <Slider value={gradient.color3Position} onChange={(v) => updateGradient('color3Position', v)} min={0} max={100} unit="%" color="blue" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200/50">
                  <div className="relative pt-4">
                    <div className="absolute top-0 left-0 text-gray-400 text-[10px] font-bold uppercase tracking-wider">Global Angle</div>
                    <Slider value={gradient.gradientAngle} onChange={(v) => updateGradient('gradientAngle', v)} min={0} max={360} unit="°" color="blue" />
                  </div>
                </div>
              </div>
            )}
          </section>

          <hr className="border-gray-100" />

          {/* Pattern Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between group cursor-pointer select-none" onClick={() => toggleSection('grainPattern')}>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                Pattern & Grain
              </h2>
              <span className={`text-gray-400 transition-transform duration-300 ${expandedSections.grainPattern ? 'rotate-180' : ''}`}>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </div>

            {expandedSections.grainPattern && (
              <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 space-y-6 animate-slideDown">

                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <label className="text-xs font-semibold text-gray-700 flex-1">Pattern Color</label>
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 ring-2 ring-gray-50">
                    <input
                      type="color"
                      value={gradient.patternColor}
                      onChange={(e) => updateGradient('patternColor', e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-[150%] h-[150%] -top-1/4 -left-1/4"
                    />
                    <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: gradient.patternColor }} />
                  </div>
                </div>

                <div className="space-y-6 px-1">
                  <Slider label="Opacity" value={gradient.patternOpacity} onChange={(v) => updateGradient('patternOpacity', v)} min={0} max={50} unit="%" color="purple" />
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    <Slider label="Angle 1" value={gradient.pattern1Angle} onChange={(v) => updateGradient('pattern1Angle', v)} min={0} max={360} unit="°" color="purple" />
                    <Slider label="Size 1" value={gradient.pattern1Size} onChange={(v) => updateGradient('pattern1Size', v)} min={2} max={50} unit="px" color="purple" />
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    <Slider label="Angle 2" value={gradient.pattern2Angle} onChange={(v) => updateGradient('pattern2Angle', v)} min={-180} max={180} unit="°" color="purple" />
                    <Slider label="Size 2" value={gradient.pattern2Size} onChange={(v) => updateGradient('pattern2Size', v)} min={2} max={50} unit="px" color="purple" />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* CSS Output - Inline Block */}
          <section className="space-y-3 pt-4 pb-20">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Generate CSS</h2>
            <div className="relative group">
              <div className="bg-slate-900 rounded-xl p-4 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto shadow-inner border border-slate-800 custom-scrollbar">
                {cssCode}
              </div>
              <button
                onClick={copyCSSCode}
                className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </section>

        </div>

        {/* Footer - Fixed */}
        <div className="p-4 border-t border-gray-200 bg-gray-50/80 backdrop-blur absolute bottom-0 w-full z-30">
          <button
            onClick={randomizeGradient}
            className="w-full py-3 bg-white border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <span>🎲</span> Randomize Style
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 relative bg-gray-200 flex flex-col items-center justify-center p-8 overflow-hidden">
        {/* Transparency Checkboard BG */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)`,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        />

        {/* The Gradient Card */}
        <div
          className="w-full h-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl relative overflow-hidden ring-8 ring-white/40 backdrop-blur-xl transition-all duration-500 ease-out"
          style={backgroundStyle}
        >
          {/* Optional: Add some overlay UI in the preview to show it's "Live" */}
          <div className="absolute bottom-8 left-8 text-white/90 text-sm font-medium px-4 py-2 bg-black/20 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Live Preview
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
