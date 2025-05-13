"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import ProjectsHero from "../../components/projects-hero"
import Layout from "@/components/layout"
import { useInView } from "framer-motion"

// Project data
const projects = [
  {
    id: 1,
    title: "Smartwatch UI Design",
    description: "A collection of innovative UI designs for next-generation smartwatches.",
    client: "TechWear Inc.",
    category: "UI/UX Design",
    image: "/placeholder.svg?height=600&width=800",
    color: "#9d4edd",
  },
  {
    id: 2,
    title: "Eco-Friendly Packaging",
    description: "Sustainable packaging design for an organic food brand.",
    client: "Green Earth",
    category: "Packaging Design",
    image: "/placeholder.svg?height=600&width=800",
    color: "#4cc9f0",
  },
  {
    id: 3,
    title: "Luxury Brand Identity",
    description: "Complete brand identity for a high-end fashion label.",
    client: "Elegance Co.",
    category: "Brand Identity",
    image: "/placeholder.svg?height=600&width=800",
    color: "#f72585",
  },
  {
    id: 4,
    title: "E-commerce Website",
    description: "User-friendly online shopping experience with 3D product visualization.",
    client: "Shop Online",
    category: "Digital Design",
    image: "/placeholder.svg?height=600&width=800",
    color: "#4361ee",
  },
  {
    id: 5,
    title: "Food Packaging",
    description: "Eye-catching packaging design for a premium snack brand.",
    client: "Tasty Treats",
    category: "Packaging Design",
    image: "/placeholder.svg?height=600&width=800",
    color: "#7209b7",
  },
  {
    id: 6,
    title: "Mobile App Design",
    description: "Intuitive mobile application with seamless user experience.",
    client: "Tech Solutions",
    category: "Digital Design",
    image: "/placeholder.svg?height=600&width=800",
    color: "#3a0ca3",
  },
]

// Project Card Component
interface Project {
  id: number
  title: string
  description: string
  client: string
  category: string
  image: string
  color: string
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-neutral-900"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-sm font-medium px-3 py-1 rounded-full"
            style={{ backgroundColor: `${project.color}20`, color: project.color }}
          >
            {project.category}
          </span>
          <span className="text-sm text-neutral-400">{project.client}</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-neutral-400 mb-4">{project.description}</p>
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center text-white font-medium hover:text-[#9d4edd] transition-colors"
        >
          View Project
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  )
}

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Layout darkMode={true}>
      <div className="relative min-h-screen bg-black text-white">
        {/* Hero Section with 3D Animation */}
        <ProjectsHero />

        {/* Projects Grid */}
        <div className="relative z-10 px-8 md:px-16 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
