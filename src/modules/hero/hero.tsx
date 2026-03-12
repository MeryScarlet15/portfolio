import React from 'react'
import { Button } from '@/components/button/button'
import Image from 'next/image'
import heroImage from 'public/images/hero.png'
import { Link } from '@/components/link/link'
import { GithubIcon, LinkedinIcon } from '@/components/icons/icons'

export const Hero: React.FC = () => {
  return (
    <section className="tablet:py-[140px] relative overflow-hidden py-[88px]">
      <div
        className="animate-fade-in-half absolute inset-0 -z-1 opacity-0"
        style={{
          background: 'url("/images/grid-pattern.svg")'
        }}></div>
      <div
        className="animate-fade-in-half absolute inset-0 -z-1 opacity-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, #1c1c1c 100%)'
        }}></div>
      <article className="section-wrapper tablet:flex-row tablet:justify-between tablet:gap-10 items-center gap-8 overflow-hidden">
        <div className="tablet:gap-10 flex max-w-[624px] flex-col gap-6 overflow-hidden">
          <h1 className="animate-slide-in tablet:text-left tablet:text-[64px] flex flex-col gap-2 text-center text-[32px] leading-normal font-bold text-white">
            Hi there! <br />
            I'm María Amado
            <br />
            <span className="tablet:text-left tablet:text-[32px] text-center text-2xl leading-normal font-medium text-teal-500">
              A Javascript Fullstack Developer
            </span>
          </h1>

          <div
            className="animate-slide-in tablet:flex-row-reverse tablet:justify-end flex flex-col items-center justify-center gap-6"
            style={{ animationDelay: '0.2s' }}>
            <div className="tablet:gap-4 flex gap-6">
              <Link
                href="https://github.com/MeryScarlet15"
                className="text-black-30 tablet:h-6 tablet:w-6 h-8 w-8 transition-all duration-300 ease-out hover:scale-110 hover:text-white active:scale-95"
                aria-label="Github">
                <GithubIcon size={24} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/maria-amado-854b6116a"
                className="text-black-30 tablet:h-6 tablet:w-6 h-8 w-8 transition-all duration-300 ease-out hover:scale-110 hover:text-white active:scale-95"
                aria-label="LinkedIn">
                <LinkedinIcon size={24} />
              </Link>
            </div>
            <div className="!m-0 !w-fit !animate-none">
              <Button
                text="Get in touch"
                role="link"
                href="mailto:maria_amado15@hotmail.com"
                ariaLabel="Get in touch"
                className="!m-0 !w-fit !animate-none"
              />
            </div>
          </div>
        </div>
        <div className="animate-rock-image tablet:w-[450px] relative h-auto w-[280px] -rotate-2 grayscale-[30%]">
          <Image
            className="block h-auto w-full object-contain"
            src={heroImage}
            quality={80}
            alt="María Amado - Full Stack Developer"
            priority
            width={450}
            sizes="(max-width: 480px) 250px,
           (max-width: 768px) 300px,
           450px"
          />
        </div>
      </article>
    </section>
  )
}
