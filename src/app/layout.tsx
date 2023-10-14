import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TanstackProvider from '../tanstack/TanstackProvider'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Job hunter',
  description: 'Revolutionary job search platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <TanstackProvider>
          <div className="container mb-4">
            {children}
          </div>
        </TanstackProvider>
      </body>
    </html>
  )
}
