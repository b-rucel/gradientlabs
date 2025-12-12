import { useState, useCallback } from 'react'
import type { GradientState } from '../types'
import { PRESETS } from '../data/presets'

export const useGradient = () => {
  const [gradient, setGradient] = useState<GradientState>(PRESETS[0].config)
  const [activePreset, setActivePreset] = useState(0)

  const updateGradient = useCallback((key: keyof GradientState, value: string | number | boolean) => {
    setGradient((prev) => ({ ...prev, [key]: value }))
    setActivePreset(-1)
  }, [])

  const applyPreset = useCallback((index: number) => {
    setGradient(PRESETS[index].config)
    setActivePreset(index)
  }, [])

  const randomizeGradient = useCallback(() => {
    const randomColor = () =>
      '#' + Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')

    const pos1 = Math.floor(Math.random() * 30)
    const pos2 = Math.floor(Math.random() * 40) + 30
    const pos3 = Math.floor(Math.random() * 30) + 70

    setGradient({
      color1: randomColor(),
      color2: randomColor(),
      color3: randomColor(),
      color1Opacity: Math.floor(Math.random() * 40) + 60,
      color2Opacity: Math.floor(Math.random() * 40) + 60,
      color3Opacity: Math.floor(Math.random() * 40) + 60,
      color1Position: pos1,
      color2Position: pos2,
      color3Position: pos3,
      gradientAngle: Math.floor(Math.random() * 360),
      patternOpacity: Math.floor(Math.random() * 20) + 2,
      patternColor: '#ffffff',
      pattern1Angle: Math.floor(Math.random() * 90),
      pattern1Size: Math.floor(Math.random() * 30) + 5,
      pattern2Angle: Math.floor(Math.random() * 90) - 90,
      pattern2Size: Math.floor(Math.random() * 30) + 5,
    })
    setActivePreset(-1)
  }, [])

  return {
    gradient,
    activePreset,
    updateGradient,
    applyPreset,
    randomizeGradient,
  }
}
