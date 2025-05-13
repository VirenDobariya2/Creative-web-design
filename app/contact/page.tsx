"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin } from "lucide-react"
import ContactAnimation from "@/components/contact-animation"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: "hello@creativeweb.design",
      link: "mailto:hello@creativeapes.design",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: "+91 11111-22222",
      link: "tel:+9109864723423",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Locations",
      details: "India, India",
      link: "#",
    },
  ]

  return (
    <Layout darkMode={true}>
      <div className="relative min-h-screen pt-24">
        <div className="absolute inset-0 h-[50vh] z-0">
          <ContactAnimation />
        </div>

        <div className="relative z-10 pt-[30vh] px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl max-w-2xl">
              Have a project in mind or want to learn more about our services? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto text-black">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  onSubmit={handleSubmit}
                  className="bg-white p-8 rounded-lg"
                >
                  <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <div className="space-y-2 mb-6">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Send Message
                  </Button>
                </motion.form>
              </div>

              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-lg mb-8"
                >
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <div className="mr-4 mt-1 text-primary">{item.icon}</div>
                        <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          <a href={item.link} className="text-muted-foreground hover:text-primary">
                            {item.details}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-lg"
                >
                  <h2 className="text-2xl font-bold mb-6">Office Hours</h2>
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Monday - Friday:</span>
                      <br />
                      9:00 AM - 6:00 PM
                    </p>
                    <p>
                      <span className="font-semibold">Saturday:</span>
                      <br />
                      10:00 AM - 2:00 PM
                    </p>
                    <p>
                      <span className="font-semibold">Sunday:</span>
                      <br />
                      Closed
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
