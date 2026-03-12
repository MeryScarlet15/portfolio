'use client'

import dynamic from 'next/dynamic'

const Cursor = dynamic(
  () => import('@/components/cursor/cursor').then((mod) => mod.Cursor),
  { ssr: false }
)

export const LazyCursor: React.FC = () => <Cursor />
