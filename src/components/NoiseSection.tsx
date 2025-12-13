import type { GradientState } from '../types'

interface NoiseSectionProps {
  gradient: GradientState
  expanded: boolean
  onToggle: () => void
  onUpdateGradient: (key: keyof GradientState, value: string | number | boolean) => void
}

export function NoiseSection({ gradient, expanded, onToggle, onUpdateGradient }: NoiseSectionProps) {
  return (
    <div className="space-y-5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-50 text-purple-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900">Noise Texture</h2>
        </div>
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <svg
            className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Noise Controls */}
      {expanded && (
        <div className="space-y-5 animate-slideDown">
          {/* Enable Noise */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={gradient.noiseEnabled}
              onChange={(e) => onUpdateGradient('noiseEnabled', e.target.checked)}
              className="w-5 h-5 text-purple-600 rounded-md border-gray-300 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
            />
            <span className="text-sm font-medium text-gray-700">Enable noise overlay</span>
          </label>

          {gradient.noiseEnabled && (
            <>
              {/* Noise Opacity */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Opacity</label>
                  <span className="text-sm text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded-md">
                    {gradient.noiseOpacity}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={gradient.noiseOpacity}
                  onChange={(e) => onUpdateGradient('noiseOpacity', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 transition-all hover:bg-gray-300"
                />
              </div>

              {/* Noise Size */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Size</label>
                  <span className="text-sm text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded-md">
                    {gradient.noiseSize}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={gradient.noiseSize}
                  onChange={(e) => onUpdateGradient('noiseSize', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 transition-all hover:bg-gray-300"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}