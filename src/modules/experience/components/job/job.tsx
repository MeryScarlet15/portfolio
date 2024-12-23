'use client'

import React, { useState } from 'react'
import styles from './job.module.scss'
import { Link } from '@/components/link/link'

type Props = {
  job: {
    title: string
    company: string
    isStartup: boolean
    link?: string
    period: string
    description: React.ReactNode
  }
}

export const Job = ({ job }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <article className={styles.job}>
      <h3 className={styles.job__title}>
        {job.title} at {job.company}
      </h3>
      <p className={styles.job__meta}>
        {job.isStartup && 'Early-stage Start-up |'} {job.period}
      </p>
      {job.link && (
        <Link href={job.link} className={styles.job__link} target="_blank">
          Visit Company Website
        </Link>
      )}
      <div
        className={`${styles.job__description_wrapper} ${isExpanded ? styles.expanded : ''}`}>
        <div className={styles.job__description}>{job.description}</div>
        <div
          className={`${styles.job__fade} ${isExpanded ? styles.hidden : ''}`}
        />
      </div>

      <button
        className={styles.job__expand_button}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}>
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
    </article>
  )
}
