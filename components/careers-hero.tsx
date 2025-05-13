"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Suspense } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { OrbitControls, Environment } from "@react-three/drei"
import * as THREE from "three"

// Character Component
function Character() {
  const group = useRef()
  const { nodes, materials } = {
    nodes: {
      character: new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), new THREE.MeshStandardMaterial({ color: "#ffffff" })),
    },
    materials: {},
  }

  // Animation for walking
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (group.current) {
      group.current.position.y = Math.sin(t * 2) * 0.1
      group.current.rotation.y = Math.sin(t * 0.5) * 0.1
    }
  })

  return (
    <group ref={group} position={[0, 0, 0]} dispose={null}>
      {/* Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.8, 1.5, 0.5]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial color="#4ade80" roughness={1} />
      </mesh>

      {/* Shirt */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.9, 0.8, 0.6]} />
        <meshStandardMaterial color="#9d4edd" />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.6, 0.2, 0]} castShadow>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.6, 0.2, 0]} castShadow>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.3, -1, 0]} castShadow>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.3, -1, 0]} castShadow>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Staff */}
      <mesh position={[0.8, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
        <meshStandardMaterial color="#a0522d" />
      </mesh>
    </group>
  )
}

// Stairs Component
function Stairs() {
  return (
    <group position={[-3, -2, 0]} rotation={[0, 0, Math.PI / 8]}>
      {[...Array(10)].map((_, i) => (
        <mesh key={i} position={[i * 0.5, i * 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 0.2, 2]} />
          <meshStandardMaterial color="#e5e5e5" />
        </mesh>
      ))}
    </group>
  )
}

// Apply Now Button
function ApplyNowButton() {
  const [hover, setHover] = useState(false)

  return (
    <group position={[-2, 1, 0]}>
      <mesh onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)} scale={hover ? 1.1 : 1}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial color="#4c1d95" />
      </mesh>

      {/* Arrow */}
      <mesh position={[0, 0, 0.1]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.5, 0.1, 0.05]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.2, -0.2, 0.1]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.5, 0.1, 0.05]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <Character />
      <Stairs />
      <ApplyNowButton />

      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  )
}

export default function CareersHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })

  return (
    <div ref={ref} className="relative h-screen w-full bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-10 flex items-center justify-end px-8 md:px-16"
      >
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-black">
            grow with us at creative apes.
          </h1>
          <p className="text-lg text-neutral-700 max-w-xl">
            we are looking for insane humans who are winning the internet, do ape-worthy work, and are on-the-scene
            within their communities to join our growing team. an intern monkeying around? a senior ape? a natural? or a
            hardened techy? there's room for all.
          </p>
        </div>
      </motion.div>

      <div className="absolute inset-0">
        <Suspense fallback={<div className="w-full h-full bg-white" />}>
          <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
            <color attach="background" args={["#ffffff"]} />
            <Scene />
          </Canvas>
        </Suspense>
      </div>
    </div>
  )
}
