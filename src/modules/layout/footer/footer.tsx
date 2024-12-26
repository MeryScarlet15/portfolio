import React from 'react'
import styles from './footer.module.scss'
import { IoLogoGithub, IoLogoLinkedin, IoMail } from 'react-icons/io5'
import { Link } from '@/components/link/link'

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__content}>
          <p className={styles.footer__text}>
            {new Date().getFullYear()} María Amado. Built with ❤️ in Spain.
          </p>
          <div className={styles.footer__icons}>
            <Link
              href="https://github.com/MeryScarlet15"
              className={styles.footer__icon}
              aria-label="Github">
              <IoLogoGithub size={20} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/maria-amado-854b6116a"
              className={styles.footer__icon}
              aria-label="LinkedIn">
              <IoLogoLinkedin size={20} />
            </Link>
            <Link
              href="mailto:maria_amado15@hotmail.com"
              className={styles.footer__icon}
              aria-label="Email">
              <IoMail size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
