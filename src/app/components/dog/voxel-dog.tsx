'use client'
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function easeOutCirc(x: number) {
  return Math.sqrt(1 - Math.pow(x - 1, 4));
}

function Model() {
  const gltf = useGLTF('/dog.glb');
  
  // Setup shadow properties
  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [gltf]);

  return <primitive object={gltf.scene} position={[0, -1, 0]} scale={2} />; // Adjust the scale here
}

function CameraController() {
  const { camera } = useThree();
  const frameCount = useRef(0);
  
  // Set initial camera position
  useEffect(() => {
    const target = new THREE.Vector3(-0.5, 1.2, 0);
    const initialPosition = new THREE.Vector3(
      20 * Math.sin(0.2 * Math.PI),
      10,
      20 * Math.cos(0.2 * Math.PI)
    );
    
    camera.position.copy(initialPosition);
    camera.lookAt(target);
  }, [camera]);

  // Handle animation
  useFrame(() => {
    if (frameCount.current <= 100) {
      const target = new THREE.Vector3(-0.5, 1.2, 0);
      const initialPosition = new THREE.Vector3(
        20 * Math.sin(0.2 * Math.PI),
        10,
        20 * Math.cos(0.2 * Math.PI)
      );
      
      const rotSpeed = -easeOutCirc(frameCount.current / 120) * Math.PI * 20;
      
      camera.position.y = 10;
      camera.position.x = initialPosition.x * Math.cos(rotSpeed) + 
                         initialPosition.z * Math.sin(rotSpeed);
      camera.position.z = initialPosition.z * Math.cos(rotSpeed) - 
                         initialPosition.x * Math.sin(rotSpeed);
      camera.lookAt(target);
      
      frameCount.current += 1;
    }
  });

  return null;
}

function Scene() {
  return (
    <>
      <CameraController />
      <ambientLight intensity={0.8} color="#cccccc" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Model />
      <OrbitControls
        enablePan={true}
        enableZoom={false} // Disable zoom
        enableRotate={true}
        autoRotate={false}
        target={new THREE.Vector3(-0.5, 1.2, 0)}
      />
    </>
  );
}

export function EnhancedDogViewer() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      // Canvas will automatically handle resize
    };

    window.addEventListener('resize', handleResize, false);
    return () => window.removeEventListener('resize', handleResize, false);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-56">
      <Canvas
        shadows
        camera={{
          near: 0.01,
          far: 50000,
          position: [20, 10, 20]
        }}
        onCreated={() => setLoading(false)}
      >
        <Scene />
      </Canvas>
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-transparent bg-opacity-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
}