"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Icosahedron } from "@react-three/drei"
import { Suspense, useRef } from "react"
import type * as THREE from "three"

function FloatingIcosahedron({ position = [0, 0, 0], color = "#9d4edd", size = 1 }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.2
    }
  })

  return (
    <Icosahedron ref={meshRef} position={position} args={[size, 1]}>
      <meshPhysicalMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </Icosahedron>
  )
}

function ContactScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#9d4edd" intensity={0.5} />

      <FloatingIcosahedron position={[-2.5, 0, 0]} size={0.6} />
      <FloatingIcosahedron position={[2.5, 0, 0]} size={0.6} />

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
          CONTACT
        </Text>
      </mesh>
    </>
  )
}

export default function ContactAnimation() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<div className="w-full h-full bg-black" />}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <color attach="background" args={["#000000"]} />
          <ContactScene />
        </Canvas>
      </Suspense>
    </div>
  )
}
