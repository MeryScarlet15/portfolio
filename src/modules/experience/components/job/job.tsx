import React from 'react'
import styles from './job.module.scss'

type Props = {
  job: {
    title: string
    company: string
    isStartup: boolean
    period: string
    description: React.ReactNode
  }
}

export const Job = ({ job }: Props) => {
  return (
    <article className={styles.job}>
      <h3 className={styles.job__title}>
        {job.title} at {job.company}
      </h3>
      <p className={styles.job__meta}>
        {job.isStartup && 'Early-stage Start-up |'} {job.period}
      </p>
      <p className={styles.job__description}>{job.description}</p>
    </article>
  )
}
