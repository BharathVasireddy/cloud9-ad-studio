import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../contexts/AuthContext'
import { ClientProvider } from '../contexts/ClientContext'

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans'
})

export const metadata: Metadata = {
  title: 'Ad Studio - Cloud 9 Digital',
  description: 'Internal tool for generating Google and Facebook ad copy with AI-powered content generation and compliance checking.',
  keywords: ['ad copy', 'google ads', 'facebook ads', 'ai content', 'cloud 9 digital'],
  authors: [{ name: 'Cloud 9 Digital' }],
  robots: 'noindex, nofollow', // Internal tool
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${plusJakartaSans.className} page-container antialiased`}>
        <AuthProvider>
          <ClientProvider>
            {children}
          </ClientProvider>
        </AuthProvider>
      </body>
    </html>
  )
} 