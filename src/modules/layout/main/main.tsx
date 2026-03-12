import React, { Suspense } from 'react'

import { Header } from '@/modules/layout/header/header'
import { Footer } from '@/modules/layout/footer/footer'
import { LazyCursor } from '@/components/cursor/lazy-cursor'

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
      <Suspense>
        <LazyCursor />
      </Suspense>
      <Header />

      <main
        className={`tablet:pt-[104px] big-tablet:pt-[104px] min-h-screen pt-[88px] ${className}`}>
        {children}
      </main>
      <Footer />
    </>
  )
}
