import type { Metadata } from 'next';
import './globals.css';

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
      'Continuous compliance, contract intelligence, and regulatory forecasting for modern businesses in East Africa.',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Counselify | AI Legal Infrastructure for East African Businesses',
    description:
      'Continuous compliance, contract intelligence, and regulatory forecasting for modern businesses in East Africa.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-bg-base font-sans text-text-primary antialiased">{children}</body>
    </html>
  );
}
