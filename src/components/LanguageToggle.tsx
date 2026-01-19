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
      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-apple-gray-100 dark:bg-apple-gray-800 hover:bg-apple-gray-200 dark:hover:bg-apple-gray-700 transition-colors duration-200"
      aria-label={language === 'ko' ? 'Switch to English' : '한국어로 전환'}
    >
      <span
        className={`text-sm font-medium transition-colors duration-200 ${
          language === 'ko'
            ? 'text-apple-blue'
            : 'text-apple-gray-400'
        }`}
      >
        한국어
      </span>
      <span className="text-apple-gray-300 dark:text-apple-gray-600">/</span>
      <span
        className={`text-sm font-medium transition-colors duration-200 ${
          language === 'en'
            ? 'text-apple-blue'
            : 'text-apple-gray-400'
        }`}
      >
        EN
      </span>
    </button>
  );
}
