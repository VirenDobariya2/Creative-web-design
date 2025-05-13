"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import ServicesHero from "../../components/services-hero"
import ServicesList from "../../components/services-list"
import CustomCursor from "@/components/custom-cursor"

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <CustomCursor />
      <Layout darkMode={true}>
        <div className="relative min-h-screen bg-black text-white">
          {/* Hero Section with 3D Animation */}
          <ServicesHero />

          {/* Services List */}
          <ServicesList />
        </div>
      </Layout>
    </>
  )
}
