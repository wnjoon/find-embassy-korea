'use client';

import { MessageSquare } from 'lucide-react';
import { Language } from '@/lib/types';

interface FooterProps {
  language: Language;
}

const FEEDBACK_FORM_URL = 'https://forms.gle/YOUR_FORM_ID'; // TODO: Replace with actual form URL

export default function Footer({ language }: FooterProps) {
  return (
    <footer className="mt-auto py-8 px-4 bg-apple-gray-50 dark:bg-neutral-900/50">
      <div className="max-w-md mx-auto flex flex-col items-center gap-4">
        <a
          href={FEEDBACK_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full
                     bg-white dark:bg-neutral-800
                     border border-apple-gray-200 dark:border-neutral-700
                     hover:bg-apple-gray-100 dark:hover:bg-neutral-700
                     text-apple-gray-600 dark:text-neutral-300
                     text-sm font-medium
                     active:scale-95 transition-all duration-200
                     shadow-sm dark:shadow-none"
        >
          <MessageSquare className="w-4 h-4" aria-hidden="true" />
          <span>
            {language === 'ko' ? '정보 수정 요청' : 'Report Incorrect Info'}
          </span>
        </a>
        <p className="text-xs text-apple-gray-400 dark:text-neutral-500">
          © 2025 Find Embassy Korea
        </p>
      </div>
    </footer>
  );
}
