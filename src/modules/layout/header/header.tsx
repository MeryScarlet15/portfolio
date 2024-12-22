import React from 'react'
import styles from './header.module.scss'
import Link from 'next/link'

const sections = ['Home', 'About', 'Skills', 'Experience', 'Contact']

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <div className={styles.header__title}>&lt;MA/&gt;</div>
        <ul className={styles.header__ul}>
          {sections.map((item) => (
            <li key={item} className={styles.header__li}>
              <Link
                href={`#${item.toLowerCase()}`}
                className={styles.header__li__button}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
