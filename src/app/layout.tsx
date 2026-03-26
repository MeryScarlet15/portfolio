import './globals.css'
import { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

const description =
  'Full stack developer who takes startup ideas from zero to launch. I build production-ready products with clean code, great UX, and performance baked in.'

export const metadata: Metadata = {
  metadataBase: new URL('https://mery.dev'),
  title: 'Maria Amado | Turning Startup Ideas Into Products',
  description,
  applicationName: 'Maria Amado Portfolio',
  authors: [{ name: 'María Amado', url: 'https://mery.dev' }],
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
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
    title: 'Maria Amado | Turning Startup Ideas Into Products',
    description,
    url: 'https://mery.dev',
    siteName: 'Maria Amado Portfolio',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'Maria Amado | Turning Startup Ideas Into Products',
    description
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': 'María Amado',
  'jobTitle': 'Full Stack Developer',
  'url': 'https://mery.dev',
  'sameAs': [
    'https://github.com/MeryScarlet15',
    'https://www.linkedin.com/in/maria-amado-854b6116a'
  ],
  'knowsAbout': [
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'Nest.js',
    'SEO',
    'Performance Optimization'
  ]
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.className} ${GeistMono.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          imageSrcSet="/images/hero-250w.webp 250w, /images/hero-300w.webp 300w, /images/hero-450w.webp 450w, /images/hero.webp 1080w"
          imageSizes="(max-width: 480px) 250px, (max-width: 768px) 300px, 450px"
          fetchPriority="high"
        />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
