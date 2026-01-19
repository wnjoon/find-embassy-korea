'use client';

import { useState, useEffect } from 'react';
import { Header, SearchBar, EmbassyList, Footer } from '@/components';
import { embassyData } from '@/data/embassyData';
import { filterEmbassies, detectBrowserLanguage } from '@/lib/utils';
import { Language } from '@/lib/types';

export default function Home() {
  const [language, setLanguage] = useState<Language>('ko');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const detectedLang = detectBrowserLanguage();
    setLanguage(detectedLang);
  }, []);

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === 'ko' ? 'en' : 'ko'));
    setQuery(''); // 언어 변경 시 검색어 초기화
  };

  const filteredEmbassies = filterEmbassies(embassyData, query, language);
  const isSearching = query.trim().length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header language={language} onLanguageToggle={handleLanguageToggle} />
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
