/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'
import './design-system/reset.scss'
import './design-system/colors.scss'
import { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Header } from '../modules/layout/header/header'

export const metadata: Metadata = {
  title: 'Maria Amado | Full Stack Developer',
  openGraph: {
    title: 'Maria Amado | Full Stack Developer',
    description: 'Full Stack Developer portfolio',
    // TODO: Add url
    url: '',
    type: 'website'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.className} ${GeistMono.className}`}>
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/meta/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/meta/favicon-16x16.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/meta/favicon-48x48.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/meta/favicon-96x96.png"
        />

        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/meta/favicon-60x60.png"
        />
      </head>
      <Head>
        <meta name="robots" content="noindex" />
        <meta
          name="environment"
          content={process.env.ENVIRONMENT ? 'production' : 'development'}
        />
        <meta name="application-name" content="Maria Amado Portfolio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="Maria Amado Portfolio"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#64de9c" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#fff" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no,maximum-scale=5, viewport-fit=cover"
        />
      </Head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
