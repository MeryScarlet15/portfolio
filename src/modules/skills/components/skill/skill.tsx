import { ProgressBar } from '@/components/progress-bar/progress-bar'

interface Props {
  skill: {
    category: string
    technologies: string[]
    level: number
  }
}

export const Skill = ({ skill }: Props) => {
  return (
    <article className="bg-black-100 rounded-[10px] border-2 border-transparent p-5 transition-all duration-300 ease-out hover:scale-[1.02] hover:border-teal-500 hover:shadow-[0_0_20px_rgba(20,184,166,0.4),0_0_40px_rgba(20,184,166,0.2)]">
      <h3 className="mb-3 text-2xl leading-normal font-bold text-white">
        {skill.category}
      </h3>
      <p className="text-black-30 mb-4 text-sm leading-[1.4] font-normal">
        {skill.technologies.join(', ')}
      </p>
      <ProgressBar percentage={skill.level} />
    </article>
  )
}
