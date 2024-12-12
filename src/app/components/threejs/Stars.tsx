'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { Points as ThreePoints } from 'three'
import { random } from 'maath'

interface StarsProps {
  speed?: number;
  [key: string]: any;
}

export function Stars({ speed = 1, ...props }: StarsProps) {
  const starsCount = 2000;
  const ref = useRef<ThreePoints>(null!)
  const [sphere] = useState(() => random.inSphere(new Float32Array(starsCount), { radius: 1.5 }))

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= (delta / 10) * speed
      ref.current.rotation.y -= (delta / 15) * speed
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#ffa0e0" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}