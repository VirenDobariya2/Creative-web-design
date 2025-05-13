"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, Code, Palette, Camera, Globe, Lightbulb } from "lucide-react"

export default function JobListings() {
  const positions = [
    {
      title: "Senior UI/UX Designer",
      type: "Full-time",
      location: "Remote",
      department: "Design",
      icon: <Palette size={24} />,
      description:
        "We're looking for a Senior UI/UX Designer to create exceptional digital experiences for our clients. You'll work closely with our creative and development teams to design intuitive interfaces that delight users.",
    },
    {
      title: "Frontend Developer",
      type: "Full-time",
      location: "Hybrid",
      department: "Development",
      icon: <Code size={24} />,
      description:
        "Join our development team as a Frontend Developer to build modern, responsive websites and applications. You should have strong skills in HTML, CSS, JavaScript, and modern frameworks.",
    },
    {
      title: "Creative Director",
      type: "Full-time",
      location: "On-site",
      department: "Creative",
      icon: <Lightbulb size={24} />,
      description:
        "We're seeking a Creative Director to lead our creative team and oversee all creative output. You'll work with clients to understand their needs and guide our team to deliver exceptional creative solutions.",
    },
    {
      title: "Digital Marketing Specialist",
      type: "Full-time",
      location: "Remote",
      department: "Marketing",
      icon: <Globe size={24} />,
      description:
        "We're looking for a Digital Marketing Specialist to help our clients grow their online presence. You'll develop and implement digital marketing strategies across various channels.",
    },
    {
      title: "Content Creator",
      type: "Part-time",
      location: "Remote",
      department: "Content",
      icon: <Camera size={24} />,
      description:
        "Join our team as a Content Creator to produce engaging content for our clients. You'll work on a variety of projects, from social media content to blog posts and video scripts.",
    },
  ]

  const JobCard = ({ job, index }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4 text-purple-600">{job.icon}</div>
            <div>
              <h3 className="text-2xl font-bold text-black">{job.title}</h3>
              <p className="text-neutral-500">{job.department}</p>
            </div>
          </div>
          <Briefcase className="text-purple-600" />
        </div>

        <p className="text-neutral-600 mb-6">{job.description}</p>

        <div className="flex flex-wrap gap-4 mb-6">
          <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">{job.type}</span>
          <span className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-sm font-medium">
            {job.location}
          </span>
        </div>

        <a
          href={`/careers/${job.title.toLowerCase().replace(/\s+/g, "-")}`}
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
        >
          Apply Now
        </a>
      </motion.div>
    )
  }

  return (
    <div className="relative z-10 px-8 md:px-16 py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">Open Positions</h2>
          <p className="text-xl text-neutral-600 max-w-2xl">
            Join our team of creative professionals and help us create exceptional experiences for our clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {positions.map((position, index) => (
            <JobCard key={index} job={position} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Don't see a position that fits?</h2>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            We're always interested in meeting talented people. Send us your portfolio and resume.
          </p>
          <a
            href="/contact"
            className="inline-block bg-purple-600 text-white px-8 py-4 text-lg font-medium rounded-full hover:bg-purple-700 transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </div>
  )
}
