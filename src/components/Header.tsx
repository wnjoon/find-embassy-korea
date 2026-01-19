'use client';

import { Language } from '@/lib/types';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  language: Language;
  onLanguageToggle: () => void;
}

export default function Header({ language, onLanguageToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-apple-gray-200 dark:border-apple-gray-800">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        <h1 className="text-xl font-bold text-apple-gray-600 dark:text-white">
          {language === 'ko' ? '주한 대사관 찾기' : 'Find Embassy Korea'}
        </h1>
        <LanguageToggle language={language} onToggle={onLanguageToggle} />
      </div>
    </header>
  );
}
