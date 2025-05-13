"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Torus } from "@react-three/drei"
import { Suspense, useRef } from "react"
import type * as THREE from "three"

function FloatingTorus({ position = [0, 0, 0], color = "#9d4edd", rotation = 0 }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.5 + rotation
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3 + rotation
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.2
    }
  })

  return (
    <Torus ref={meshRef} position={position} args={[0.5, 0.2, 16, 32]}>
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} emissive={color} emissiveIntensity={0.2} />
    </Torus>
  )
}

function ServicesScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#9d4edd" intensity={0.5} />

      <FloatingTorus position={[-2.5, 0, 0]} rotation={1} />
      <FloatingTorus position={[2.5, 0, 0]} rotation={2} />

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
          SERVICES
        </Text>
      </mesh>
    </>
  )
}

export default function ServicesAnimation() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<div className="w-full h-full bg-black" />}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <color attach="background" args={["#000000"]} />
          <ServicesScene />
        </Canvas>
      </Suspense>
    </div>
  )
}
