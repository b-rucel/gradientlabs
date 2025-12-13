import { SidebarHeader } from './SidebarHeader'
import { PresetSection } from './PresetSection'
import { GradientLayersManager } from './GradientLayersManager'
import { PatternSection } from './PatternSection'
import { NoiseSection } from './NoiseSection'
import { CSSOutput } from './CSSOutput'
import type { GradientState, GradientLayer } from '../types'

type ExpandedSections = {
  presets: boolean
  gradientLayers: boolean
  grainPattern: boolean
  patternCard: boolean
  noiseTexture: boolean
}

interface SidebarProps {
  gradient: GradientState
  activePreset: number
  isDownloading: boolean
  copied: boolean
  expandedSections: ExpandedSections
  cssCode: string
  onUpdateGradient: (key: keyof GradientState, value: string | number | boolean | GradientLayer[]) => void
  onApplyPreset: (index: number) => void
  onRandomize: () => void
  onDownload: () => void
  onToggleSection: (section: keyof ExpandedSections) => void
  onCopyCSSCode: () => void
}

export function Sidebar({
  gradient,
  activePreset,
  isDownloading,
  copied,
  expandedSections,
  cssCode,
  onUpdateGradient,
  onApplyPreset,
  onRandomize,
  onDownload,
  onToggleSection,
  onCopyCSSCode
}: SidebarProps) {
  return (
    <div className="w-[400px] flex-shrink-0 flex flex-col bg-white border-r border-gray-200 h-full shadow-xl z-20 transition-all duration-300">
      <SidebarHeader
        isDownloading={isDownloading}
        onDownload={onDownload}
        onRandomize={onRandomize}
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar pb-10">
        <PresetSection
          activePreset={activePreset}
          expanded={expandedSections.presets}
          onToggle={() => onToggleSection('presets')}
          onApplyPreset={onApplyPreset}
        />

        <hr className="border-gray-100" />

        <GradientLayersManager
          gradient={gradient}
          expanded={expandedSections.gradientLayers}
          onToggle={() => onToggleSection('gradientLayers')}
          onUpdate={onUpdateGradient}
        />

        <hr className="border-gray-100" />

        <PatternSection
          gradient={gradient}
          expandedPattern={expandedSections.grainPattern}
          expandedCard={expandedSections.patternCard}
          onTogglePattern={() => onToggleSection('grainPattern')}
          onToggleCard={() => onToggleSection('patternCard')}
          onUpdateGradient={onUpdateGradient}
        />

        <hr className="border-gray-100" />

        <NoiseSection
          gradient={gradient}
          expanded={expandedSections.noiseTexture}
          onToggle={() => onToggleSection('noiseTexture')}
          onUpdateGradient={onUpdateGradient}
        />

        <CSSOutput
          cssCode={cssCode}
          copied={copied}
          onCopy={onCopyCSSCode}
        />
      </div>
    </div>
  )
}
