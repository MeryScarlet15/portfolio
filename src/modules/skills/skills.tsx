import React from 'react'
import { Skill } from './components/skill/skill'
import styles from './skills.module.scss'

const skills = [
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
    level: 100
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
    level: 100
  },
  {
    category: 'SEO & Performance',
    technologies: [
      'Core Web Vitals',
      'Technical SEO',
      'Competitive analysis',
      'User intent analysis',
      'Performance monitoring & audits'
    ],
    level: 100
  },
  {
    category: 'AI & Automation',
    technologies: [
      'OpenAI',
      'Claude',
      'Gemini (Google)',
      'Cursor IDE',
      'Prompt engineering'
    ],
    level: 100
  },
  {
    category: 'Cloud & DevOps',
    technologies: ['Vercel', 'Google Cloud Platform', 'AWS', 'CI/CD', 'Docker'],
    level: 100
  },
  {
    category: 'UX / UI Development',
    technologies: ['Accessibility', 'Responsive design', 'Design systems'],
    level: 100
  },

  {
    category: "Don't see the technology you need?",
    technologies: [
      'Fast learning of new technologies',
      'Agile adaptation to any stack',
      'Self-taught',
      'Complex problem solving'
    ],
    level: 100
  }
]

export const Skills: React.FC = () => {
  return (
    <section className={styles.skills}>
      <div className={styles.skills__container}>
        <h2 className={styles.skills__title}>Main Technologies</h2>
        <ul className={styles.skills__grid}>
          {skills.map((skill, index) => (
            <li
              className={styles.skills__grid_element}
              key={index}
              style={{ animationDelay: `${index * 0.1}s` }}>
              <Skill skill={skill} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
