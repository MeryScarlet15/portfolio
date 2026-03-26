'use client'

import React, { Suspense, useCallback, useEffect, useRef } from 'react'
import { PolygonHr } from '@/components/hr/polygon-hr/polygon-hr'
import { Hero } from '@/modules/hero/hero'
import dynamic from 'next/dynamic'
import { Conversion } from '@/modules/conversion/conversion'

function useAnimateOnScroll() {
  const ref = useRef<HTMLDivElement>(null)

  const setRef = useCallback((node: HTMLDivElement | null) => {
    ref.current = node
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return setRef
}

const About = dynamic(() => import('../about/about').then((mod) => mod.About))

const Process = dynamic(() =>
  import('../process/process').then((mod) => mod.Process)
)

const Skills = dynamic(() =>
  import('../skills/skills').then((mod) => mod.Skills)
)

const Experience = dynamic(() =>
  import('../experience/experience').then((mod) => mod.Experience)
)

export const HomePage: React.FC = () => {
  const aboutRef = useAnimateOnScroll()
  const processRef = useAnimateOnScroll()
  const skillsRef = useAnimateOnScroll()
  const experienceRef = useAnimateOnScroll()

  return (
    <>
      <Hero />
      <PolygonHr direction="topRight" />

      <div ref={aboutRef} className="animate-on-scroll">
        <Suspense>
          <About />
        </Suspense>
      </div>
      <PolygonHr direction="bottomLeft" />

      <div ref={processRef} className="animate-on-scroll">
        <Suspense>
          <Process />
        </Suspense>
      </div>
      <PolygonHr direction="topRight" />

      <div ref={skillsRef} className="animate-on-scroll">
        <Suspense>
          <Skills />
        </Suspense>
      </div>
      <PolygonHr direction="topLeft" />

      <div ref={experienceRef} className="animate-on-scroll">
        <Suspense>
          <Experience />
        </Suspense>
      </div>
      <PolygonHr direction="topRight" />

      <Conversion />
    </>
  )
}
