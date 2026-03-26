import React from 'react'
import Image from 'next/image'
import aboutImage from 'public/images/about.webp'

export const About: React.FC = () => {
  return (
    <section className="section-wrapper tablet:pt-24 tablet:pb-24 gap-6 pt-16 pb-16 text-white">
      <h2 className="animate-fade-slide-up text-center text-[32px] leading-normal font-bold text-white opacity-0">
        About Me
      </h2>
      <div className="tablet:flex-row tablet:items-center tablet:gap-10 flex flex-col items-center gap-6">
        <div
          className="animate-fade-slide-left tablet:flex-1 w-full opacity-0"
          style={{ animationDelay: '0.3s' }}>
          <Image
            src={aboutImage}
            alt="María Amado - About Me"
            width={400}
            height={400}
            className="w-full bg-white transition-all duration-300 ease-out hover:-rotate-2"
            loading="lazy"
            placeholder="blur"
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 400px, 400px"
            style={{
              objectFit: 'cover',
              borderRadius: '8px',
              filter: 'grayscale(30%)',
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        </div>
        <div className="about-text tablet:border-l tablet:border-teal-500/30 tablet:pl-10">
          <p className="text-black-30 text-lg leading-relaxed">
            With over 10 years of experience building for <span>startups</span>,
            I focus on what matters most:{' '}
            <span>building products that work</span>. I've owned the full stack
            end to end, taking ideas from zero to launch and turning them into
            products people actually use.
          </p>
          <p className="text-black-30 text-lg leading-relaxed">
            Great products are built on great foundations.{' '}
            <span>Clean code</span>, <span>user experience</span>,{' '}
            <span>SEO</span>, and <span>performance</span> aren't separate
            concerns — they all work together to create something that lasts.
            Every technical decision I make is in service of the{' '}
            <span>product</span>.
          </p>
          <p className="text-black-40 text-base leading-relaxed">
            When I'm not coding, you'll find me learning new technologies,
            traveling, exploring new roller coasters, or at the calisthenics
            park.
          </p>
          <p className="text-black-40 text-base leading-relaxed">
            I'm open to new opportunities, particularly remote roles in Europe
            or the US.
          </p>
        </div>
      </div>
    </section>
  )
}
