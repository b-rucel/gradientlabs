export type GradientType = 'linear' | 'radial' | 'conic'

export interface GradientLayer {
  id: string
  type: GradientType
  color1: string
  color2: string
  color1Position: number
  color2Position: number
  opacity: number
  blendMode: string
  // Linear properties
  angle: number
  // Radial properties
  radialCenterX: number
  radialCenterY: number
  radialShape: 'circle' | 'ellipse'
  radialSize: 'closest-side' | 'closest-corner' | 'farthest-side' | 'farthest-corner'
  // Conic properties
  conicAngle: number
  conicCenterX: number
  conicCenterY: number
}

export interface GradientState {
  // Gradient type
  gradientType: GradientType

  // Colors
  color1: string
  color2: string
  color3: string
  color1Opacity: number
  color2Opacity: number
  color3Opacity: number
  color1Position: number
  color2Position: number
  color3Position: number

  // Linear gradient properties
  gradientAngle: number

  // Radial gradient properties
  radialCenterX: number
  radialCenterY: number
  radialShape: 'circle' | 'ellipse'
  radialSize: 'closest-side' | 'closest-corner' | 'farthest-side' | 'farthest-corner'

  // Conic gradient properties
  conicAngle: number
  conicCenterX: number
  conicCenterY: number

  // Multi-layer blending properties
  gradientLayers: GradientLayer[]
  multiLayerBlendingEnabled: boolean

  // Legacy blending properties (kept for backwards compatibility)
  blendingEnabled: boolean
  blendMode: string
  secondGradientType: GradientType
  secondGradientAngle: number
  secondColor1: string
  secondColor2: string
  secondColor1Position: number
  secondColor2Position: number
  blendOpacity: number

  // Pattern properties
  patternOpacity: number
  patternColor: string
  patternEnabled: boolean
  pattern1Angle: number
  pattern1Size: number
  pattern2Angle: number
  pattern2Size: number

  // Noise properties
  noiseEnabled: boolean
  noiseOpacity: number
  noiseSize: number
}

export interface Preset {
  name: string
  config: GradientState
}
