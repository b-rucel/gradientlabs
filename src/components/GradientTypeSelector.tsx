import type { GradientState, GradientType } from '../types'

interface GradientTypeSelectorProps {
  gradientType: GradientType
  onTypeChange: (type: GradientType) => void
}

export function GradientTypeSelector({ gradientType, onTypeChange }: GradientTypeSelectorProps) {
  const types: { value: GradientType; label: string; description: string }[] = [
    { value: 'linear', label: 'Linear', description: 'Straight line gradient' },
    { value: 'radial', label: 'Radial', description: 'Circular gradient' },
    { value: 'conic', label: 'Conic', description: 'Conical gradient' },
  ]

  return (
    <div className="space-y-3">
      <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
        Gradient Type
      </div>
      <div className="grid grid-cols-3 gap-2">
        {types.map(({ value, label, description }) => (
          <button
            key={value}
            onClick={() => onTypeChange(value)}
            className={`
              relative p-3 rounded-lg border transition-all duration-200 text-left
              ${gradientType === value
                ? 'border-blue-500 bg-blue-50 text-blue-900'
                : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
              }
            `}
            title={description}
          >
            <div className="font-medium text-sm">{label}</div>
            <div className="text-xs text-gray-500 mt-1">{description}</div>
            {gradientType === value && (
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}