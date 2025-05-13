"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion";


export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])

  useEffect(() => {
    const handleMouseOver = () => setCursorVariant("hover")
    const handleMouseOut = () => setCursorVariant("default")

    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseover", handleMouseOver)
      link.addEventListener("mouseout", handleMouseOut)
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseover", handleMouseOver)
        link.removeEventListener("mouseout", handleMouseOut)
      })
    }
  }, [])

  const variants: Variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      backgroundColor: "#9d4edd",
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "#9d4edd",
      mixBlendMode: "difference" as const, // 👈 FIX
    },
  }
  
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50 hidden md:block"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      />
    </>
  )
}
