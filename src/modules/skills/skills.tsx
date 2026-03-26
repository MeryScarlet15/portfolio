import React from 'react'
import {
  TbBrain,
  TbChartBar,
  TbCloud,
  TbCode,
  TbPalette,
  TbServer
} from 'react-icons/tb'

import { Skill } from './components/skill/skill'

const skills = [
  {
    category: 'AI & Automation',
    technologies: [
      'Claude',
      'Claude Code',
      'Gemini',
      'Vertex AI',
      'OpenAI',
      'Cursor',
      'n8n',
      'AI-assisted development',
      'Prompt engineering'
    ],
    icon: TbBrain
  },
  {
    category: 'UX / UI',
    technologies: [
      'Accessibility',
      'Mobile-first design',
      'Responsive design',
      'Design systems'
    ],
    icon: TbPalette
  },
  {
    category: 'Frontend',
    technologies: [
      'Next.js',
      'Astro',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Caching techniques',
      'Performance optimization'
    ],
    icon: TbCode
  },
  {
    category: 'Backend',
    technologies: [
      'Node.js',
      'Nest.js',
      'Python',
      'GraphQL',
      'PostgreSQL',
      'Clean Architecture'
    ],
    icon: TbServer
  },
  {
    category: 'Cloud & DevOps',
    technologies: ['Vercel', 'Google Cloud Platform', 'AWS', 'CI/CD', 'Docker'],
    icon: TbCloud
  },
  {
    category: 'SEO & Analytics',
    technologies: [
      'Core Web Vitals',
      'Technical SEO',
      'PostHog',
      'Google Analytics',
      'Competitive analysis',
      'Performance monitoring & audits'
    ],
    icon: TbChartBar
  }
]

const ctaPoints = [
  'Quick learner — even faster with AI',
  'Adapts to any stack on the fly',
  'Self-driven and resourceful',
  'Solves complex problems creatively'
]

export const Skills: React.FC = () => {
  return (
    <section className="bg-black-60 tablet:py-20 py-10">
      <div className="section-wrapper">
        <h2 className="animate-fade-in-up tablet:mb-8 mb-6 text-center text-[32px] leading-normal font-medium text-white opacity-0">
          Main Skills
        </h2>
        <ul className="phone:grid-cols-2 tablet:grid-cols-3 tablet:gap-6 laptop:grid-cols-2 grid grid-cols-1 gap-4">
          {skills.map((skill, index) => (
            <li
              className="animate-fade-in-up opacity-0"
              key={index}
              style={{ animationDelay: `${index * 0.1}s` }}>
              <Skill skill={skill} />
            </li>
          ))}
        </ul>

        <div
          className="animate-fade-in-up tablet:mt-6 mt-4 opacity-0"
          style={{ animationDelay: `${skills.length * 0.1}s` }}>
          <article className="from-black-80 to-black-100 flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-br p-6 text-center ring-1 ring-teal-500/30">
            <h3 className="text-2xl leading-normal font-semibold text-white">
              Don&apos;t see the skill or tech you need?
            </h3>
            <p className="text-black-30 text-lg leading-relaxed">
              {ctaPoints.join(' · ')}
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
