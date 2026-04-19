import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeScript } from '@/components/theme/theme-script';
import { AuthProvider } from '@/context/AuthProvider';

const geistSans = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Counselify | AI Legal Infrastructure for East African Businesses',
  description:
    'Continuous compliance, contract intelligence, and regulatory forecasting for modern businesses in East Africa.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://thecounselify.com'),
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'The Counselify | AI Legal Infrastructure for East African Businesses',
    description:
      'Continuous compliance monitoring, intelligent contract analysis, and regulatory forecasting for East African businesses.',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Counselify | AI Legal Infrastructure for East African Businesses',
    description:
      'Continuous compliance monitoring, intelligent contract analysis, and regulatory forecasting for East African businesses.',
    images: ['/logo.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${geistSans.variable} ${geistMono.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <body className="bg-bg-base font-sans text-text-primary antialiased">
        <ThemeScript />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
