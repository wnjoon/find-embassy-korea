import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Find Embassy Korea | 주한 대사관 찾기',
  description: '대한민국 소재 대사관, 영사관, 국제기구 연락처를 빠르게 검색하세요',
  keywords: 'embassy, korea, 대사관, 영사관, 외교공관, diplomatic mission',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="font-sans min-h-screen bg-white dark:bg-neutral-950 text-apple-gray-600 dark:text-neutral-100 transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
