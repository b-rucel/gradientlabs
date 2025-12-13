import Slider from './Slider'
import { GradientTypeSelector } from './GradientTypeSelector'
import { ColorStop } from './ColorStop'
import { RadialGradientControls } from './RadialGradientControls'
import { ConicGradientControls } from './ConicGradientControls'
import type { GradientState } from '../types'

interface BlendingSectionProps {
  gradient: GradientState
  expanded: boolean
  onToggle: () => void
  onUpdate: (key: keyof GradientState, value: string | number | boolean) => void
}

export function BlendingSection({ gradient, expanded, onToggle, onUpdate }: BlendingSectionProps) {
  const blendModes = [
    'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge',
    'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion',
    'hue', 'saturation', 'color', 'luminosity', 'normal'
  ]

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between group cursor-pointer select-none" onClick={onToggle}>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
          Blending
        </h2>
        <span className={`text-gray-400 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {expanded && (
        <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 space-y-6 animate-slideDown">
          {/* Enable Blending Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Enable Blending</span>
            <button
              onClick={() => onUpdate('blendingEnabled', !gradient.blendingEnabled)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none
                ${gradient.blendingEnabled ? 'bg-pink-500' : 'bg-gray-300'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${gradient.blendingEnabled ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          {gradient.blendingEnabled && (
            <>
              {/* Blend Mode Selection */}
              <div>
                <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-3">
                  Blend Mode
                </div>
                <select
                  value={gradient.blendMode}
                  onChange={(e) => onUpdate('blendMode', e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  {blendModes.map(mode => (
                    <option key={mode} value={mode}>
                      {mode.replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Second Gradient Type */}
              <div>
                <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-3">
                  Secondary Gradient Type
                </div>
                <GradientTypeSelector
                  gradientType={gradient.secondGradientType}
                  onTypeChange={(type) => onUpdate('secondGradientType', type)}
                />
              </div>

              {/* Second Gradient Type-Specific Controls */}
              <div className="space-y-4">
                <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                  Secondary Controls
                </div>
                {gradient.secondGradientType === 'linear' && (
                  <div>
                    <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                      Secondary Angle
                    </div>
                    <Slider
                      label="Secondary Angle"
                      value={gradient.secondGradientAngle}
                      onChange={(v) => onUpdate('secondGradientAngle', v)}
                      min={0}
                      max={360}
                      unit="°"
                      color="purple"
                    />
                  </div>
                )}

                {gradient.secondGradientType === 'radial' && (
                  <RadialGradientControls
                    gradient={gradient}
                    onUpdate={onUpdate}
                  />
                )}

                {gradient.secondGradientType === 'conic' && (
                  <ConicGradientControls
                    gradient={gradient}
                    onUpdate={onUpdate}
                  />
                )}
              </div>

              {/* Second Gradient Colors */}
              <div className="space-y-4">
                <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                  Secondary Gradient Colors
                </div>
                <ColorStop
                  label="Start Color"
                  color={gradient.secondColor1}
                  position={gradient.secondColor1Position}
                  onColorChange={(color) => onUpdate('secondColor1', color)}
                  onPositionChange={(pos) => onUpdate('secondColor1Position', pos)}
                />
                <ColorStop
                  label="End Color"
                  color={gradient.secondColor2}
                  position={gradient.secondColor2Position}
                  onColorChange={(color) => onUpdate('secondColor2', color)}
                  onPositionChange={(pos) => onUpdate('secondColor2Position', pos)}
                />
              </div>
            </>
          )}
        </div>
      )}
    </section>
  )
}