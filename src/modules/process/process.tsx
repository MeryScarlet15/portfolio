import React from 'react'

const steps = [
  {
    number: '01',
    title: 'Find the problem',
    description:
      'Every project starts with understanding the real pain point. I dig into user feedback, analytics, and stakeholder goals to define what actually needs solving — not just what feels broken.'
  },
  {
    number: '02',
    title: 'Design the solution',
    description:
      'I map out the technical approach with scalability and simplicity in mind. Clean architecture, clear data flows, and pragmatic technology choices that fit the team and timeline.'
  },
  {
    number: '03',
    title: 'Ship it',
    description:
      'I write production-ready code with performance, accessibility, and SEO baked in from day one. Fast iterations, tight feedback loops, and no throwaway work.'
  },
  {
    number: '04',
    title: 'Validate the impact',
    description:
      "After shipping, I track the metrics that matter — Core Web Vitals, conversion rates, user engagement. If the numbers don't move, we iterate until they do."
  }
]

export const Process: React.FC = () => {
  return (
    <section className="tablet:py-20 py-10">
      <div className="section-wrapper items-center gap-6">
        <h2 className="animate-fade-in-up text-[32px] leading-normal font-bold text-white opacity-0">
          How I Work
        </h2>
        <ul className="phone:grid-cols-2 grid grid-cols-1 gap-6">
          {steps.map((step, index) => (
            <li
              className="animate-fade-in-up group from-black-80 to-black-100 relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-gradient-to-br p-6 opacity-0 ring-1 ring-white/[0.06] transition-all duration-300 ease-out hover:ring-teal-500/30"
              key={index}
              style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-teal-500/30 transition-all duration-500 group-hover:text-teal-500/50">
                  {step.number}
                </span>
                <h3 className="text-2xl font-semibold text-white">
                  {step.title}
                </h3>
              </div>
              <p className="text-black-30 text-lg leading-relaxed">
                {step.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
