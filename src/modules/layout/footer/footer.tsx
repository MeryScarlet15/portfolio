import React from 'react'
import { GithubIcon, LinkedinIcon, MailIcon } from '@/components/icons/icons'
import { Link } from '@/components/link/link'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black-80 relative py-6">
      <div className="section-wrapper">
        <div className="flex flex-col items-center justify-between gap-4 min-[768px]:flex-row">
          <p className="text-black-10 tablet:text-left text-center text-sm leading-normal font-normal">
            {new Date().getFullYear()} María Amado. Built with ❤️ in Spain.
          </p>
          <div className="flex gap-4">
            <Link
              href="https://github.com/MeryScarlet15"
              className="text-black-10 transition-[transform,color] duration-300 ease-out hover:scale-110 hover:text-white active:scale-95"
              aria-label="Github">
              <GithubIcon size={20} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/maria-amado-854b6116a"
              className="text-black-10 transition-[transform,color] duration-300 ease-out hover:scale-110 hover:text-white active:scale-95"
              aria-label="LinkedIn">
              <LinkedinIcon size={20} />
            </Link>
            <Link
              href="mailto:maria_amado15@hotmail.com"
              className="text-black-10 transition-[transform,color] duration-300 ease-out hover:scale-110 hover:text-white active:scale-95"
              aria-label="Email">
              <MailIcon size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
