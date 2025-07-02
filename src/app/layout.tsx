import './globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import TanstackProvider from '../tanstack/TanstackProvider';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import { UserProvider } from './context/UserContext';
import { NotificationProvider } from './context/NotificationContext';
import { Container } from 'react-bootstrap';
import { ClientMigrations } from './CilentMigrations';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jobs Hunter - The job board you always wanted',
  description: 'The job board you always wanted',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <UserProvider>
            <NotificationProvider>
              <Navbar />
              <ClientMigrations />
              <Container>
                {children}
                <Analytics />
              </Container>
              <Notification />
            </NotificationProvider>
          </UserProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
