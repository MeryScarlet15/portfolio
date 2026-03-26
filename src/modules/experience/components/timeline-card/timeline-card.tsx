import React from 'react'
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

export const TimelineCard = ({ job }: Props) => {
  return (
    <article className="from-black-80 to-black-100 flex flex-col gap-3 rounded-2xl bg-gradient-to-br p-6 ring-1 ring-white/[0.06] transition-all duration-300 ease-out hover:ring-teal-500/30">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3 className="text-xl leading-normal font-semibold text-white">
          {job.link ? (
            <Link
              href={job.link}
              className="transition-colors duration-300 hover:text-teal-500">
              {job.company}
            </Link>
          ) : (
            job.company
          )}
        </h3>
        {job.isStartup && (
          <span className="text-black-30 rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs font-medium">
            Startup
          </span>
        )}
      </div>
      <p className="text-base leading-normal font-medium text-teal-500">
        {job.title}
      </p>
      <p className="text-black-30 text-sm leading-normal">{job.period}</p>
      <div className="job-description mt-1">{job.description}</div>
    </article>
  )
}
