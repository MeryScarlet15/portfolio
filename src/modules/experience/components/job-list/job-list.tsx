import { Aluxion } from '../jobs/aluxion'
import { Cibernos } from '../jobs/cibernos'
import { Dime } from '../jobs/dime'
import { Fence } from '../jobs/fence'
import { Revel } from '../jobs/revel'
import { Thingtesting } from '../jobs/thingtesting'

export const jobs = [
  {
    title: 'Software Developer',
    company: 'Thingtesting',
    link: 'https://thingtesting.com/',
    isStartup: true,
    period: '12/2022 - 01/2025 (2 years 1 month)',
    description: <Thingtesting />
  },
  {
    title: 'Frontend developer (Freelance)',
    company: 'Fence',
    link: 'https://fence.finance/',
    isStartup: true,
    period: '10/2023 - 06/2024 (8 months)',
    description: <Fence />
  },
  {
    title: 'Full-stack Developer',
    company: 'Revel',
    link: 'https://driverevel.com/',
    isStartup: true,
    period: '12/2019 - 12/2022 (3 years 1 month)',
    description: <Revel />
  },
  {
    title: 'Frontend developer (Freelance)',
    company: 'Dime',
    link: 'https://www.ridedime.app',
    isStartup: true,
    period: '07/2020 - 08/2022 (2 years 2 months)',
    description: <Dime />
  },
  {
    title: 'Front End Developer',
    company: 'Aluxion Labs',
    isStartup: false,
    period: '01/2019 - 12/2019 (12 months)',
    description: <Aluxion />
  },
  {
    title: 'Intern',
    company: 'Cibernos',
    isStartup: false,
    period: '10/2018 - 01/2019 (4 months)',
    description: <Cibernos />
  }
]
