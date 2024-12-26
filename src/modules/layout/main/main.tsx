import React from 'react'

import styles from './main.module.scss'
import { Header } from '@/modules/layout/header/header'
import { Footer } from '@/modules/layout/footer/footer'
import { Cursor } from '@/components/cursor/cursor'

interface Props {
  children: React.ReactNode
  className?: string
  noMargin?: boolean
}

export default function Main({
  children,
  className = ''
}: Props): React.ReactElement {
  return (
    <>
      <Cursor />
      <Header />

      <main className={`${styles.main}  ${className}`}>{children}</main>
      <Footer />
    </>
  )
}
