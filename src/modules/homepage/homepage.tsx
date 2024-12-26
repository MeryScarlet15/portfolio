'use client'

import React, { Suspense } from 'react'
import { PolygonHr } from '@/components/hr/polygon-hr/polygon-hr'
import { Hero } from '@/modules/hero/hero'
import dynamic from 'next/dynamic'
import { useInView } from 'react-intersection-observer'
import styles from './homepage.module.scss'
// Lazy-loaded components
const About = dynamic(() => import('../about/about').then((mod) => mod.About), {
  suspense: true
})
const Skills = dynamic(
  () => import('../skills/skills').then((mod) => mod.Skills),
  {
    suspense: true
  }
)
const Experience = dynamic(
  () => import('../experience/experience').then((mod) => mod.Experience),
  {
    suspense: true
  }
)

export const HomePage: React.FC = () => {
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  const [skillsRef, skillsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  const [experienceRef, experienceInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <>
      <Hero />
      <PolygonHr direction="topRight" />

      <div ref={aboutRef} className={styles.homepage__section} id="about">
        {aboutInView && (
          <Suspense fallback={<div>Loading About...</div>}>
            <About />
          </Suspense>
        )}
      </div>
      <PolygonHr direction="bottomLeft" />

      <div ref={skillsRef} className={styles.homepage__section} id="skills">
        {skillsInView && (
          <Suspense fallback={<div>Loading Skills...</div>}>
            <Skills />
          </Suspense>
        )}
      </div>
      <PolygonHr direction="topLeft" />

      <div
        ref={experienceRef}
        className={styles.homepage__section}
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
