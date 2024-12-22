import { Metadata } from 'next'
import styles from './page.module.scss'
import Main from '../modules/layout/main/main'
import { HomePage } from '@/modules/homepage/homepage'

export const metadata: Metadata = {
  title: 'Maria Amado | Full Stack Developer',
  description: 'Full Stack Developer portfolio'
}

const Home = async () => {
  return (
    <Main className={styles.home__main}>
      <HomePage />
    </Main>
  )
}

export default Home
