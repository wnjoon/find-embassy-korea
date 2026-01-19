'use client';

import { Language } from '@/lib/types';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  language: Language;
  onLanguageToggle: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

export default function Header({ language, onLanguageToggle, isDark, onThemeToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/90 backdrop-blur-xl border-b border-apple-gray-200 dark:border-transparent">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        <h1 className="text-xl font-bold text-apple-gray-600 dark:text-neutral-100">
          {language === 'ko' ? '주한 대사관 찾기' : 'Find Embassy Korea'}
        </h1>
        <div className="flex items-center gap-2">
          <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
          <LanguageToggle language={language} onToggle={onLanguageToggle} />
        </div>
      </div>
    </header>
  );
}
