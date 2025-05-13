"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function FeaturedProjects() {
  const projects = [
    {
      id: 1,
      title: "Eco Packaging",
      category: "Packaging Design",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 2,
      title: "Luxury Branding",
      category: "Brand Identity",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 3,
      title: "Digital Experience",
      category: "Web Design",
      image: "/placeholder.svg?height=600&width=800",
    },
  ]

  return (
    <section className="py-20 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Explore our latest work and see how we help brands stand out with innovative design solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="project-card bg-white rounded-lg overflow-hidden"
            >
              <Link href={`/projects/${project.id}`}>
                <div className="relative h-80">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <span className="text-sm text-primary font-medium">{project.category}</span>
                  <h3 className="text-2xl font-bold mt-2">{project.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/projects"
            className="inline-block border-2 border-black px-8 py-3 text-lg font-medium hover:bg-black hover:text-white transition-colors"
          >
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
