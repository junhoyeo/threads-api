import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { NavigationBar } from '@/components/NavigationBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Threads API: Making Threads Work in Code',
  description: 'Unofficial, Reverse-Engineered Clients for Threads',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationBar />

        {children}
      </body>
    </html>
  );
}
