import { useState } from 'react'
import Slider from './Slider'
import { GradientTypeSelector } from './GradientTypeSelector'
import { ColorStop } from './ColorStop'
import { RadialGradientControls } from './RadialGradientControls'
import { ConicGradientControls } from './ConicGradientControls'
import type { GradientState, GradientLayer } from '../types'

interface GradientLayersManagerProps {
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

const createNewLayer = (): GradientLayer => ({
  id: Math.random().toString(36).slice(2),
  type: 'linear',
  color1: '#ff0000',
  color2: '#0000ff',
  color1Position: 0,
  color2Position: 100,
  opacity: 80,
  blendMode: 'screen',
  angle: 45,
  radialCenterX: 50,
  radialCenterY: 50,
  radialShape: 'circle',
  radialSize: 'farthest-corner',
  conicAngle: 0,
  conicCenterX: 50,
  conicCenterY: 50,
})

export function GradientLayersManager({ gradient, expanded, onToggle, onUpdate }: GradientLayersManagerProps) {
  const [expandedLayerId, setExpandedLayerId] = useState<string | null>(null)

  const handleAddLayer = () => {
    const newLayer = createNewLayer()
    onUpdate('gradientLayers', [...gradient.gradientLayers, newLayer])
    // Auto-enable multi-layer blending when first layer is added
    if (!gradient.multiLayerBlendingEnabled) {
      onUpdate('multiLayerBlendingEnabled', true)
    }
    setExpandedLayerId(newLayer.id)
  }

  const handleRemoveLayer = (id: string) => {
    const updatedLayers = gradient.gradientLayers.filter(layer => layer.id !== id)
    onUpdate('gradientLayers', updatedLayers)
    // Disable multi-layer blending if all layers are removed
    if (updatedLayers.length === 0 && gradient.multiLayerBlendingEnabled) {
      onUpdate('multiLayerBlendingEnabled', false)
    }
  }

  const handleUpdateLayer = (id: string, updates: Partial<GradientLayer>) => {
    const updatedLayers = gradient.gradientLayers.map(layer =>
      layer.id === id ? { ...layer, ...updates } : layer
    )
    onUpdate('gradientLayers', updatedLayers)
  }

  const renderLayerControls = (layer: GradientLayer) => (
    <div className="space-y-4">
      {/* Gradient Type */}
      <div>
        <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">Type</div>
        <GradientTypeSelector
          gradientType={layer.type}
          onTypeChange={(type) => handleUpdateLayer(layer.id, { type })}
        />
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">Color 1</div>
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
          <div className="flex-1">
            <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">Color 2</div>
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

      {/* Opacity & Blend Mode */}
      <div className="grid grid-cols-2 gap-4">
        <Slider
          label="Opacity"
          value={layer.opacity}
          onChange={(v) => handleUpdateLayer(layer.id, { opacity: v })}
          min={0}
          max={100}
          unit="%"
          color="purple"
        />
        <div>
          <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">Blend</div>
          <select
            value={layer.blendMode}
            onChange={(e) => handleUpdateLayer(layer.id, { blendMode: e.target.value })}
            className="w-full p-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
          >
            {BLEND_MODES.map(mode => (
              <option key={mode} value={mode}>{mode.replace('-', ' ')}</option>
            ))}
          </select>
        </div>
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
          <div className="grid grid-cols-2 gap-2">
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
          <div className="grid grid-cols-2 gap-2">
            {(['circle', 'ellipse'] as const).map((shape) => (
              <button
                key={shape}
                onClick={() => handleUpdateLayer(layer.id, { radialShape: shape })}
                className={`p-2 rounded-lg border transition-all text-sm capitalize ${
                  layer.radialShape === shape
                    ? 'border-purple-500 bg-purple-50 text-purple-900'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {shape}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(['closest-side', 'closest-corner', 'farthest-side', 'farthest-corner'] as const).map((size) => (
              <button
                key={size}
                onClick={() => handleUpdateLayer(layer.id, { radialSize: size })}
                className={`p-2 rounded-lg border transition-all text-xs ${
                  layer.radialSize === size
                    ? 'border-purple-500 bg-purple-50 text-purple-900'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {size.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      )}

      {layer.type === 'conic' && (
        <div className="space-y-3">
          <Slider
            label="Starting Angle"
            value={layer.conicAngle}
            onChange={(v) => handleUpdateLayer(layer.id, { conicAngle: v })}
            min={0}
            max={360}
            unit="°"
            color="blue"
          />
          <div className="grid grid-cols-2 gap-2">
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
  )

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between group cursor-pointer select-none" onClick={onToggle}>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Gradient Layers
        </h2>
        <span className={`text-gray-400 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {expanded && (
        <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 space-y-6 animate-slideDown">
          {/* Main Gradient Layer */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-900">Base Gradient</span>
                <span className="text-[10px] px-2 py-1 bg-blue-200 text-blue-800 rounded font-mono uppercase">
                  {gradient.gradientType}
                </span>
              </div>
            </div>

            {expandedLayerId === '__main__' && (
              <div className="p-4 space-y-4 border-t border-gray-200">
                <GradientTypeSelector
                  gradientType={gradient.gradientType}
                  onTypeChange={(type) => onUpdate('gradientType', type)}
                />

                <div className="space-y-4">
                  <ColorStop
                    label="Start Color"
                    color={gradient.color1}
                    position={gradient.color1Position}
                    onColorChange={(color) => onUpdate('color1', color)}
                    onPositionChange={(pos) => onUpdate('color1Position', pos)}
                  />
                  <ColorStop
                    label="Middle Color"
                    color={gradient.color2}
                    position={gradient.color2Position}
                    onColorChange={(color) => onUpdate('color2', color)}
                    onPositionChange={(pos) => onUpdate('color2Position', pos)}
                  />
                  <ColorStop
                    label="End Color"
                    color={gradient.color3}
                    position={gradient.color3Position}
                    onColorChange={(color) => onUpdate('color3', color)}
                    onPositionChange={(pos) => onUpdate('color3Position', pos)}
                  />
                </div>

                {gradient.gradientType === 'linear' && (
                  <Slider
                    label="Angle"
                    value={gradient.gradientAngle}
                    onChange={(v) => onUpdate('gradientAngle', v)}
                    min={0}
                    max={360}
                    unit="°"
                    color="blue"
                  />
                )}

                {gradient.gradientType === 'radial' && (
                  <div>
                    <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-3">Position</div>
                    <div className="grid grid-cols-2 gap-2">
                      <Slider
                        label="Center X"
                        value={gradient.radialCenterX}
                        onChange={(v) => onUpdate('radialCenterX', v)}
                        min={0}
                        max={100}
                        unit="%"
                        color="purple"
                      />
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
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">Shape</div>
                        <div className="grid grid-cols-2 gap-2">
                          {(['circle', 'ellipse'] as const).map((shape) => (
                            <button
                              key={shape}
                              onClick={() => onUpdate('radialShape', shape)}
                              className={`p-2 rounded-lg border transition-all text-xs capitalize ${
                                gradient.radialShape === shape
                                  ? 'border-purple-500 bg-purple-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {shape}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">Size</div>
                        <select
                          value={gradient.radialSize}
                          onChange={(e) => onUpdate('radialSize', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
                        >
                          {(['closest-side', 'closest-corner', 'farthest-side', 'farthest-corner'] as const).map((size) => (
                            <option key={size} value={size}>{size.replace('-', ' ')}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {gradient.gradientType === 'conic' && (
                  <div className="space-y-3">
                    <Slider
                      label="Starting Angle"
                      value={gradient.conicAngle}
                      onChange={(v) => onUpdate('conicAngle', v)}
                      min={0}
                      max={360}
                      unit="°"
                      color="blue"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Slider
                        label="Center X"
                        value={gradient.conicCenterX}
                        onChange={(v) => onUpdate('conicCenterX', v)}
                        min={0}
                        max={100}
                        unit="%"
                        color="purple"
                      />
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
                )}
              </div>
            )}

            <button
              onClick={() => setExpandedLayerId(expandedLayerId === '__main__' ? null : '__main__')}
              className="w-full p-2 text-gray-600 hover:bg-blue-50 transition text-xs font-medium"
            >
              {expandedLayerId === '__main__' ? '▼ Hide' : '▶ Edit'}
            </button>
          </div>

          {/* Blend Layers */}
          {gradient.gradientLayers.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-600 uppercase tracking-widest">Blend Layers</h3>
              {gradient.gradientLayers.map((layer, index) => (
                <div key={layer.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div
                    className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => setExpandedLayerId(expandedLayerId === layer.id ? null : layer.id)}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-6 h-6 rounded bg-gradient-to-br" style={{
                        backgroundImage: `linear-gradient(135deg, ${layer.color1}, ${layer.color2})`
                      }} />
                      <span className="text-xs font-semibold text-gray-700">Layer {index + 2}</span>
                      <span className="text-[10px] text-gray-500 capitalize">{layer.type}</span>
                      <span className="text-[10px] text-gray-500 ml-auto">{layer.opacity}%</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveLayer(layer.id)
                      }}
                      className="text-gray-400 hover:text-red-500 transition text-sm font-bold ml-2"
                    >
                      ✕
                    </button>
                  </div>

                  {expandedLayerId === layer.id && (
                    <div className="p-4 space-y-4 border-t border-gray-200">
                      {renderLayerControls(layer)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Add Layer Button */}
          <button
            onClick={handleAddLayer}
            className="w-full py-2 px-4 rounded-lg border-2 border-dashed border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition font-medium text-sm"
          >
            + Add Blend Layer
          </button>
        </div>
      )}
    </section>
  )
}
