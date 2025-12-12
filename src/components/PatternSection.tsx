import Slider from './Slider'
import type { GradientState } from '../types'

interface PatternSectionProps {
  gradient: GradientState
  expandedPattern: boolean
  expandedCard: boolean
  onTogglePattern: () => void
  onToggleCard: () => void
  onUpdateGradient: (key: keyof GradientState, value: string | number | boolean) => void
}

export function PatternSection({
  gradient,
  expandedPattern,
  expandedCard,
  onTogglePattern,
  onToggleCard,
  onUpdateGradient
}: PatternSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between group cursor-pointer select-none" onClick={onTogglePattern}>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
          Pattern & Grain
        </h2>
        <span className={`text-gray-400 transition-transform duration-300 ${expandedPattern ? 'rotate-180' : ''}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {expandedPattern && (
        <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 space-y-4 animate-slideDown">
          {/* Pattern Card Header */}
          <div className="flex items-center justify-between group cursor-pointer select-none" onClick={onToggleCard}>
            <h3 className="text-xs font-bold text-gray-600 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-purple-500"></span>
              Grid Settings
            </h3>
            <span className={`text-gray-400 transition-transform duration-300 ${expandedCard ? 'rotate-180' : ''}`}>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          {expandedCard && (
            <div className="space-y-6 animate-slideDown">
              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <input
                  type="checkbox"
                  checked={gradient.patternEnabled}
                  onChange={(e) => onUpdateGradient('patternEnabled', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                />
                <label className="text-xs font-semibold text-gray-700 flex-1 cursor-pointer">Enable Grid</label>
              </div>

              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <label className="text-xs font-semibold text-gray-700 flex-1">Grid Color</label>
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-500 ring-2 ring-gray-50">
                  <input
                    type="color"
                    value={gradient.patternColor}
                    onChange={(e) => onUpdateGradient('patternColor', e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-[150%] h-[150%] -top-1/4 -left-1/4"
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: gradient.patternColor }} />
                </div>
              </div>

              <div className="space-y-6 px-1">
                <Slider
                  label="Opacity"
                  value={gradient.patternOpacity}
                  onChange={(v) => onUpdateGradient('patternOpacity', v)}
                  min={0}
                  max={50}
                  unit="%"
                  color="purple"
                />
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <Slider
                    label="Angle 1"
                    value={gradient.pattern1Angle}
                    onChange={(v) => onUpdateGradient('pattern1Angle', v)}
                    min={0}
                    max={360}
                    unit="°"
                    color="purple"
                  />
                  <Slider
                    label="Size 1"
                    value={gradient.pattern1Size}
                    onChange={(v) => onUpdateGradient('pattern1Size', v)}
                    min={2}
                    max={50}
                    unit="px"
                    color="purple"
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <Slider
                    label="Angle 2"
                    value={gradient.pattern2Angle}
                    onChange={(v) => onUpdateGradient('pattern2Angle', v)}
                    min={-180}
                    max={180}
                    unit="°"
                    color="purple"
                  />
                  <Slider
                    label="Size 2"
                    value={gradient.pattern2Size}
                    onChange={(v) => onUpdateGradient('pattern2Size', v)}
                    min={2}
                    max={50}
                    unit="px"
                    color="purple"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
