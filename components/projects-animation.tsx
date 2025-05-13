"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Box } from "@react-three/drei"
import { Suspense, useRef } from "react"
import type * as THREE from "three"

function FloatingCube({ position = [0, 0, 0], color = "#9d4edd", size = 0.5 }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.3
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.2
    }
  })

  return (
    <Box ref={meshRef} position={position} args={[size, size, size]}>
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} emissive={color} emissiveIntensity={0.2} />
    </Box>
  )
}

function ProjectsScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#9d4edd" intensity={0.5} />

      <FloatingCube position={[-2.5, 0.5, 0]} color="#9d4edd" size={0.6} />
      <FloatingCube position={[-1.5, -0.5, 0]} color="#9d4edd" size={0.4} />
      <FloatingCube position={[1.5, 0.5, 0]} color="#9d4edd" size={0.4} />
      <FloatingCube position={[2.5, -0.5, 0]} color="#9d4edd" size={0.6} />

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
          PROJECTS
        </Text>
      </mesh>
    </>
  )
}

export default function ProjectsAnimation() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<div className="w-full h-full bg-black" />}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <color attach="background" args={["#000000"]} />
          <ProjectsScene />
        </Canvas>
      </Suspense>
    </div>
  )
}
