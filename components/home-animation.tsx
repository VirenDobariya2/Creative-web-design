"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

// Ape head model created with Three.js primitives
function ApeHead() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y =
        Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
      // Subtle rotation
      groupRef.current.rotation.y =
        Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Head */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.8} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.4, 0.2, 0.9]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color="#9d4edd"
          emissive="#9d4edd"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0.4, 0.2, 0.9]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color="#9d4edd"
          emissive="#9d4edd"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, -0.5, 0.9]}>
        <boxGeometry args={[0.7, 0.1, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Ears */}
      <mesh position={[-0.9, 0.6, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.8} />
      </mesh>
      <mesh position={[0.9, 0.6, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.8} />
      </mesh>
    </group>
  );
}

// Glowing particles effect
function GlowingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  // Create particles
  const particlesPosition = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    particlesPosition[i3] = (Math.random() - 0.5) * 5;
    particlesPosition[i3 + 1] = (Math.random() - 0.5) * 5;
    particlesPosition[i3 + 2] = (Math.random() - 0.5) * 5;
  }

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#9d4edd"
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HomeAnimation() {
  return (
    <div className="w-full h-screen absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <ApeHead />
        <GlowingParticles />

        <Environment preset="night" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
