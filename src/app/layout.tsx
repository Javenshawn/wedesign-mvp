import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wedesign - Professional Design Services',
  description: 'Professional logo and brand design services for startups and businesses',
  keywords: 'logo design, brand identity, graphic design, professional design services',
  openGraph: {
    title: 'Wedesign - Professional Design Services',
    description: 'Transform your brand with expert design services',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Security Headers */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval';" />
        <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-gray-50`}>
        <Navbar />
        <main>{children}</main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-600">
                © {new Date().getFullYear()} Wedesign. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Professional design services for businesses worldwide.
              </p>
              <div className="mt-4">
                <a href="/admin" className="text-blue-600 hover:text-blue-800 text-sm">
                  Admin Dashboard
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}