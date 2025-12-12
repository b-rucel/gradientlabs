import type { GradientState } from '../types'
import { hexToRgb } from './gradientUtils'

export const drawRepeatingPattern = (
  ctx: CanvasRenderingContext2D,
  angle: number,
  size: number,
  patternColor: string,
  patternOpacity: string,
  width: number,
  height: number
): void => {
  ctx.save()

  // Set the fill style with opacity
  ctx.fillStyle = `rgba(${patternColor}, ${patternOpacity})`

  // Translate to center and rotate
  ctx.translate(width / 2, height / 2)
  ctx.rotate((angle * Math.PI) / 180)
  ctx.translate(-width / 2, -height / 2)

  // Draw repeating filled rectangles
  const spacing = size + 4
  const maxDim = Math.max(width, height) * 2
  for (let pos = -maxDim; pos < maxDim; pos += spacing) {
    ctx.fillRect(pos, -maxDim, size, maxDim * 4)
  }

  ctx.restore()
}

export const downloadGradientPNG = (gradient: GradientState): void => {
  const width = 1920
  const height = 1080

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    console.error('Failed to get canvas context')
    return
  }

  // Parse gradient colors
  const color1RGB = hexToRgb(gradient.color1)
  const color2RGB = hexToRgb(gradient.color2)
  const color3RGB = hexToRgb(gradient.color3)

  const color1Opacity = gradient.color1Opacity / 100
  const color2Opacity = gradient.color2Opacity / 100
  const color3Opacity = gradient.color3Opacity / 100

  // 1. Draw main gradient using canvas gradient API
  const angleRad = (gradient.gradientAngle * Math.PI) / 180
  const x1 = width / 2 - Math.cos(angleRad) * Math.max(width, height) / 2
  const y1 = height / 2 - Math.sin(angleRad) * Math.max(width, height) / 2
  const x2 = width / 2 + Math.cos(angleRad) * Math.max(width, height) / 2
  const y2 = height / 2 + Math.sin(angleRad) * Math.max(width, height) / 2

  const canvasGradient = ctx.createLinearGradient(x1, y1, x2, y2)
  canvasGradient.addColorStop(gradient.color1Position / 100, `rgba(${color1RGB.r}, ${color1RGB.g}, ${color1RGB.b}, ${color1Opacity})`)
  canvasGradient.addColorStop(gradient.color2Position / 100, `rgba(${color2RGB.r}, ${color2RGB.g}, ${color2RGB.b}, ${color2Opacity})`)
  canvasGradient.addColorStop(gradient.color3Position / 100, `rgba(${color3RGB.r}, ${color3RGB.g}, ${color3RGB.b}, ${color3Opacity})`)

  ctx.fillStyle = canvasGradient
  ctx.fillRect(0, 0, width, height)

  // Only draw patterns if enabled
  if (gradient.patternEnabled) {
    // Get pattern color
    const patternRGB = hexToRgb(gradient.patternColor)
    const patternOpacityStr = (gradient.patternOpacity / 100).toFixed(2)

    // 2. Draw pattern 2
    drawRepeatingPattern(
      ctx,
      gradient.pattern2Angle,
      gradient.pattern2Size,
      `${patternRGB.r}, ${patternRGB.g}, ${patternRGB.b}`,
      patternOpacityStr,
      width,
      height
    )

    // 3. Draw pattern 1 (on top)
    drawRepeatingPattern(
      ctx,
      gradient.pattern1Angle,
      gradient.pattern1Size,
      `${patternRGB.r}, ${patternRGB.g}, ${patternRGB.b}`,
      patternOpacityStr,
      width,
      height
    )
  }

  try {
    const link = document.createElement('a')
    link.download = `gradient-labs-${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (error) {
    console.error('Error generating image:', error)
  }
}
