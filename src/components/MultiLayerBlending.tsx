import { useState } from 'react'
import Slider from './Slider'
import { GradientTypeSelector } from './GradientTypeSelector'
import { RadialGradientControls } from './RadialGradientControls'
import { ConicGradientControls } from './ConicGradientControls'
import type { GradientState, GradientLayer, GradientType } from '../types'

interface MultiLayerBlendingProps {
  gradient: GradientState
  expanded: boolean
  onToggle: () => void
  onUpdate: (key: keyof GradientState, value: string | number | boolean | GradientLayer[]) => void
}

const BLEND_MODES = [
  'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge',
  'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion',
  'hue', 'saturation', 'color', 'luminosity', 'normal'
]

const createNewLayer = (type: GradientType = 'linear'): GradientLayer => ({
  id: Math.random().toString(36).slice(2),
  type,
  color1: '#ff0000',
  color2: '#0000ff',
  color1Position: 0,
  color2Position: 100,
  opacity: 80,
  blendMode: 'multiply',
  angle: 45,
  radialCenterX: 50,
  radialCenterY: 50,
  radialShape: 'circle',
  radialSize: 'farthest-corner',
  conicAngle: 0,
  conicCenterX: 50,
  conicCenterY: 50,
})

export function MultiLayerBlending({ gradient, expanded, onToggle, onUpdate }: MultiLayerBlendingProps) {
  const [expandedLayerId, setExpandedLayerId] = useState<string | null>(null)

  const handleAddLayer = () => {
    const newLayer = createNewLayer()
    onUpdate('gradientLayers', [...gradient.gradientLayers, newLayer])
  }

  const handleRemoveLayer = (id: string) => {
    onUpdate('gradientLayers', gradient.gradientLayers.filter(layer => layer.id !== id))
  }

  const handleUpdateLayer = (id: string, updates: Partial<GradientLayer>) => {
    const updatedLayers = gradient.gradientLayers.map(layer =>
      layer.id === id ? { ...layer, ...updates } : layer
    )
    onUpdate('gradientLayers', updatedLayers)
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between group cursor-pointer select-none" onClick={onToggle}>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
          Multi-Layer Blending
        </h2>
        <span className={`text-gray-400 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {expanded && (
        <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 space-y-6 animate-slideDown">
          {/* Enable Multi-Layer Blending Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Enable Multi-Layer Blending</span>
            <button
              onClick={() => onUpdate('multiLayerBlendingEnabled', !gradient.multiLayerBlendingEnabled)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none
                ${gradient.multiLayerBlendingEnabled ? 'bg-pink-500' : 'bg-gray-300'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${gradient.multiLayerBlendingEnabled ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          {gradient.multiLayerBlendingEnabled && (
            <div className="space-y-4">
              {/* Layers List */}
              {gradient.gradientLayers.length > 0 && (
                <div className="space-y-2">
                  {gradient.gradientLayers.map((layer, index) => (
                    <div key={layer.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      {/* Layer Header */}
                      <div
                        className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
                        onClick={() => setExpandedLayerId(expandedLayerId === layer.id ? null : layer.id)}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-6 rounded border border-gray-200"
                              style={{ backgroundColor: layer.color1 }}
                            />
                            <span className="text-xs font-semibold text-gray-600">
                              Layer {index + 1}
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-500 capitalize">
                            {layer.type}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveLayer(layer.id)
                          }}
                          className="text-gray-400 hover:text-red-500 transition text-sm font-bold"
                          title="Remove layer"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Layer Content */}
                      {expandedLayerId === layer.id && (
                        <div className="p-4 space-y-4 border-t border-gray-200">
                          {/* Gradient Type */}
                          <div>
                            <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                              Type
                            </div>
                            <GradientTypeSelector
                              gradientType={layer.type}
                              onTypeChange={(type) => handleUpdateLayer(layer.id, { type })}
                            />
                          </div>

                          {/* Colors */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                                Color 1
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="color"
                                  value={layer.color1}
                                  onChange={(e) => handleUpdateLayer(layer.id, { color1: e.target.value })}
                                  className="w-10 h-10 rounded border border-gray-200 cursor-pointer"
                                />
                                <span className="text-xs font-mono text-gray-600">{layer.color1}</span>
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                                Color 2
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="color"
                                  value={layer.color2}
                                  onChange={(e) => handleUpdateLayer(layer.id, { color2: e.target.value })}
                                  className="w-10 h-10 rounded border border-gray-200 cursor-pointer"
                                />
                                <span className="text-xs font-mono text-gray-600">{layer.color2}</span>
                              </div>
                            </div>
                          </div>

                          {/* Positions */}
                          <div className="space-y-2">
                            <Slider
                              label="Color 1 Position"
                              value={layer.color1Position}
                              onChange={(v) => handleUpdateLayer(layer.id, { color1Position: v })}
                              min={0}
                              max={100}
                              unit="%"
                              color="blue"
                            />
                            <Slider
                              label="Color 2 Position"
                              value={layer.color2Position}
                              onChange={(v) => handleUpdateLayer(layer.id, { color2Position: v })}
                              min={0}
                              max={100}
                              unit="%"
                              color="blue"
                            />
                          </div>

                          {/* Opacity */}
                          <Slider
                            label="Opacity"
                            value={layer.opacity}
                            onChange={(v) => handleUpdateLayer(layer.id, { opacity: v })}
                            min={0}
                            max={100}
                            unit="%"
                            color="purple"
                          />

                          {/* Blend Mode */}
                          <div>
                            <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                              Blend Mode
                            </div>
                            <select
                              value={layer.blendMode}
                              onChange={(e) => handleUpdateLayer(layer.id, { blendMode: e.target.value })}
                              className="w-full p-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                            >
                              {BLEND_MODES.map(mode => (
                                <option key={mode} value={mode}>
                                  {mode.replace('-', ' ')}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Type-Specific Controls */}
                          {layer.type === 'linear' && (
                            <Slider
                              label="Angle"
                              value={layer.angle}
                              onChange={(v) => handleUpdateLayer(layer.id, { angle: v })}
                              min={0}
                              max={360}
                              unit="°"
                              color="blue"
                            />
                          )}

                          {layer.type === 'radial' && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <Slider
                                  label="Center X"
                                  value={layer.radialCenterX}
                                  onChange={(v) => handleUpdateLayer(layer.id, { radialCenterX: v })}
                                  min={0}
                                  max={100}
                                  unit="%"
                                  color="purple"
                                />
                                <Slider
                                  label="Center Y"
                                  value={layer.radialCenterY}
                                  onChange={(v) => handleUpdateLayer(layer.id, { radialCenterY: v })}
                                  min={0}
                                  max={100}
                                  unit="%"
                                  color="purple"
                                />
                              </div>
                              <div>
                                <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                                  Shape
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  {(['circle', 'ellipse'] as const).map((shape) => (
                                    <button
                                      key={shape}
                                      onClick={() => handleUpdateLayer(layer.id, { radialShape: shape })}
                                      className={`
                                        p-2 rounded-lg border transition-all duration-200 text-center capitalize text-sm
                                        ${layer.radialShape === shape
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
                                      onClick={() => handleUpdateLayer(layer.id, { radialSize: size })}
                                      className={`
                                        p-2 rounded-lg border transition-all duration-200 text-center text-xs
                                        ${layer.radialSize === size
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
                          )}

                          {layer.type === 'conic' && (
                            <div className="space-y-4">
                              <Slider
                                label="Starting Angle"
                                value={layer.conicAngle}
                                onChange={(v) => handleUpdateLayer(layer.id, { conicAngle: v })}
                                min={0}
                                max={360}
                                unit="°"
                                color="blue"
                              />
                              <div className="grid grid-cols-2 gap-4">
                                <Slider
                                  label="Center X"
                                  value={layer.conicCenterX}
                                  onChange={(v) => handleUpdateLayer(layer.id, { conicCenterX: v })}
                                  min={0}
                                  max={100}
                                  unit="%"
                                  color="purple"
                                />
                                <Slider
                                  label="Center Y"
                                  value={layer.conicCenterY}
                                  onChange={(v) => handleUpdateLayer(layer.id, { conicCenterY: v })}
                                  min={0}
                                  max={100}
                                  unit="%"
                                  color="purple"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Add Layer Button */}
              <button
                onClick={handleAddLayer}
                className="w-full py-2 px-4 rounded-lg border-2 border-dashed border-gray-300 text-gray-600 hover:border-pink-500 hover:text-pink-500 transition font-medium text-sm"
              >
                + Add Layer
              </button>

              {gradient.gradientLayers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No layers added yet</p>
                  <p className="text-xs mt-1">Click "Add Layer" to create your first blending layer</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
