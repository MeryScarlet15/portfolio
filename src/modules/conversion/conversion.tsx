import React from 'react'
import { Button } from '@/components/button/button'

export const Conversion: React.FC = () => {
  return (
    <section
      className="section-wrapper tablet:pt-24 tablet:pb-24 items-center gap-6 pt-16 pb-16 text-center"
      id="contact">
      <h2 className="animate-fade-slide-up tablet:text-[48px] text-[40px] leading-tight font-bold text-white opacity-0">
        Let&apos;s work together
      </h2>
      <p
        className="animate-fade-slide-up text-black-30 text-lg leading-relaxed opacity-0"
        style={{ animationDelay: '0.15s' }}>
        Have a project in mind? I&apos;d love to hear about it.
      </p>
      <div
        className="animate-fade-slide-up w-full max-w-[220px] opacity-0"
        style={{ animationDelay: '0.3s' }}>
        <Button
          text="Get in touch"
          ariaLabel="Send an email to María Amado"
          role="link"
          href="mailto:maria_amado15@hotmail.com"
        />
      </div>
    </section>
  )
}
