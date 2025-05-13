"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Suspense } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Text, Torus, MeshDistortMaterial, useTexture, Environment } from "@react-three/drei"

// Floating Torus Component
function FloatingTorus({ position, color = "#9d4edd", scale = 1, speed = 1, distort = 0.4, rotation = [0, 0, 0] }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.5
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.3 + rotation[0]
    meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.3 + rotation[1]
    meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.3 + rotation[2]
  })

  return (
    <Torus
      ref={meshRef}
      args={[2, 0.5, 16, 32]}
      position={position}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <MeshDistortMaterial
        color={color}
        speed={3}
        distort={hovered ? distort * 1.5 : distort}
        radius={1}
        metalness={0.8}
        roughness={0.2}
      />
    </Torus>
  )
}

// Image Display Component
function ImageDisplay({ position = [0, 0, 0], scale = 1 }) {
  const meshRef = useRef()
  const texture = useTexture("/placeholder.svg?height=600&width=800")

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[16 * 0.1, 9 * 0.1]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  )
}

// Animated Text Component
function AnimatedText() {
  const { viewport } = useThree()
  const isMobile = viewport.width < 5

  return (
    <Text
      font="/fonts/Inter-Bold.ttf"
      fontSize={isMobile ? 0.3 : 0.4}
      position={[0, 0, 0]}
      color="white"
      anchorX="center"
      anchorY="middle"
      maxWidth={isMobile ? 2 : 4}
      textAlign="center"
      lineHeight={1.2}
    >
      Dynamic creativity and tech that speak to modern audiences.
    </Text>
  )
}

// Main Scene Component
function Scene() {
  return (
    <>
      <color attach="background" args={["#121212"]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

      <AnimatedText />

      <FloatingTorus position={[3, 1, -2]} color="#9d4edd" scale={0.3} speed={0.5} rotation={[Math.PI / 4, 0, 0]} />

      <FloatingTorus position={[-3, -1, -3]} color="#9d4edd" scale={0.5} speed={0.7} rotation={[0, Math.PI / 3, 0]} />

      <FloatingTorus position={[4, -2, -4]} color="#9d4edd" scale={0.4} speed={0.6} rotation={[0, 0, Math.PI / 5]} />

      <ImageDisplay position={[2, 0, -1]} scale={3} />

      <Environment preset="city" />
    </>
  )
}

export default function ProjectsHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })

  return (
    <div ref={ref} className="relative h-screen w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-10 flex items-center justify-start px-8 md:px-16"
      >
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Dynamic creativity and tech that speak to modern audiences.
          </h1>
        </div>
      </motion.div>

      <div className="absolute inset-0">
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Scene />
          </Canvas>
        </Suspense>
      </div>
    </div>
  )
}
