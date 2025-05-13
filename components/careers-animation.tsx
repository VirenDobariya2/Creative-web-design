"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Octahedron } from "@react-three/drei"
import { Suspense, useRef } from "react"
import type * as THREE from "three"

function FloatingOctahedron({ position = [0, 0, 0] as [number, number, number], color = "#9d4edd", size = 1 }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.3
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.4
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.2
    }
  })

  return (
    <Octahedron ref={meshRef} position={position} args={[size, 0]}>
      <meshStandardMaterial
        color={color}
        metalness={0.5}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.2}
        wireframe
      />
    </Octahedron>
  )
}

function CareersScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#9d4edd" intensity={0.5} />

      <FloatingOctahedron position={[-2.5, 0, 0]} size={0.8} />
      <FloatingOctahedron position={[2.5, 0, 0]} size={0.8} />

      <mesh position={[0, 0, 0]}>
        <Text
          color="#ffffff"
          fontSize={1.2}
          font="/fonts/Inter-Bold.ttf"
          position={[0, 0, 0]}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#9d4edd"
        >
          CAREERS
        </Text>
      </mesh>
    </>
  )
}

export default function CareersAnimation() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<div className="w-full h-full bg-black" />}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <color attach="background" args={["#000000"]} />
          <CareersScene />
        </Canvas>
      </Suspense>
    </div>
  )
}
