"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import CareersHero from "../../components/careers-hero"
import JobListings from "../../components/job-listings"
import CustomCursor from "@/components/custom-cursor"

export default function CareersPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <CustomCursor />
      <Layout darkMode={true}>
        <div className="relative min-h-screen bg-white text-black">
          {/* Hero Section with 3D Animation */}
          <CareersHero />

          {/* Job Listings */}
          <JobListings />
        </div>
      </Layout>
    </>
  )
}
