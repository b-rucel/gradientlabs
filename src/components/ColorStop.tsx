import Slider from './Slider'

interface ColorStopProps {
  label: string
  color: string
  position: number
  onColorChange: (color: string) => void
  onPositionChange: (position: number) => void
}

export function ColorStop({ label, color, position, onColorChange, onPositionChange }: ColorStopProps) {
  return (
    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="relative group flex-shrink-0">
          <div
            className="w-10 h-10 rounded-lg shadow-inner border border-gray-200"
            style={{ backgroundColor: color }}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => onColorChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </div>
        <div className="flex-1 space-y-2 min-w-0">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-700">{label}</span>
            <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 font-mono uppercase">
              {color}
            </span>
          </div>
          <Slider
            value={position}
            onChange={onPositionChange}
            min={0}
            max={100}
            unit="%"
            color="blue"
          />
        </div>
      </div>
    </div>
  )
}
