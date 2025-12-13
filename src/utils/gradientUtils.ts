import type { GradientState } from '../types'

export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 255, g: 255, b: 255 }
}

export const getGradientLayers = (gradient: GradientState) => {
  const patternRGB = hexToRgb(gradient.patternColor)
  const patternOpacityDecimal = (gradient.patternOpacity / 100).toFixed(2)

  // Convert hex colors to rgba with opacity
  const color1RGB = hexToRgb(gradient.color1)
  const color2RGB = hexToRgb(gradient.color2)
  const color3RGB = hexToRgb(gradient.color3)

  const color1Opacity = (gradient.color1Opacity / 100).toFixed(2)
  const color2Opacity = (gradient.color2Opacity / 100).toFixed(2)
  const color3Opacity = (gradient.color3Opacity / 100).toFixed(2)

  const color1 = `rgba(${color1RGB.r}, ${color1RGB.g}, ${color1RGB.b}, ${color1Opacity})`
  const color2 = `rgba(${color2RGB.r}, ${color2RGB.g}, ${color2RGB.b}, ${color2Opacity})`
  const color3 = `rgba(${color3RGB.r}, ${color3RGB.g}, ${color3RGB.b}, ${color3Opacity})`

  return {
    pattern1: `repeating-linear-gradient(${gradient.pattern1Angle}deg, rgba(${patternRGB.r}, ${patternRGB.g}, ${patternRGB.b}, ${patternOpacityDecimal}) 0px, rgba(${patternRGB.r}, ${patternRGB.g}, ${patternRGB.b}, ${patternOpacityDecimal}) ${gradient.pattern1Size}px, transparent ${gradient.pattern1Size + 4}px, transparent ${gradient.pattern1Size + 5}px)`,
    pattern2: `repeating-linear-gradient(${gradient.pattern2Angle}deg, rgba(${patternRGB.r}, ${patternRGB.g}, ${patternRGB.b}, ${patternOpacityDecimal}) 0px, rgba(${patternRGB.r}, ${patternRGB.g}, ${patternRGB.b}, ${patternOpacityDecimal}) ${gradient.pattern2Size}px, transparent ${gradient.pattern2Size + 4}px, transparent ${gradient.pattern2Size + 5}px)`,
    main: `linear-gradient(${gradient.gradientAngle}deg, ${color1} ${gradient.color1Position}%, ${color2} ${gradient.color2Position}%, ${color3} ${gradient.color3Position}%)`
  }
}

export const generateBackgroundCSS = (gradient: GradientState): string => {
  const layers = getGradientLayers(gradient)
  if (gradient.patternEnabled) {
    return `${layers.pattern1},
${layers.pattern2},
${layers.main}`
  }
  return layers.main
}

export const generateCSSCode = (gradient: GradientState): string => {
  let css = `background: ${generateBackgroundCSS(gradient)};
background-size: cover;`

  if (gradient.noiseEnabled) {
    css += `

/* Noise overlay - apply to a pseudo-element or overlay div */
.noise-overlay {
  background-image: url('/noise.png');
  background-position: 50%;
  background-repeat: repeat;
  background-size: ${gradient.noiseSize}%;
  opacity: ${gradient.noiseOpacity / 100};
}`
  }

  return css
}
