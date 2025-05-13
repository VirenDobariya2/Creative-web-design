"use client"

import { motion } from "framer-motion"
import { Package, Palette, Globe } from "lucide-react"

export default function ServicesOverview() {
  const services = [
    {
      icon: <Package size={48} />,
      title: "Packaging Design",
      description: "We create innovative packaging solutions that stand out on shelves and connect with consumers.",
    },
    {
      icon: <Palette size={48} />,
      title: "Brand Identity",
      description:
        "We develop comprehensive brand identities that communicate your values and resonate with your audience.",
    },
    {
      icon: <Globe size={48} />,
      title: "Digital Experiences",
      description: "We build immersive digital experiences that engage users and elevate your brand online.",
    },
  ]

  return (
    <section className="py-20 px-8 md:px-16 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We offer a range of design services to help your brand make an impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="service-card bg-white p-8 rounded-lg text-center"
            >
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
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
          <a
            href="/services"
            className="inline-block border-2 border-black px-8 py-3 text-lg font-medium hover:bg-black hover:text-white transition-colors"
          >
            Learn More About Our Services
          </a>
        </motion.div>
      </div>
    </section>
  )
}
