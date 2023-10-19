import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TanstackProvider from '../tanstack/TanstackProvider'
import Navbar from './components/Navbar'
import Notification from './components/Notification'
import { UserProvider } from './context/UserContext'
import { NotificationProvider } from './context/NotificationContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Job hunter',
  description: 'Revolutionary job search platform',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <NotificationProvider>
            <Navbar />
            <TanstackProvider>
              <div className="container mb-4">
                {children}
              </div>
            </TanstackProvider>

            <Notification />
          </NotificationProvider>
        </UserProvider>
      </body>
    </html>
  )
}
