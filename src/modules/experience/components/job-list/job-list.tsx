import { Aluxion } from '../jobs/aluxion'
import { Cibernos } from '../jobs/cibernos'
import { Dime } from '../jobs/dime'
import { Fence } from '../jobs/fence'
import { Filed } from '../jobs/filed'
import { Revel } from '../jobs/revel'
import { Thingtesting } from '../jobs/thingtesting'

export const jobs = [
  {
    title: 'Member of Technical Staff',
    company: 'Filed',
    link: 'https://www.filed.com/',
    isStartup: true,
    period: 'Jan 2025 — Present',
    description: <Filed />
  },
  {
    title: 'Software Developer',
    company: 'Thingtesting',
    link: 'https://thingtesting.com/',
    isStartup: true,
    period: 'Dec 2022 — Jan 2025',
    description: <Thingtesting />
  },
  {
    title: 'Frontend Developer, Freelance',
    company: 'Fence',
    link: 'https://fence.finance/',
    isStartup: true,
    period: 'Oct 2023 — Jun 2024',
    description: <Fence />
  },
  {
    title: 'Full-Stack Developer',
    company: 'Revel',
    link: 'https://driverevel.com/',
    isStartup: true,
    period: 'Dec 2019 — Dec 2022',
    description: <Revel />
  },
  {
    title: 'Frontend Developer, Freelance',
    company: 'Dime',
    link: 'https://www.ridedime.app',
    isStartup: true,
    period: 'Jul 2020 — Aug 2022',
    description: <Dime />
  },
  {
    title: 'Front-End Developer',
    company: 'Aluxion Labs',
    isStartup: false,
    period: 'Jan 2019 — Dec 2019',
    description: <Aluxion />
  },
  {
    title: 'Intern',
    company: 'Cibernos',
    isStartup: false,
    period: 'Oct 2018 — Jan 2019',
    description: <Cibernos />
  }
]
