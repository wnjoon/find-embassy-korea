'use client';

import { Language } from '@/lib/types';

interface LanguageToggleProps {
  language: Language;
  onToggle: () => void;
}

export default function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1 px-3 py-1.5 rounded-full
                 bg-apple-gray-100 dark:bg-neutral-800
                 hover:bg-apple-gray-200 dark:hover:bg-neutral-700
                 transition-colors duration-200"
      aria-label={language === 'ko' ? 'Switch to English' : '한국어로 전환'}
    >
      <span
        className={`text-sm font-medium transition-colors duration-200 ${
          language === 'ko'
            ? 'text-apple-blue dark:text-blue-400'
            : 'text-apple-gray-400 dark:text-neutral-500'
        }`}
      >
        한국어
      </span>
      <span className="text-apple-gray-300 dark:text-neutral-600">/</span>
      <span
        className={`text-sm font-medium transition-colors duration-200 ${
          language === 'en'
            ? 'text-apple-blue dark:text-blue-400'
            : 'text-apple-gray-400 dark:text-neutral-500'
        }`}
      >
        EN
      </span>
    </button>
  );
}
