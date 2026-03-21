import { Metadata } from 'next'
import Main from '@/modules/layout/main/main'
import { HomePage } from '@/modules/homepage/homepage'

export const metadata: Metadata = {
  title: 'Maria Amado | Full Stack Developer',
  description:
    'Full Stack Developer with 6+ years of experience specializing in Next.js, React, TypeScript, and Node.js. Based in Spain, open to remote roles.'
}

const Home = async () => {
  return (
    <Main className="!pt-0">
      <HomePage />
    </Main>
  )
}

export default Home
