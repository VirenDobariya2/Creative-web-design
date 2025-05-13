"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function ContactCta() {
  return (
    <section className="py-20 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Let's create something
            <br />
            amazing together
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Ready to elevate your brand with exceptional design? Get in touch with us today.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-white px-8 py-4 text-lg font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Start a Project
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
