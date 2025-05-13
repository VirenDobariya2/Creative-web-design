"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Torus, MeshDistortMaterial, Environment } from "@react-three/drei"
import { ArrowLeft, ArrowRight } from "lucide-react"

// Project data
const projects = [
  {
    id: "1",
    title: "Smartwatch UI Design",
    description:
      "A collection of innovative UI designs for next-generation smartwatches. Our team worked closely with TechWear Inc. to create intuitive interfaces that balance functionality with aesthetic appeal. The designs incorporate vibrant colors and smooth animations to enhance user engagement.",
    client: "TechWear Inc.",
    category: "UI/UX Design",
    year: "2023",
    services: ["UI Design", "UX Research", "Prototyping", "Animation"],
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    color: "#9d4edd",
    nextProject: "2",
  },
  {
    id: "2",
    title: "Eco-Friendly Packaging",
    description:
      "Sustainable packaging design for an organic food brand. We created a packaging solution that reflects the brand's commitment to environmental sustainability while ensuring product protection and visual appeal on store shelves.",
    client: "Green Earth",
    category: "Packaging Design",
    year: "2023",
    services: ["Packaging Design", "Sustainable Materials Research", "Brand Identity", "Print Production"],
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    color: "#4cc9f0",
    nextProject: "3",
  },
  {
    id: "3",
    title: "Luxury Brand Identity",
    description:
      "Complete brand identity for a high-end fashion label. Our comprehensive approach included logo design, typography selection, color palette development, and brand guidelines to ensure consistency across all touchpoints.",
    client: "Elegance Co.",
    category: "Brand Identity",
    year: "2022",
    services: ["Brand Strategy", "Logo Design", "Typography", "Brand Guidelines"],
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    color: "#f72585",
    nextProject: "4",
  },
  {
    id: "4",
    title: "E-commerce Website",
    description:
      "User-friendly online shopping experience with 3D product visualization. We designed and developed a modern e-commerce platform that incorporates 3D product views, allowing customers to examine products from all angles before purchase.",
    client: "Shop Online",
    category: "Digital Design",
    year: "2023",
    services: ["Web Design", "3D Modeling", "Front-end Development", "UX Design"],
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    color: "#4361ee",
    nextProject: "5",
  },
  {
    id: "5",
    title: "Food Packaging",
    description:
      "Eye-catching packaging design for a premium snack brand. Our design approach focused on creating packaging that stands out on crowded shelves while communicating the premium quality of the products inside.",
    client: "Tasty Treats",
    category: "Packaging Design",
    year: "2022",
    services: ["Packaging Design", "Illustration", "Typography", "Print Production"],
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    color: "#7209b7",
    nextProject: "6",
  },
  {
    id: "6",
    title: "Mobile App Design",
    description:
      "Intuitive mobile application with seamless user experience. We designed a mobile app that prioritizes user experience with intuitive navigation, clear information hierarchy, and delightful interactions.",
    client: "Tech Solutions",
    category: "Digital Design",
    year: "2023",
    services: ["App Design", "UX Research", "Prototyping", "UI Animation"],
    image: "/placeholder.svg?height=600&width=800",
    gallery: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    color: "#3a0ca3",
    nextProject: "1",
  },
]

// 3D Background Component
function ProjectBackground({ color }) {
  return (
    <>
      <color attach="background" args={["#121212"]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

      <Torus position={[3, 1, -2]} args={[1, 0.3, 16, 32]} rotation={[Math.PI / 4, 0, 0]}>
        <MeshDistortMaterial color={color} speed={3} distort={0.4} radius={1} metalness={0.8} roughness={0.2} />
      </Torus>

      <Torus position={[-3, -1, -3]} args={[1.5, 0.4, 16, 32]} rotation={[0, Math.PI / 3, 0]}>
        <MeshDistortMaterial color={color} speed={2} distort={0.3} radius={1} metalness={0.8} roughness={0.2} />
      </Torus>

      <Environment preset="city" />
    </>
  )
}

export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const currentProject = projects.find((p) => p.id === params.id)
    if (currentProject) {
      setProject(currentProject)
    } else {
      router.push("/projects")
    }
  }, [params.id, router])

  if (!mounted || !project) return null

  return (
    <Layout darkMode={true}>
      <div className="relative min-h-screen bg-black text-white pt-24">
        {/* 3D Background */}
        <div className="absolute inset-0 h-[50vh] z-0">
          <Suspense fallback={<div className="w-full h-full bg-black" />}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ProjectBackground color={project.color} />
            </Canvas>
          </Suspense>
        </div>

        {/* Project Content */}
        <div className="relative z-10 pt-[20vh] px-8 md:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span
                  className="text-sm font-medium px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${project.color}20`, color: project.color }}
                >
                  {project.category}
                </span>
                <span className="text-sm text-neutral-400">Client: {project.client}</span>
                <span className="text-sm text-neutral-400">Year: {project.year}</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-8">{project.title}</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="md:col-span-2">
                  <p className="text-xl text-neutral-300">{project.description}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Services</h3>
                  <ul className="space-y-2">
                    {project.services.map((service, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: project.color }}></span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl mb-16">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {project.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} - Gallery ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-between items-center border-t border-neutral-800 pt-8">
                <Link href="/projects" className="flex items-center text-white hover:text-[#9d4edd] transition-colors">
                  <ArrowLeft className="mr-2" size={20} />
                  Back to Projects
                </Link>

                <Link
                  href={`/projects/${project.nextProject}`}
                  className="flex items-center text-white hover:text-[#9d4edd] transition-colors"
                >
                  Next Project
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
