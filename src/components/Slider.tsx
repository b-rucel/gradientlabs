interface SliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  unit?: string
  color?: 'blue' | 'purple'
}

export default function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  unit = '',
  color = 'blue',
}: SliderProps) {
  const colorClasses = {
    blue: 'slider-blue',
    purple: 'slider-purple',
  }

  return (
    <div className="slider-container">
      <div className="flex justify-between items-center mb-3">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          {label}
        </label>
        <span className={`text-sm font-bold px-2 py-1 rounded ${
          color === 'blue'
            ? 'text-blue-600 bg-blue-50'
            : 'text-purple-600 bg-purple-50'
        }`}>
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={`custom-slider w-full ${colorClasses[color]}`}
      />
    </div>
  )
}
