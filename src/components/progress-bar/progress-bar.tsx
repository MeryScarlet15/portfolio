import React from 'react'

interface Props {
  percentage: number
}

export const ProgressBar = ({ percentage }: Props) => {
  return (
    <div
      className="bg-black-40 h-[10px] w-full overflow-hidden rounded-[10px]"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}>
      <div
        className="animate-fill-bar h-full w-0 origin-left rounded-[10px] bg-teal-500"
        style={{ width: `${percentage}%` }}></div>
    </div>
  )
}
