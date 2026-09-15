import { type Metadata } from 'next';
import type { ReactNode } from 'react';
import { Navbar } from '@/components/navbar';
import { ScrollProgress } from '@/components/scroll-progress';
import '@/app/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.enigmolabs.co.ke'),
  title: {
    default: 'ENIGMO LABS | The Future is Engineered',
    template: '%s | ENIGMO LABS',
  },
  description:
    'We transform fragmented data into elegant, high-performance systems through Web Engineering, Management Systems, AI Agents, and Automation.',
  keywords: [
    'Enigmo Labs',
    'Web Engineering',
    'AI Agents',
    'Automation',
    'Management Systems',
    'Nairobi',
    'Kenya',
    'RAG',
  ],
  authors: [{ name: 'ENIGMO LABS', url: 'https://www.enigmolabs.co.ke' }],
  creator: 'ENIGMO LABS',
  publisher: 'ENIGMO LABS',
  alternates: {
    canonical: 'https://www.enigmolabs.co.ke',
  },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://www.enigmolabs.co.ke',
    siteName: 'ENIGMO LABS',
    title: 'ENIGMO LABS | The Future is Engineered',
    description:
      'We transform fragmented data into elegant, high-performance systems through Web Engineering, Management Systems, AI Agents, and Automation.',
    images: [
      {
        url: 'https://www.enigmolabs.co.ke/enigmolabs.jpeg',
        width: 1200,
        height: 630,
        alt: 'ENIGMO LABS — The Future is Engineered',
      },
    ],
  },
  icons: {
    icon: [
      { url: '/enigmolabs.jpeg', type: 'image/png' },
      { url: '/enigmolabs.jpeg', rel: 'apple-touch-icon', sizes: '180x180' },
    ],
    shortcut: '/enigmolabs.jpeg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-screen bg-midnight text-gray-100 antialiased">
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
