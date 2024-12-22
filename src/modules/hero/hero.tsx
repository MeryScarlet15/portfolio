import React from 'react'
import styles from './hero.module.scss'
import { Button } from '../../components/button/button'
import Image from 'next/image'
import heroImage from 'public/images/hero.png'
import { Link } from '@/components/link/link'
import { IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5'

export const Hero: React.FC = () => {
  return (
    <section className={styles.hero__container}>
      <div className={styles.hero__background}></div>
      <div className={styles.hero__background_gradient}></div>
      <article className={styles.hero}>
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>
            Hi there! <br />
            I'm María Amado
            <br />
            <span className={styles.hero__title_highlight}>
              A Javascript Fullstack Developer
            </span>
          </h1>

          <div className={styles.hero__cta_container}>
            <div className={styles.hero__social}>
              <Link
                href="https://github.com/MeryScarlet15"
                className={styles.hero__social_icon}>
                <IoLogoGithub size={24} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/maria-amado-854b6116a"
                className={styles.hero__social_icon}>
                <IoLogoLinkedin size={24} />
              </Link>
            </div>
            <div className={styles.hero__button}>
              <Button
                text="Get in touch"
                role="link"
                href="mailto:maria_amado15@hotmail.com"
                ariaLabel="Get in touch"
                className={styles.hero__button}
              />
            </div>
          </div>
        </div>
        <div className={styles.hero__image_container}>
          <Image
            width={450}
            className={styles.hero__image}
            src={heroImage}
            quality={100}
            alt="María Amado - Full Stack Developer"
            priority
            sizes="(max-width: 480px) 256px,
                   (max-width: 768px) 300px,
                   450px"
            style={{
              objectFit: 'cover'
            }}
          />
        </div>
      </article>
    </section>
  )
}
