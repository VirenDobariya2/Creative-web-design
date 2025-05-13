"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Package, Palette, Globe, Lightbulb, Camera, PenTool, Code, Headphones } from "lucide-react"

export default function ServicesList() {
  const services = [
    {
      icon: <Package size={48} />,
      title: "Packaging Design",
      description:
        "We create innovative packaging solutions that stand out on shelves and connect with consumers. Our approach combines aesthetics with functionality to deliver packaging that tells your brand story.",
      color: "#9d4edd",
    },
    {
      icon: <Palette size={48} />,
      title: "Brand Identity",
      description:
        "We develop comprehensive brand identities that communicate your values and resonate with your audience. From logo design to brand guidelines, we create cohesive visual systems that build recognition and trust.",
      color: "#4cc9f0",
    },
    {
      icon: <Globe size={48} />,
      title: "Digital Experiences",
      description:
        "We build immersive digital experiences that engage users and elevate your brand online. Our digital solutions are designed to be intuitive, responsive, and visually stunning.",
      color: "#f72585",
    },
    {
      icon: <Lightbulb size={48} />,
      title: "Creative Strategy",
      description:
        "We help brands define their positioning and develop creative strategies that drive business growth. Our strategic approach ensures that design decisions are aligned with your business objectives.",
      color: "#4361ee",
    },
    {
      icon: <Camera size={48} />,
      title: "Photography",
      description:
        "We offer professional photography services to showcase your products and brand in the best light. Our photography captures the essence of your brand and creates compelling visual content.",
      color: "#7209b7",
    },
    {
      icon: <PenTool size={48} />,
      title: "Illustration",
      description:
        "We create custom illustrations that add personality and uniqueness to your brand. Our illustration work ranges from simple icons to complex visual narratives that engage and delight.",
      color: "#3a0ca3",
    },
    {
      icon: <Code size={48} />,
      title: "Web Development",
      description:
        "We build modern, responsive websites that deliver exceptional user experiences. Our development team creates custom solutions that are fast, secure, and easy to maintain.",
      color: "#560bad",
    },
    {
      icon: <Headphones size={48} />,
      title: "Motion & Sound",
      description:
        "We create dynamic motion graphics and sound design that bring your brand to life. Our audiovisual content enhances brand storytelling and creates memorable experiences.",
      color: "#480ca8",
    },
  ]

  const ServiceCard = ({ service, index }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className="bg-neutral-900 rounded-2xl p-8 hover:bg-neutral-800 transition-colors"
      >
        <div
          className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full"
          style={{ backgroundColor: `${service.color}20` }}
        >
          <div className="text-[#9d4edd]">{service.icon}</div>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
        <p className="text-neutral-400">{service.description}</p>
      </motion.div>
    )
  }

  return (
    <div className="relative z-10 px-8 md:px-16 py-24 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our Services</h2>
          <p className="text-xl text-neutral-400 max-w-2xl">
            We offer a comprehensive range of creative services to help your brand stand out in today's competitive
            landscape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to start your project?</h2>
          <a
            href="/contact"
            className="inline-block bg-[#9d4edd] text-white px-8 py-4 text-lg font-medium rounded-full hover:bg-[#7b2cbf] transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </div>
  )
}
