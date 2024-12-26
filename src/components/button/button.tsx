'use client'

import React from 'react'
import styles from './button.module.scss'
import { Link } from '@/components/link/link'

interface Props {
  text: string
  ariaLabel: string
  className?: string
  role?: 'link' | 'button' | 'tab'
  onClick?: () => void
  href?: string
  target?: React.HTMLAttributeAnchorTarget
}

export const Button: React.FC<Props> = ({
  text,
  ariaLabel,
  role = 'button',
  onClick,
  href,
  className,
  target
}: Props) => {
  if (role !== 'link') {
    return (
      <button
        role={role}
        className={`${styles.button} ${styles.button_primary} ${className}`}
        aria-label={ariaLabel}
        onClick={() => {
          onClick?.()
        }}>
        {text}
      </button>
    )
  }

  return (
    <Link
      className={`${styles.button} ${styles.button_primary} ${className}`}
      href={href || '/'}
      target={target}
      aria-label={ariaLabel}
      onClick={onClick}>
      {text}
    </Link>
  )
}
