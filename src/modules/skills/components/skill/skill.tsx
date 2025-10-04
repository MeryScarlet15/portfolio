import { ProgressBar } from '@/components/progress-bar/progress-bar'
import styles from './skill.module.scss'

interface Props {
  skill: {
    category: string
    technologies: string[]
    level: number
  }
}

export const Skill = ({ skill }: Props) => {
  return (
    <article className={`${styles.skill}`}>
      <h3 className={styles.skill__category}>{skill.category}</h3>
      <p className={styles.skill__technologies}>
        {skill.technologies.join(', ')}
      </p>
      <ProgressBar percentage={skill.level} />
    </article>
  )
}
