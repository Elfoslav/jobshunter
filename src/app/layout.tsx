import './globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TanstackProvider from '../tanstack/TanstackProvider';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import { UserProvider } from './context/UserContext';
import { NotificationProvider } from './context/NotificationContext';
import { Container } from 'react-bootstrap';

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
        <UserProvider>
          <NotificationProvider>
            <Navbar />
            <TanstackProvider>
              <Container>{children}</Container>
            </TanstackProvider>

            <Notification />
          </NotificationProvider>
        </UserProvider>
      </body>
    </html>
  );
}
