import Slider from './Slider'
import type { GradientState } from '../types'

interface RadialGradientControlsProps {
  gradient: GradientState
  onUpdate: (key: keyof GradientState, value: string | number) => void
}

export function RadialGradientControls({ gradient, onUpdate }: RadialGradientControlsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">
            Center X
          </div>
          <Slider
            label="Center X"
            value={gradient.radialCenterX}
            onChange={(v) => onUpdate('radialCenterX', v)}
            min={0}
            max={100}
            unit="%"
            color="purple"
          />
        </div>
        <div>
          <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">
            Center Y
          </div>
          <Slider
            label="Center Y"
            value={gradient.radialCenterY}
            onChange={(v) => onUpdate('radialCenterY', v)}
            min={0}
            max={100}
            unit="%"
            color="purple"
          />
        </div>
      </div>

      <div>
        <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">
          Shape
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(['circle', 'ellipse'] as const).map((shape) => (
            <button
              key={shape}
              onClick={() => onUpdate('radialShape', shape)}
              className={`
                p-2 rounded-lg border transition-all duration-200 text-center capitalize
                ${gradient.radialShape === shape
                  ? 'border-purple-500 bg-purple-50 text-purple-900'
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                }
              `}
            >
              {shape}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">
          Size
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(['closest-side', 'closest-corner', 'farthest-side', 'farthest-corner'] as const).map((size) => (
            <button
              key={size}
              onClick={() => onUpdate('radialSize', size)}
              className={`
                p-2 rounded-lg border transition-all duration-200 text-center text-xs
                ${gradient.radialSize === size
                  ? 'border-purple-500 bg-purple-50 text-purple-900'
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                }
              `}
            >
              {size.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}