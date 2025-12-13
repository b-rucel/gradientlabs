import Slider from './Slider'
import type { GradientState } from '../types'

interface ConicGradientControlsProps {
  gradient: GradientState
  onUpdate: (key: keyof GradientState, value: string | number) => void
}

export function ConicGradientControls({ gradient, onUpdate }: ConicGradientControlsProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">
          Starting Angle
        </div>
        <Slider
          label="Starting Angle"
          value={gradient.conicAngle}
          onChange={(v) => onUpdate('conicAngle', v)}
          min={0}
          max={360}
          unit="°"
          color="blue"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">
            Center X
          </div>
          <Slider
            label="Center X"
            value={gradient.conicCenterX}
            onChange={(v) => onUpdate('conicCenterX', v)}
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
            value={gradient.conicCenterY}
            onChange={(v) => onUpdate('conicCenterY', v)}
            min={0}
            max={100}
            unit="%"
            color="purple"
          />
        </div>
      </div>
    </div>
  )
}