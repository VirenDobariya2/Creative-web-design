"use client"



import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

// interface LayoutProps {
//   children: React.ReactNode
//   darkMode?: boolean
// }

export default function Layout({ children, darkMode = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/projects", label: "Projects" },
    { href: "/services", label: "Services" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ]

  const textColor = darkMode ? "text-white" : "text-black"
  const bgColor = darkMode ? "bg-black" : "bg-white"
  const navBgColor = darkMode ? "bg-[#4c1d95]" : "bg-[#65a30d]"
  const activeBgColor = darkMode ? "bg-[#7e22ce]" : "bg-[#84cc16]"
  const borderColor = darkMode ? "border-neutral-800" : "border-neutral-200"

  return (
    <div className={`min-h-screen ${darkMode ? "bg-black text-white" : "bg-black text-white"}`}>
      <header className="fixed top-0 left-0 right-0 z-40 p-6 md:p-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl md:text-3xl font-bold flex items-center">
            <div className="flex flex-wrap w-16">
              <div className="w-6 h-6 bg-white rounded-full mr-1 mb-1"></div>
              <div className="w-6 h-6 bg-white rounded-full"></div>
              <div className="w-6 h-6 bg-[#65a30d] rounded-full mr-1"></div>
              <div className="w-6 h-6 bg-[#4c1d95] rounded-full"></div>
            </div>
            <span className={`ml-2 ${textColor}`}>creative apes</span>
          </Link>

          <div className="hidden md:flex space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-lg px-4 py-2 rounded-full ${
                  pathname === link.href
                    ? `${activeBgColor} text-white font-bold`
                    : `${navBgColor} text-white font-medium hover:${activeBgColor} hover:text-white`
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={toggleMenu}
            className={`md:hidden z-50 p-2 ${textColor}`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={`fixed inset-0 ${bgColor} z-40 flex flex-col justify-center items-center`}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <nav className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-3xl ${pathname === link.href ? `font-bold ${darkMode ? "text-[#7e22ce]" : "text-[#84cc16]"}` : `font-medium ${textColor}`}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>

      <footer className={`py-12 px-8 md:px-16 border-t ${borderColor} ${darkMode ? "bg-white" : "bg-white"}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <div className="flex flex-wrap w-12 mr-2">
                <div className="w-5 h-5 bg-black rounded-full mr-1 mb-1"></div>
                <div className="w-5 h-5 bg-black rounded-full"></div>
                <div className="w-5 h-5 bg-[#65a30d] rounded-full mr-1"></div>
                <div className="w-5 h-5 bg-[#4c1d95] rounded-full"></div>
              </div>
              <span className={textColor}>creative apps</span>
            </h3>
            <p className={`${darkMode ? "text-neutral-400" : "text-neutral-600"}`}>
              Creating exceptional designs and brand experiences.
            </p>
          </div>

          <div className="text-black">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="mb-2">hello@creativeapps.design</p>
            <p>+91 11111-22222</p>
          </div>

          <div className="text-black">
            <h4 className="text-lg font-semibold mb-4">Locations</h4>
            <p className="mb-2">India</p>
            <p>India</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className={`text-sm ${darkMode ? "text-neutral-400" : "text-neutral-600"}`}>
            © {new Date().getFullYear()} Creative design. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className={`text-sm hover:${darkMode ? "text-[#7e22ce]" : "text-[#84cc16]"} ${textColor}`}>
              Instagram
            </Link>
            <Link href="#" className={`text-sm hover:${darkMode ? "text-[#7e22ce]" : "text-[#84cc16]"} ${textColor}`}>
              LinkedIn
            </Link>
            <Link href="#" className={`text-sm hover:${darkMode ? "text-[#7e22ce]" : "text-[#84cc16]"} ${textColor}`}>
              Behance
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
