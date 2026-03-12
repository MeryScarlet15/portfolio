import './globals.css'
import { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export const metadata: Metadata = {
  title: 'Maria Amado | Full Stack Developer',
  description: 'Full Stack Developer',
  applicationName: 'Maria Amado Portfolio',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Maria Amado Portfolio'
  },
  formatDetection: {
    telephone: false
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#64de9c',
    'msapplication-tap-highlight': 'no'
  },
  openGraph: {
    title: 'Maria Amado | Full Stack Developer',
    description: 'Full Stack Developer',
    url: 'https://mery.dev',
    type: 'website'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#1c1c1c'
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
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicon/apple-touch-icon.png"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
