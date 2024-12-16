'use client'

import React, { Suspense, useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { a as three } from '@react-spring/three'

interface MacModelProps {
  open: boolean
  hinge: any
}

export default function MacModel({ open, hinge, ...props }: MacModelProps) {
  const group = useRef<THREE.Group>(null!)
  const { nodes, materials } = useGLTF('/mac-draco.glb')
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.getElapsedTime()
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x, 
      open ? Math.cos(t / 10) / 10 + 0.25 : 0, 
      0.1
    )
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y, 
      open ? Math.sin(t / 10) / 4 : 0, 
      0.1
    )
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z, 
      open ? Math.sin(t / 10) / 10 : 0, 
      0.1
    )
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y, 
      open ? (-2 + Math.sin(t)) / 3 : -4.3, 
      0.1
    )
  })

  return (
    <group 
      ref={group}
      {...props}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={() => setHovered(false)}
      dispose={null}
    >
      <three.group rotation-x={hinge} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.aluminium} geometry={(nodes['Cube008'] as THREE.Mesh).geometry} />
          <mesh material={materials['matte.001']} geometry={(nodes['Cube008_1'] as THREE.Mesh).geometry} />
          <mesh material={materials['screen.001']} geometry={(nodes['Cube008_2'] as THREE.Mesh).geometry} />
        </group>
      </three.group>
      <mesh 
        material={materials.keys} 
        geometry={(nodes.keyboard as THREE.Mesh).geometry} 
        position={[1.79, 0, 3.45]} 
      />
      <group position={[0, -0.1, 3.39]}>
        <mesh material={materials.aluminium} geometry={(nodes['Cube002'] as THREE.Mesh).geometry} />
        <mesh material={materials.trackpad} geometry={(nodes['Cube002_1'] as THREE.Mesh).geometry} />
      </group>
      <mesh 
        material={materials.touchbar} 
        position={[0, -0.03, 1.2]} 
      />
    </group>
  )
}

useGLTF.preload('/mac-draco.glb')