import { Metadata } from 'next'
import styles from './page.module.scss'
import Hero from '../modules/hero/hero'
import Main from '../modules/layout/main/main'
export const metadata: Metadata = {
  title: 'Maria Amado | Full Stack Developer',
  description: 'Full Stack Developer portfolio'
}

const Home = async () => {
  return (
    <Main className={styles.home__main}>
      <Hero />
    </Main>
  )
}

export default Home
