'use client'

import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a as three } from '@react-spring/three'
import { a as web } from '@react-spring/web'
import MacModel from './MacModel'

export default function MacbookScene() {
  const [open, setOpen] = useState(true)
  const props = useSpring({ open: Number(open) })

  return (
    <div className="absolute left-0 bottom-0 inset-y-48 desktop:w-1/2 mobile:w-full tablet:w-full mini-laptop:w-full laptop:w-full">
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, -30], fov: 35 }}
      >
        <three.pointLight 
          position={[10, 10, 10]} 
          intensity={1.5} 
          color={props.open.to([0, 1], ['#f0f0f0', '#d25578'])} 
        />
        <Suspense fallback={null}>
          <group 
            rotation={[0, Math.PI, 0]} 
            onClick={(e) => (e.stopPropagation(), setOpen(!open))}
          >
            <MacModel 
              open={open} 
              hinge={props.open.to([0, 1], [1.575, -0.425])} 
            />
          </group>
          <Environment preset="city" />
        </Suspense>
        <OrbitControls 
          autoRotate
          enablePan={false} 
          enableZoom={false} 
          maxPolarAngle={Math.PI / 2} 
          minPolarAngle={Math.PI / 2} 
        />
        <ContactShadows 
          position={[0, -4.5, 0]} 
          opacity={0.4} 
          scale={20} 
          blur={1.75} 
          far={4.5} 
        />
      </Canvas>
    </div>
  )
}