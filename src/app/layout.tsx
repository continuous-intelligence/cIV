import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { client } from '@/lib/sanity'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Fetch settings from Sanity for metadata
async function getSettings() {
  try {
    const settings = await client.fetch(`
      *[_type == "settings"][0]{
        title,
        description,
        seo,
        contact
      }
    `)
    return settings
  } catch (error) {
    console.error('Error fetching settings:', error)
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  
  if (!settings) {
    return {
      title: 'cIV - Continuous Intelligence Validation',
      description: 'A modern platform for continuous intelligence validation and analytics',
      manifest: '/site.webmanifest',
    }
  }

  return {
    title: settings.seo?.metaTitle || settings.title || 'cIV Platform',
    description: settings.seo?.metaDescription || settings.description || 'Continuous Intelligence Validation Platform',
    keywords: settings.seo?.keywords || ['continuous intelligence', 'validation', 'analytics', 'data'],
    authors: [{ name: 'cIV Team' }],
    openGraph: {
      title: settings.seo?.metaTitle || settings.title || 'cIV Platform',
      description: settings.seo?.metaDescription || settings.description || 'Continuous Intelligence Validation Platform',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.seo?.metaTitle || settings.title || 'cIV Platform',
      description: settings.seo?.metaDescription || settings.description || 'Continuous Intelligence Validation Platform',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    manifest: '/site.webmanifest',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  )
}
