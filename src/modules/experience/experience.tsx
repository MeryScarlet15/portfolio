import React from 'react'
import { Job } from './components/job/job'
import { jobs } from './components/job-list/job-list'

export const Experience: React.FC = () => {
  return (
    <section className="tablet:py-20 flex flex-col gap-6 py-10">
      <h2 className="animate-fade-in-up text-center text-[32px] leading-normal font-bold text-white opacity-0">
        Experience
      </h2>
      <ul className="section-wrapper flex flex-col gap-6">
        {jobs.map((job, index) => (
          <li
            className="animate-fade-in-up opacity-0"
            key={index}
            style={{ animationDelay: `${index * 0.1}s` }}>
            <Job job={job} />
          </li>
        ))}
      </ul>
    </section>
  )
}
