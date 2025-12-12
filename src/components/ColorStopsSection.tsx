import Slider from './Slider'
import { ColorStop } from './ColorStop'
import type { GradientState } from '../types'

interface ColorStopsSectionProps {
  gradient: GradientState
  expanded: boolean
  onToggle: () => void
  onUpdateGradient: (key: keyof GradientState, value: string | number) => void
}

export function ColorStopsSection({ gradient, expanded, onToggle, onUpdateGradient }: ColorStopsSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between group cursor-pointer select-none" onClick={onToggle}>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Main Colors
        </h2>
        <span className={`text-gray-400 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {expanded && (
        <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 space-y-6 animate-slideDown">
          {/* Color Stops */}
          <div className="space-y-4">
            <ColorStop
              label="Start Color"
              color={gradient.color1}
              position={gradient.color1Position}
              onColorChange={(color) => onUpdateGradient('color1', color)}
              onPositionChange={(pos) => onUpdateGradient('color1Position', pos)}
            />

            <ColorStop
              label="Middle Color"
              color={gradient.color2}
              position={gradient.color2Position}
              onColorChange={(color) => onUpdateGradient('color2', color)}
              onPositionChange={(pos) => onUpdateGradient('color2Position', pos)}
            />

            <ColorStop
              label="End Color"
              color={gradient.color3}
              position={gradient.color3Position}
              onColorChange={(color) => onUpdateGradient('color3', color)}
              onPositionChange={(pos) => onUpdateGradient('color3Position', pos)}
            />
          </div>

          <div className="pt-2 border-t border-gray-200/50">
            <div className="relative pt-4">
              <div className="absolute top-0 left-0 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                Global Angle
              </div>
              <Slider
                label="Global Angle"
                value={gradient.gradientAngle}
                onChange={(v) => onUpdateGradient('gradientAngle', v)}
                min={0}
                max={360}
                unit="°"
                color="blue"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
