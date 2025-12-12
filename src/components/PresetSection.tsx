import { PRESETS } from '../data/presets'

interface PresetSectionProps {
  activePreset: number
  expanded: boolean
  onToggle: () => void
  onApplyPreset: (index: number) => void
}

export function PresetSection({ activePreset, expanded, onToggle, onApplyPreset }: PresetSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between group cursor-pointer select-none" onClick={onToggle}>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Presets
        </h2>
        <span className={`text-gray-400 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {expanded && (
        <div className="grid grid-cols-2 gap-3 animate-slideDown">
          {PRESETS.map((preset, index) => (
            <button
              key={index}
              onClick={() => onApplyPreset(index)}
              className={`group relative flex flex-col overflow-hidden rounded-xl border transition-all duration-200 hover:shadow-md ${
                activePreset === index
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
  )
}
