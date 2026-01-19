'use client';

import { MessageSquare } from 'lucide-react';
import { Language } from '@/lib/types';

interface FooterProps {
  language: Language;
}

const FEEDBACK_FORM_URL = 'https://forms.gle/YOUR_FORM_ID'; // TODO: Replace with actual form URL

export default function Footer({ language }: FooterProps) {
  return (
    <footer className="mt-auto py-8 px-4 border-t border-apple-gray-200 dark:border-apple-gray-800 bg-apple-gray-50 dark:bg-apple-gray-950">
      <div className="max-w-md mx-auto flex flex-col items-center gap-4">
        <a
          href={FEEDBACK_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full
                     bg-white dark:bg-apple-gray-800
                     border border-apple-gray-200 dark:border-apple-gray-700
                     hover:bg-apple-gray-100 dark:hover:bg-apple-gray-700
                     hover:border-apple-gray-300 dark:hover:border-apple-gray-600
                     text-apple-gray-600 dark:text-apple-gray-300
                     text-sm font-medium
                     active:scale-95 transition-all duration-200
                     shadow-sm"
        >
          <MessageSquare className="w-4 h-4" aria-hidden="true" />
          <span>
            {language === 'ko' ? '정보 수정 요청' : 'Report Incorrect Info'}
          </span>
        </a>
        <p className="text-xs text-apple-gray-400 dark:text-apple-gray-500">
          © 2025 Find Embassy Korea
        </p>
      </div>
    </footer>
  );
}
