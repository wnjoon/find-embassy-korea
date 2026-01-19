import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://findembassykorea.site';

export const metadata: Metadata = {
  title: 'Find Embassy Korea | 주한 대사관 찾기',
  description: '대한민국 소재 대사관, 영사관, 국제기구 연락처를 빠르게 검색하세요. Search embassies, consulates, and international organizations in Korea.',
  keywords: 'embassy, korea, 대사관, 영사관, 외교공관, diplomatic mission, consulate, international organization',
  authors: [{ name: 'wnjoon' }],
  creator: 'wnjoon',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: 'en_US',
    url: SITE_URL,
    siteName: 'Find Embassy Korea',
    title: 'Find Embassy Korea | 주한 대사관 찾기',
    description: '대한민국 소재 대사관, 영사관, 국제기구 연락처를 빠르게 검색하세요',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Embassy Korea | 주한 대사관 찾기',
    description: '대한민국 소재 대사관, 영사관, 국제기구 연락처를 빠르게 검색하세요',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Find Embassy Korea',
              alternateName: '주한 대사관 찾기',
              description: '대한민국 소재 대사관, 영사관, 국제기구 연락처를 빠르게 검색하세요',
              url: SITE_URL,
              applicationCategory: 'ReferenceApplication',
              operatingSystem: 'All',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'KRW',
              },
              author: {
                '@type': 'Person',
                name: 'wnjoon',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans min-h-screen bg-white dark:bg-neutral-950 text-apple-gray-600 dark:text-neutral-100 transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
