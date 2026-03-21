'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

const LERP_FACTOR = 0.15

const matchHoverableElements = (target: HTMLElement) => {
  return target.matches('a, button, p, h3, h4, h5, h6, span')
}

export const Cursor: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const isHoveringRef = useRef(false)

  const updateHover = useCallback((hovering: boolean) => {
    isHoveringRef.current = hovering
    setIsHovering(hovering)
  }, [])

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e: MouseEvent) => {
      if (matchHoverableElements(e.target as HTMLElement)) {
        updateHover(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      if (!matchHoverableElements(e.target as HTMLElement)) {
        updateHover(false)
      }
    }

    let raf: number

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * LERP_FACTOR
      current.current.y += (target.current.y - current.current.y) * LERP_FACTOR

      if (ref.current) {
        const offset = isHoveringRef.current ? 1 : 12
        ref.current.style.transform = `translate3d(${current.current.x - offset}px, ${current.current.y - offset}px, 0)`
      }

      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', updatePosition)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(raf)
    }
  }, [updateHover])

  return (
    <div
      ref={ref}
      className={`tablet:fixed tablet:block tablet:rounded-full tablet:pointer-events-none tablet:z-[600] tablet:mix-blend-difference tablet:transition-[width,height] tablet:duration-300 tablet:ease-out hidden ${
        isHovering
          ? 'tablet:h-[2px] tablet:w-[2px] tablet:bg-teal-500'
          : 'tablet:h-6 tablet:w-6 tablet:border-2 tablet:border-teal-500'
      }`}
      style={{ willChange: 'transform' }}
    />
  )
}
