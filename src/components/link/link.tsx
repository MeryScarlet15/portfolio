import React from 'react'
import NextLink, { LinkProps } from 'next/link'

export interface MainLinkProps extends LinkProps {
  'className'?: string
  'children'?: React.ReactNode
  'target'?: React.HTMLAttributeAnchorTarget
  'underlined'?: boolean
  'aria-label'?: string
}

export const Link: React.FC<MainLinkProps> = (props: MainLinkProps) => {
  const href = props.href
  let externalLinkProps = {}
  const isExternal = typeof href === 'string' && href.match(/^https?:\/\//)

  if (isExternal) {
    externalLinkProps = { target: '_blank', rel: 'noopener' }
  }

  return (
    <NextLink
      {...props}
      href={href}
      target={props.target}
      {...externalLinkProps}
      style={props.underlined ? { textDecoration: 'underline' } : {}}>
      {props.children}
    </NextLink>
  )
}
