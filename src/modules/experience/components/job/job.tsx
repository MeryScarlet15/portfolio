'use client'

import React, { useEffect, useRef, useState } from 'react'
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

  const descriptionWrapperRef = useRef<HTMLDivElement>(null)
  const [showMoreButton, setShowMoreButton] = useState(false)

  useEffect(() => {
    if (descriptionWrapperRef.current) {
      const descriptionText = descriptionWrapperRef.current.innerText || ''
      setShowMoreButton(descriptionText.length > 400)
    }
  }, [job.description])

  return (
    <article className="bg-black-60 flex flex-col gap-1 rounded-lg p-4 shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
      <h3 className="text-xl leading-normal font-medium text-teal-500">
        {job.title} at {job.company}
      </h3>
      <p className="text-base leading-normal font-normal text-[#aaa]">
        {job.isStartup && 'Early-stage Start-up |'} {job.period}
      </p>
      {job.link && (
        <Link
          href={job.link}
          className="mt-2 mb-4 text-teal-500 underline transition-colors duration-300 hover:text-white"
          target="_blank">
          Visit Company Website
        </Link>
      )}
      <div
        ref={descriptionWrapperRef}
        className={`relative overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isExpanded ? 'max-h-[2000px]' : 'max-h-[100px]'}`}>
        <div className="job-description">{job.description}</div>
        <div
          className={`to-black-60 pointer-events-none absolute right-0 bottom-0 left-0 h-[100px] bg-gradient-to-b from-transparent transition-opacity duration-300 ease-out ${!showMoreButton || isExpanded ? 'opacity-0' : ''}`}
        />
      </div>

      {showMoreButton && (
        <button
          className="mt-2 cursor-pointer border-none bg-none p-2 text-sm leading-normal font-normal text-teal-500 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-white active:translate-y-0"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}>
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      )}
    </article>
  )
}
