"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Suspense } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { ScrollControls, Scroll, useScroll, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

// Wavy Line Component
function WavyLine({ color = "#9d4edd" }) {
  const meshRef = useRef()
  const { viewport } = useThree()
  const data = useScroll()

  // Create curve for the wavy line
  const curve = useRef(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2, 0, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(2, -1, 0),
      new THREE.Vector3(4, 0, 0),
      new THREE.Vector3(6, 1, 0),
      new THREE.Vector3(8, 0, 0),
    ]),
  )

  // Create tube geometry from curve
  const tubeGeometry = useRef(new THREE.TubeGeometry(curve.current, 64, 0.4, 16, false))

  // Heart at the end of the tube
  const Heart = () => {
    const heartRef = useRef()

    useFrame((state) => {
      if (heartRef.current) {
        heartRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + 1
        heartRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
      }
    })

    return (
      <mesh ref={heartRef} position={[8, 0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#f72585" />
      </mesh>
    )
  }

  // Hand holding the heart
  const Hand = () => {
    return (
      <group position={[7.5, 0.5, 0]}>
        <mesh>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </group>
    )
  }

  useFrame(() => {
    if (meshRef.current) {
      // Animate the tube based on scroll
      meshRef.current.rotation.z = data.offset * Math.PI * 0.5
    }
  })

  return (
    <>
      <mesh ref={meshRef} geometry={tubeGeometry.current}>
        <MeshDistortMaterial color={color} speed={2} distort={0.2} radius={1} metalness={0.8} roughness={0.2} />
      </mesh>
      <Heart />
      <Hand />
    </>
  )
}

function Scene() {
  return (
    <ScrollControls pages={2} damping={0.3}>
      <Scroll>
        <WavyLine />
      </Scroll>
      <Scroll html>
        <div className="w-full h-screen flex items-center">
          <div className="max-w-2xl ml-[10%]">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">regular things at creative apes.</h1>
          </div>
        </div>
      </Scroll>
    </ScrollControls>
  )
}

export default function ServicesHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })
  const [scrollIndicator, setScrollIndicator] = useState(true)

  // Hide scroll indicator after scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollIndicator(false)
      } else {
        setScrollIndicator(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={ref} className="relative h-screen w-full">
      <div className="absolute inset-0">
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <color attach="background" args={["#121212"]} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <Scene />
          </Canvas>
        </Suspense>
      </div>

      {/* Scroll indicator */}
      {scrollIndicator && (
        <motion.div
          className="absolute bottom-10 right-10 w-12 h-12 border-2 border-white rounded-full flex items-center justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5L12 19M12 19L19 12M12 19L5 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      )}
    </div>
  )
}
