import React from 'react'
import styles from './experience.module.scss'
import { Job } from './components/job/job'
import { jobs } from './components/job-list/job-list'

export const Experience: React.FC = () => {
  return (
    <section className={styles.experience}>
      <h2 className={styles.experience__title}>Experience</h2>
      <ul className={styles.experience__job_list}>
        {jobs.map((job, index) => (
          <li
            className={styles.experience__job_element}
            key={index}
            style={{ animationDelay: `${index * 0.1}s` }}>
            <Job job={job} />
          </li>
        ))}
      </ul>
    </section>
  )
}
