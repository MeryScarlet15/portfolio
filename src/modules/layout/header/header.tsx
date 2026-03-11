import Link from 'next/link'
import React from 'react'

const sections = ['About', 'Skills', 'Experience']

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-[400] flex items-center justify-center bg-[rgba(24,24,24,0.6)] backdrop-blur-[10px]">
      <nav className="big-tablet:px-0 flex w-full max-w-[1080px] items-center justify-between p-4">
        <div
          className="animate-header-fade-in text-2xl leading-normal font-bold text-teal-500 opacity-0"
          style={{ transform: 'translateX(-50px)' }}>
          &lt;MA/&gt;
        </div>
        <ul className="tablet:flex tablet:gap-6 hidden">
          {sections.map((item) => (
            <li
              key={item}
              className="transition-transform duration-200 ease-out hover:scale-110 active:scale-95">
              <Link
                href={`#${item.toLowerCase()}`}
                className="text-black-30 cursor-pointer text-sm leading-normal font-normal transition-colors duration-300 hover:font-bold hover:text-white">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
