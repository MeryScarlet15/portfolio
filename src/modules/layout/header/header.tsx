import Link from 'next/link'
import React from 'react'

const sections = [
  { label: 'About', id: 'about' },
  { label: 'How I Work', id: 'how-i-work' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' }
]

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-[400] flex items-center justify-center bg-[rgba(24,24,24,0.6)] backdrop-blur-[10px]">
      <nav
        aria-label="Main navigation"
        className="big-tablet:px-0 flex w-full max-w-[1080px] items-center justify-between p-4">
        <div
          className="animate-header-fade-in text-2xl leading-normal font-bold text-teal-500 opacity-0"
          style={{ transform: 'translateX(-50px)' }}>
          &lt;MA/&gt;
        </div>
        <ul className="tablet:flex tablet:gap-6 hidden">
          {sections.map((item) => (
            <li key={item.id} className="">
              <Link
                href={`#${item.id}`}
                className="text-black-30 cursor-pointer text-sm leading-normal font-normal transition-all duration-300 hover:text-teal-500 hover:drop-shadow-[0_0_8px_rgba(20,184,166,0.6)]">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
