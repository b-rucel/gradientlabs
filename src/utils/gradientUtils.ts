import type { GradientState, GradientLayer } from '../types'

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

const createLayerGradientString = (layer: GradientLayer): string => {
  const color1RGB = hexToRgb(layer.color1)
  const color2RGB = hexToRgb(layer.color2)

  const color1Opacity = (layer.opacity / 100).toFixed(2)
  const color2Opacity = (layer.opacity / 100).toFixed(2)

  const color1 = `rgba(${color1RGB.r}, ${color1RGB.g}, ${color1RGB.b}, ${color1Opacity})`
  const color2 = `rgba(${color2RGB.r}, ${color2RGB.g}, ${color2RGB.b}, ${color2Opacity})`

  switch (layer.type) {
    case 'linear':
      return `linear-gradient(${layer.angle}deg, ${color1} ${layer.color1Position}%, ${color2} ${layer.color2Position}%)`

    case 'radial':
      return `radial-gradient(${layer.radialShape} ${layer.radialSize} at ${layer.radialCenterX}% ${layer.radialCenterY}%, ${color1} ${layer.color1Position}%, ${color2} ${layer.color2Position}%)`

    case 'conic':
      return `conic-gradient(from ${layer.conicAngle}deg at ${layer.conicCenterX}% ${layer.conicCenterY}%, ${color1} ${layer.color1Position}%, ${color2} ${layer.color2Position}%)`

    default:
      return `linear-gradient(${layer.angle}deg, ${color1} ${layer.color1Position}%, ${color2} ${layer.color2Position}%)`
  }
}

const createGradientString = (gradient: GradientState, isSecondary = false) => {
  // Use secondary colors if this is for blending
  const color1RGB = hexToRgb(isSecondary ? gradient.secondColor1 : gradient.color1)
  const color2RGB = hexToRgb(isSecondary ? gradient.secondColor2 : gradient.color2)
  const color3RGB = hexToRgb(gradient.color3)

  const color1Opacity = isSecondary ? 1 : (gradient.color1Opacity / 100).toFixed(2)
  const color2Opacity = isSecondary ? 1 : (gradient.color2Opacity / 100).toFixed(2)
  const color3Opacity = isSecondary ? 1 : (gradient.color3Opacity / 100).toFixed(2)

  const color1 = `rgba(${color1RGB.r}, ${color1RGB.g}, ${color1RGB.b}, ${color1Opacity})`
  const color2 = `rgba(${color2RGB.r}, ${color2RGB.g}, ${color2RGB.b}, ${color2Opacity})`
  const color3 = `rgba(${color3RGB.r}, ${color3RGB.g}, ${color3RGB.b}, ${color3Opacity})`

  const gradientType = isSecondary ? gradient.secondGradientType : gradient.gradientType
  const pos1 = isSecondary ? gradient.secondColor1Position : gradient.color1Position
  const pos2 = isSecondary ? gradient.secondColor2Position : gradient.color2Position
  const pos3 = gradient.color3Position

  switch (gradientType) {
    case 'linear':
      const angle = isSecondary ? gradient.secondGradientAngle : gradient.gradientAngle
      return `linear-gradient(${angle}deg, ${color1} ${pos1}%, ${color2} ${pos2}%, ${color3} ${pos3}%)`

    case 'radial':
      const centerX = gradient.radialCenterX
      const centerY = gradient.radialCenterY
      const shape = gradient.radialShape
      const size = gradient.radialSize
      return `radial-gradient(${shape} ${size} at ${centerX}% ${centerY}%, ${color1} ${pos1}%, ${color2} ${pos2}%, ${color3} ${pos3}%)`

    case 'conic':
      const conicAngle = gradient.conicAngle
      const conicCenterX = gradient.conicCenterX
      const conicCenterY = gradient.conicCenterY
      return `conic-gradient(from ${conicAngle}deg at ${conicCenterX}% ${conicCenterY}%, ${color1} ${pos1}%, ${color2} ${pos2}%, ${color3} ${pos3}%)`

    default:
      return `linear-gradient(${gradient.gradientAngle}deg, ${color1} ${pos1}%, ${color2} ${pos2}%, ${color3} ${pos3}%)`
  }
}

