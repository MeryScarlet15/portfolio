import React from 'react'
import styles from './about.module.scss'
import Image from 'next/image'
import aboutImage from 'public/images/about.jpg'

export const About: React.FC = () => {
  return (
    <section className={styles.about}>
      <h2 className={styles.about__title}>About Me</h2>
      <div className={styles.about__content}>
        <div className={styles.about__image_container}>
          <Image
            src={aboutImage}
            alt="María Amado - About Me"
            width={400}
            height={400}
            className={styles.about__image}
            loading="lazy"
            placeholder="blur"
            quality={75}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 400px, 400px"
            style={{
              objectFit: 'cover',
              borderRadius: '8px',
              filter: 'grayscale(30%)',
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        </div>
        <div className={styles.about__text}>
          <p>
            I’m Maria Amado, a Full Stack Developer with over 6 years of
            experience, based in Spain. I have expertise in Next.js, Nest.js,
            Node.js, React, Typescript, and SEO, among other technologies.
          </p>
          <p>
            I give great importance to SEO, user experience, performance, and
            clean code. I believe that a well-optimized, user-friendly
            application with clean and efficient code is the key to delivering
            great products
          </p>
          <p>
            When I’m not coding, I enjoy exploring new technologies, traveling,
            and working out.
          </p>

          <p>
            I'm open to new opportunities, particularly remote roles in Europe
            or the US.
          </p>
        </div>
      </div>
    </section>
  )
}
