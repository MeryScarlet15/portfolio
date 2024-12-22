'use client'

import React, { useEffect, useState } from 'react'
import styles from './cursor.module.scss'
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
      className={`${styles.cursor} ${isHovering ? styles.cursor_expanded : ''}`}
      animate={{
        x: position.x - (isHovering ? 1 : 12),
        y: position.y - (isHovering ? 1 : 12)
      }}
      transition={{ type: 'spring', damping: 30, mass: 0.5, stiffness: 400 }}
    />
  )
}
