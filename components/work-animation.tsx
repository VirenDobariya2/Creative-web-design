"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { Suspense, useRef } from "react"
import type * as THREE from "three"

function FloatingSphere({ position = [0, 0, 0] }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.2
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.2
    }
  })

  return (
    <Sphere ref={meshRef} position={position} args={[0.5, 32, 32]}>
      <MeshDistortMaterial color="#9d4edd" speed={2} distort={0.3} radius={1} />
    </Sphere>
  )
}

function WorkScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#9d4edd" intensity={0.5} />

      <FloatingSphere position={[-2, 0, 0]} />
      <FloatingSphere position={[2, 0, 0]} />

      <mesh position={[0, 0, 0]}>
        <Text
          color="#ffffff"
          fontSize={1.5}
          font="/fonts/Inter-Bold.ttf"
          position={[0, 0, 0]}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#9d4edd"
        >
          WORK
        </Text>
      </mesh>
    </>
  )
}

export default function WorkAnimation() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<div className="w-full h-full bg-black" />}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <color attach="background" args={["#000000"]} />
          <WorkScene />
        </Canvas>
      </Suspense>
    </div>
  )
}
