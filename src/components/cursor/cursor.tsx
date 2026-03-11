'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const matchHoverableElements = (target: HTMLElement) => {
  return target.matches('a, button, p, h3, h4, h5, h6, span')
}

export const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (matchHoverableElements(target)) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!matchHoverableElements(target)) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', updatePosition)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <motion.div
      className={`tablet:fixed tablet:block tablet:rounded-full tablet:pointer-events-none tablet:z-[600] tablet:mix-blend-difference tablet:transition-[width,height] tablet:duration-300 tablet:ease-out hidden ${
        isHovering
          ? 'tablet:h-[2px] tablet:w-[2px] tablet:bg-teal-500'
          : 'tablet:h-6 tablet:w-6 tablet:border-2 tablet:border-teal-500'
      }`}
      animate={{
        x: position.x - (isHovering ? 1 : 12),
        y: position.y - (isHovering ? 1 : 12)
      }}
      transition={{ type: 'spring', damping: 30, mass: 0.5, stiffness: 400 }}
    />
  )
}
