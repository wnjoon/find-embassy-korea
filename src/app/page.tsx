'use client';

import { useState, useEffect } from 'react';
import { Header, SearchBar, EmbassyList, Footer } from '@/components';
import { embassyData } from '@/data/embassyData';
import { filterEmbassies, detectBrowserLanguage } from '@/lib/utils';
import { Language } from '@/lib/types';

export default function Home() {
  const [language, setLanguage] = useState<Language>('ko');
  const [query, setQuery] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const detectedLang = detectBrowserLanguage();
    setLanguage(detectedLang);

    // 저장된 테마 또는 시스템 테마 확인
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === 'ko' ? 'en' : 'ko'));
    setQuery('');
  };

  const handleThemeToggle = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  const filteredEmbassies = filterEmbassies(embassyData, query, language);
  const isSearching = query.trim().length > 0;

  // 마운트 전에는 렌더링하지 않음 (hydration mismatch 방지)
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        language={language}
        onLanguageToggle={handleLanguageToggle}
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
      />
      <SearchBar query={query} onChange={setQuery} language={language} />
      <main className="flex-1">
        <EmbassyList
          embassies={filteredEmbassies}
          language={language}
          isSearching={isSearching}
        />
      </main>
      <Footer language={language} />
    </div>
  );
}
