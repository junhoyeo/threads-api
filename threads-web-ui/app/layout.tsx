import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { NavigationBar } from '@/components/NavigationBar';
import { Footer } from '@/components/Footer';
import { AnalyticsTrackerInit } from '@/components/AnalyticsTracker';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Threads API: Making Threads Work in Code',
  description: 'Unofficial, Reverse-Engineered Clients for Threads.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <AnalyticsTrackerInit />
        <NavigationBar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
