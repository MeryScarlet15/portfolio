'use client'

import React, { useState } from 'react'
import { TimelineCard } from './components/timeline-card/timeline-card'
import { jobs } from './components/job-list/job-list'

const VISIBLE_COUNT = 4

export const Experience: React.FC = () => {
  const [expanded, setExpanded] = useState(false)

  const visibleJobs = jobs.slice(0, VISIBLE_COUNT)
  const hiddenJobs = jobs.slice(VISIBLE_COUNT)

  return (
    <section className="tablet:py-20 flex flex-col gap-6 py-10">
      <h2 className="animate-fade-in-up text-center text-[32px] leading-normal font-bold text-white opacity-0">
        Experience
      </h2>
      <div className="section-wrapper">
        <ol className="relative flex flex-col gap-6 before:absolute before:top-0 before:bottom-0 before:left-[5px] before:w-px before:bg-white/10">
          {visibleJobs.map((job, index) => (
            <li
              key={index}
              className="animate-fade-in-up relative pl-8 opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Timeline dot */}
              <div
                className={`absolute top-8 left-0 size-[11px] rounded-full ${
                  index === 0 ? 'animate-pulse-dot bg-teal-500' : 'bg-white/20'
                }`}
              />
              <TimelineCard job={job} />
            </li>
          ))}

          {hiddenJobs.length > 0 && !expanded && (
            <li className="relative pl-8">
              <div className="absolute top-4 left-0 size-[11px] rounded-full bg-white/20" />
              <button
                onClick={() => setExpanded(true)}
                className="text-black-30 cursor-pointer text-sm leading-normal transition-colors duration-300 hover:text-teal-500">
                Show {hiddenJobs.length} earlier roles
              </button>
            </li>
          )}

          {expanded &&
            hiddenJobs.map((job, index) => (
              <li
                key={index + VISIBLE_COUNT}
                className="animate-fade-in-up relative pl-8 opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="absolute top-8 left-0 size-[11px] rounded-full bg-white/20" />
                <TimelineCard job={job} />
              </li>
            ))}
        </ol>
      </div>
    </section>
  )
}
