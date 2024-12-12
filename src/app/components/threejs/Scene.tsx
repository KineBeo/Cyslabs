'use client'

import { FC } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from './Stars'

export const Scene: FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Stars speed={0.7}/>
    </Canvas>
  )
}