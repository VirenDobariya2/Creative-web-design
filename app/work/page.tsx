"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Layout from "@/components/layout"
import Image from "next/image"
import Link from "next/link"
import WorkAnimation from "@/components/work-animation"

export default function WorkPage() {
  const [filter, setFilter] = useState("all")

  const categories = [
    { id: "all", name: "All Work" },
    { id: "packaging", name: "Packaging" },
    { id: "branding", name: "Branding" },
    { id: "digital", name: "Digital" },
  ]

  const projects = [
    {
      id: 1,
      title: "Eco-Friendly Packaging",
      category: "packaging",
      client: "Green Earth",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 2,
      title: "Luxury Brand Identity",
      category: "branding",
      client: "Elegance Co.",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 3,
      title: "E-commerce Website",
      category: "digital",
      client: "Shop Online",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 4,
      title: "Food Packaging",
      category: "packaging",
      client: "Tasty Treats",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 5,
      title: "Corporate Identity",
      category: "branding",
      client: "Business Inc.",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 6,
      title: "Mobile App Design",
      category: "digital",
      client: "Tech Solutions",
      image: "/placeholder.svg?height=600&width=800",
    },
  ]

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  return (
    <Layout darkMode={true  }>
      <div className="relative min-h-screen pt-24">
        <div className="absolute inset-0 h-[50vh] z-0">
          <WorkAnimation />
        </div>

        <div className="relative z-10 pt-[30vh] px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Work</h1>
            <p className="text-xl max-w-2xl">
              Explore our portfolio of packaging design, branding, and digital projects that have helped our clients
              stand out in their markets.
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === category.id ? "bg-primary text-white" : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="project-card bg-white rounded-lg overflow-hidden"
                  >
                    <Link href={`/projects/${project.id}`}>
                      <div className="relative h-80">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <span className="text-sm text-primary font-medium">{project.client}</span>
                        <h3 className="text-2xl font-bold mt-2">{project.title}</h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Layout>
  )
}
