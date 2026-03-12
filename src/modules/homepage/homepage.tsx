'use client'

import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { PolygonHr } from '@/components/hr/polygon-hr/polygon-hr'
import { Hero } from '@/modules/hero/hero'
import dynamic from 'next/dynamic'

function useInView(threshold = 0.1) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const setRef = useCallback((node: HTMLDivElement | null) => {
    ref.current = node
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [inView, threshold])

  return [setRef, inView] as const
}

const About = dynamic(() => import('../about/about').then((mod) => mod.About))

const Skills = dynamic(() =>
  import('../skills/skills').then((mod) => mod.Skills)
)

const Experience = dynamic(() =>
  import('../experience/experience').then((mod) => mod.Experience)
)

export const HomePage: React.FC = () => {
  const [aboutRef, aboutInView] = useInView()
  const [skillsRef, skillsInView] = useInView()
  const [experienceRef, experienceInView] = useInView()

  return (
    <>
      <Hero />
      <PolygonHr direction="topRight" />

      <div
        ref={aboutRef}
        className="tablet:min-h-[600px] min-h-[300px] overflow-hidden"
        id="about">
        {aboutInView && (
          <Suspense fallback={<div>Loading About...</div>}>
            <About />
          </Suspense>
        )}
      </div>
      <PolygonHr direction="bottomLeft" />

      <div
        ref={skillsRef}
        className="tablet:min-h-[600px] min-h-[300px] overflow-hidden"
        id="skills">
        {skillsInView && (
          <Suspense fallback={<div>Loading Skills...</div>}>
            <Skills />
          </Suspense>
        )}
      </div>
      <PolygonHr direction="topLeft" />

      <div
        ref={experienceRef}
        className="tablet:min-h-[600px] min-h-[300px] overflow-hidden"
        id="experience">
        {experienceInView && (
          <Suspense fallback={<div>Loading Experience...</div>}>
            <Experience />
          </Suspense>
        )}
      </div>
    </>
  )
}
