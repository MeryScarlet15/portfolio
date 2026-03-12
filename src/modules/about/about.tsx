import React from 'react'
import Image from 'next/image'
import aboutImage from 'public/images/about.webp'

export const About: React.FC = () => {
  return (
    <section className="section-wrapper tablet:py-20 gap-6 pt-10 pb-10 text-white">
      <h2 className="animate-fade-slide-up text-center text-[32px] leading-normal font-bold text-white opacity-0">
        About Me
      </h2>
      <div className="flex flex-col items-center gap-6 min-[768px]:flex-row min-[768px]:justify-between">
        <div
          className="animate-fade-slide-left tablet:w-[400px] w-full opacity-0"
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
        <div className="about-text">
          <p>
            I'm a passionate Full Stack Developer with over 6 years of
            experience, based in Spain. I have expertise in <span>Next.js</span>
            , <span>Nest.js</span>, <span>Node.js</span>, <span>React</span>,{' '}
            <span>Typescript</span>, and <span>SEO</span>, among other
            technologies.
          </p>
          <p>
            I give great importance to <span>SEO</span>,{' '}
            <span>user experience</span>, <span>performance</span>, and{' '}
            <span>clean code</span>. I believe that a well-optimized,
            user-friendly application with clean and efficient code is the key
            to delivering great products.
          </p>
          <p>
            When I'm not coding, I enjoy exploring new technologies, traveling,
            and working out.
          </p>

          <p>
            I'm open to new opportunities, particularly remote roles in Europe
            or the US.
          </p>
        </div>
      </div>
    </section>
  )
}
