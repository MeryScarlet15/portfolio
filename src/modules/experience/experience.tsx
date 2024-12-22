import React from 'react'
import styles from './experience.module.scss'
import { Job } from './components/job/job'

const jobs = [
  {
    title: 'Software Developer',
    company: 'Thingtesting',
    isStartup: true,
    period: '12/2022 - 01/2025 (2 years 1 month)',
    description: (
      <>
        <p>
          In my first year at Thingtesting, I contributed to multiple features
          across various projects, including the Next.js frontend, NestJS API,
          and Google Cloud Platform for seamless deployment and scalability. My
          focus was on performance optimization and building a scalable
          architecture.
        </p>

        <p>
          I have been using Cursor as my primary IDE and ChatGPT to further
          develop my skills, optimizing my workflow and improving my efficiency
          as a developer. I also implemented some features using the OpenAI API,
          introducing innovative functionality to enhance the product.
        </p>

        <p>
          In the last 4 months, I took on the responsibility of leading the SEO
          aspect of the product. I provided bi-weekly reports that tracked our
          progress and highlighted new insights about user behavior. These
          reports included SEO analysis and recommendations to increase
          impressions, clicks, and rankings. I focused on initiatives such as
          integrating our products with Google Merchant Center, optimizing
          content for Google Snippets, and enhancing Web Core Vitals to improve
          website performance.
        </p>
      </>
    )
  },
  {
    title: 'Frontend developer (Freelance)',
    company: 'Fence',
    isStartup: true,
    period: '10/2023 - 06/2024 (8 months)',
    description: (
      <>
        <p>
          I developed the first version of the Fence's website from scratch
          using Next.js with the latest server components functionality and CSS
          and Motion for complex animations. My primary focus was on building a
          scalable architecture that could evolve with the product, ensuring
          both maintainability and high performance. Additionally, I spearheaded
          the development of the main app’s product dashboard from the ground
          up, applying the same technologies and prioritizing a modular,
          reusable, and scalable architecture. I further optimized performance
          by incorporating advanced caching strategies, to improve load times.
        </p>
      </>
    )
  },
  {
    title: 'Full-stack Developer',
    company: 'Revel',
    isStartup: true,
    period: '12/2019 - 12/2022 (3 years 1 month)',
    description: (
      <>
        <p>
          During my first year at Revel, I focused on frontend development,
          establishing a consistent code structure with hexagonal architecture
          for all frontend projects. The technologies I used included:
        </p>

        <ul className={styles.experience__list}>
          <li>Next.js: To enable server-side rendering and improve SEO</li>
          <li>
            TypeScript: For better project maintainability and error detection
          </li>
          <li>HTML5: Ensuring proper use of HTML5 semantic tags</li>
          <li>
            Styled Components: For efficient styling and component-based design
          </li>
          <li>
            Storybook: To document and test UI components with React Testing
            Library
          </li>
        </ul>

        <p>
          In my second year, I expanded my role to include backend tasks such as
          API development, deployment, and utilizing AWS. On the backend, I
          worked with Express.js and continued using hexagonal architecture. I
          also improved frontend-backend communication by documenting all
          requests and their types using Postman and running automated tests on
          the requests.
        </p>

        <p>
          Additionally, I developed bots using JavaScript and handled ETL jobs
          with Python.
        </p>
      </>
    )
  },
  {
    title: 'Frontend developer (Freelance)',
    company: 'Dime',
    isStartup: true,
    period: '07/2020 - 08/2022 (2 years 2 months)',
    description: (
      <>
        <p>
          I was hired for 8 hours per week on a freelance basis and was
          responsible for developing the main app from scratch using React
          Native and TypeScript, ensuring a seamless, high-performance
          experience across both iOS and Android platforms. Additionally, I
          built and maintained the company’s website using Next.js, TypeScript,
          and Styled-components.
        </p>
      </>
    )
  },
  {
    title: 'Front End Developer',
    company: 'Aluxion Labs',
    isStartup: false,
    period: '01/2019 - 12/2019 (12 months)',
    description: (
      <>
        <p>
          I focused on fixing bugs and developing major features across multiple
          projects using technologies like:
        </p>

        <ul className={styles.experience__list}>
          <li>JavaScript & TypeScript</li>
          <li>React.js & Next.js</li>
          <li>Node.js & Express.js</li>
          <li>HTML5 & CSS</li>
          <li>jQuery & Styled Components</li>
          <li>Git & Storybook</li>
        </ul>
      </>
    )
  },
  {
    title: 'Intern',
    company: 'Cibernos',
    isStartup: false,
    period: '10/2018 - 01/2019 (4 months)',
    description: (
      <>
        <p>
          I focused on fundamentals and development of advanced applications
          with the tool PLAN using SQL
        </p>
      </>
    )
  }
]

export const Experience: React.FC = () => {
  return (
    <section className={styles.experience}>
      <h2 className={styles.experience__title}>Experience</h2>
      <ul className={styles.experience__job_list}>
        {jobs.map((job, index) => (
          <li
            className={styles.experience__job_element}
            key={index}
            style={{ animationDelay: `${index * 0.1}s` }}>
            <Job job={job} />
          </li>
        ))}
      </ul>
    </section>
  )
}
