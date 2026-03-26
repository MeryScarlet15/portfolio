import React from 'react'
import { Button } from '@/components/button/button'
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
        <div className="tablet:gap-8 flex max-w-[624px] flex-col gap-5 overflow-hidden">
          <p className="animate-slide-in tablet:text-left text-center text-base font-medium text-teal-500 opacity-0">
            Hi there!
          </p>

          <p
            className="animate-slide-in tablet:text-left tablet:text-[40px] text-center text-[28px] leading-[1.1] font-bold tracking-tight text-white opacity-0"
            style={{ animationDelay: '0.1s' }}>
            I'm María Amado
          </p>

          <h1
            className="animate-slide-in tablet:text-left tablet:text-[48px] text-center text-[28px] leading-[1.1] font-bold tracking-tight text-white uppercase opacity-0"
            style={{ animationDelay: '0.2s' }}>
            I turn startup ideas into production-ready products
          </h1>

          <div
            className="animate-slide-in tablet:flex-row-reverse tablet:justify-end flex flex-col items-center justify-center gap-6 opacity-0"
            style={{ animationDelay: '0.4s' }}>
            <div className="tablet:gap-4 flex gap-6">
              <Link
                href="https://github.com/MeryScarlet15"
                className="text-black-30 flex h-12 w-12 items-center justify-center transition-all duration-300 ease-out hover:scale-110 hover:text-white active:scale-95"
                aria-label="Github">
                <GithubIcon size={24} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/maria-amado-854b6116a"
                className="text-black-30 flex h-12 w-12 items-center justify-center transition-all duration-300 ease-out hover:scale-110 hover:text-white active:scale-95"
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
          <img
            className="block h-auto w-full object-contain"
            src="/images/hero.webp"
            alt="María Amado"
            width={1080}
            height={1186}
            srcSet="/images/hero-250w.webp 250w, /images/hero-300w.webp 300w, /images/hero-450w.webp 450w, /images/hero.webp 1080w"
            sizes="(max-width: 480px) 250px, (max-width: 768px) 300px, 450px"
            fetchPriority="high"
          />
        </div>
      </article>
    </section>
  )
}
