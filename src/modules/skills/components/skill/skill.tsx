import React from 'react'
import { type IconType } from 'react-icons'

interface Props {
  skill: {
    category: string
    technologies: string[]
    icon: IconType
  }
}

export const Skill = ({ skill }: Props) => {
  const Icon = skill.icon

  return (
    <article className="from-black-80 to-black-100 group flex h-full flex-col gap-4 rounded-2xl bg-gradient-to-br p-6 ring-1 ring-white/[0.06] transition-all duration-300 ease-out hover:ring-teal-500/30">
      <div className="flex items-center gap-3">
        <Icon className="size-7 shrink-0 text-teal-500" />
        <h3 className="text-2xl leading-normal font-semibold text-white">
          {skill.category}
        </h3>
      </div>
      <p className="text-black-30 text-lg leading-relaxed">
        {skill.technologies.join(' · ')}
      </p>
    </article>
  )
}
