export interface GradientState {
  color1: string
  color2: string
  color3: string
  color1Opacity: number
  color2Opacity: number
  color3Opacity: number
  color1Position: number
  color2Position: number
  color3Position: number
  gradientAngle: number
  patternOpacity: number
  patternColor: string
  patternEnabled: boolean
  pattern1Angle: number
  pattern1Size: number
  pattern2Angle: number
  pattern2Size: number
}

export interface Preset {
  name: string
  config: GradientState
}
