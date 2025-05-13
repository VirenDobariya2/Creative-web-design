"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import LoadingScreen from "@/components/loading-screen"
import Layout from "@/components/layout"
import HomeAnimation from "@/components/home-animation"
import CustomCursor from "@/components/custom-cursor"
import FeaturedProjects from "@/components/featured-projects"
import ServicesOverview from "@/components/services-overview"
import ContactCta from "@/components/contact-cta"

export default function Home() {
  const [loading, setLoading] = useState(true)

  const handleLoadingComplete = () => {
    setLoading(false)
  }

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" onLoadingComplete={handleLoadingComplete} />
        ) : (
          <Layout key="content">
            <section className="relative min-h-screen">
              <HomeAnimation />
              <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 z-10">
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-4 text-white mix-blend-difference">
                  We create
                  <br />
                  experiences
                </h1>
                <p className="text-xl md:text-2xl max-w-xl text-white mix-blend-difference">
                  Creative Apes is a design studio specializing in packaging design, branding, and digital experiences.
                </p>
              </div>
            </section>

            <FeaturedProjects />
            <ServicesOverview />
            <ContactCta />
          </Layout>
        )}
      </AnimatePresence>
    </>
  )
}
