import React from 'react'

const clipPaths = {
  topRight: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)',
  bottomLeft: 'polygon(0 20%, 100% 0, 100% 100%, 0 100%)',
  bottomRight: 'polygon(0 0, 100% 20%, 100% 100%, 0 100%)',
  topLeft: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)'
}

interface Props {
  direction: keyof typeof clipPaths
  className?: string
}

export const PolygonHr = ({ direction = 'topRight', className }: Props) => {
  return (
    <hr
      className={`animate-fade-in m-0 h-[104px] border-none bg-teal-500 opacity-0 ${className}`}
      style={{
        clipPath: clipPaths[direction]
      }}
    />
  )
}
