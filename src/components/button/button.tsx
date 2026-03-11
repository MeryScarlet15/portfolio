'use client'

import React from 'react'
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

const buttonClasses =
  'cursor-pointer w-full h-12 flex items-center justify-center rounded px-3 text-base font-normal leading-normal transition-all duration-200 ease-in-out border border-teal-500 bg-teal-500 text-white shadow-[0px_4px_31px_0px_rgba(0,0,0,0.15)] hover:border-white hover:bg-white hover:text-black-100'

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
        className={`${buttonClasses} ${className}`}
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
      className={`${buttonClasses} ${className}`}
      href={href || '/'}
      target={target}
      aria-label={ariaLabel}
      onClick={onClick}>
      {text}
    </Link>
  )
}