export const getGradientLayers = (gradient: GradientState) => {
  const patternRGB = hexToRgb(gradient.patternColor)
  const patternOpacityDecimal = (gradient.patternOpacity / 100).toFixed(2)

  const mainGradient = createGradientString(gradient)

  let blendGradient = ''
  if (gradient.blendingEnabled) {
    blendGradient = createGradientString(gradient, true)
  }

  return {
    pattern1: `repeating-linear-gradient(${gradient.pattern1Angle}deg, rgba(${patternRGB.r}, ${patternRGB.g}, ${patternRGB.b}, ${patternOpacityDecimal}) 0px, rgba(${patternRGB.r}, ${patternRGB.g}, ${patternRGB.b}, ${patternOpacityDecimal}) ${gradient.pattern1Size}px, transparent ${gradient.pattern1Size + 4}px, transparent ${gradient.pattern1Size + 5}px)`,
    pattern2: `repeating-linear-gradient(${gradient.pattern2Angle}deg, rgba(${patternRGB.r}, ${patternRGB.g}, ${patternRGB.b}, ${patternOpacityDecimal}) 0px, rgba(${patternRGB.r}, ${patternRGB.g}, ${patternRGB.b}, ${patternOpacityDecimal}) ${gradient.pattern2Size}px, transparent ${gradient.pattern2Size + 4}px, transparent ${gradient.pattern2Size + 5}px)`,
    main: mainGradient,
    blend: blendGradient
  }
}

export const generateBackgroundCSS = (gradient: GradientState): string => {
  const layers = getGradientLayers(gradient)

  let backgroundLayers = []

  // Add multi-layer blending gradients if enabled (blend layers on top of patterns and base gradient)
  if (gradient.multiLayerBlendingEnabled && gradient.gradientLayers.length > 0) {
    gradient.gradientLayers.forEach(layer => {
      backgroundLayers.push(createLayerGradientString(layer))
    })
    // Add pattern layers if enabled (visible under blend layers)
    if (gradient.patternEnabled) {
      backgroundLayers.push(layers.pattern1, layers.pattern2)
    }
    // Add base gradient as the bottom layer
    backgroundLayers.push(layers.main)
  } else {
    // Add pattern layers if enabled (before main gradient)
    if (gradient.patternEnabled) {
      backgroundLayers.push(layers.pattern1, layers.pattern2)
    }

    // Add legacy blend layer if enabled
    if (gradient.blendingEnabled && layers.blend) {
      backgroundLayers.push(layers.blend)
    }

    // Add main gradient (always the base)
    backgroundLayers.push(layers.main)
  }

  return backgroundLayers.join(',\n')
}

export const generateBackgroundStyle = (gradient: GradientState) => {
  const backgroundCSS = generateBackgroundCSS(gradient)

  const style: Record<string, string> = {
    background: backgroundCSS,
    backgroundSize: 'cover'
  }

  // Add blend modes for multi-layer blending
  if (gradient.multiLayerBlendingEnabled && gradient.gradientLayers.length > 0) {
    const blendModes = gradient.gradientLayers.map(layer => layer.blendMode)
    style.backgroundBlendMode = blendModes.join(', ')
  } else if (gradient.blendingEnabled) {
    // Add blend mode if legacy blending is enabled
    style.backgroundBlendMode = gradient.blendMode
  }

  return style
}

export const generateCSSCode = (gradient: GradientState): string => {
  let css = `background: ${generateBackgroundCSS(gradient)};
background-size: cover;`

  // Add blend modes for multi-layer blending
  if (gradient.multiLayerBlendingEnabled && gradient.gradientLayers.length > 0) {
    const blendModes = gradient.gradientLayers.map(layer => layer.blendMode).join(', ')
    css += `
background-blend-mode: ${blendModes};`
  } else if (gradient.blendingEnabled) {
    // Add blend mode if legacy blending is enabled
    css += `
background-blend-mode: ${gradient.blendMode};`
  }

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
