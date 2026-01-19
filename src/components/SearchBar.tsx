'use client';

import { Search, X } from 'lucide-react';
import { Language } from '@/lib/types';

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
  language: Language;
}

export default function SearchBar({ query, onChange, language }: SearchBarProps) {
  const placeholder = language === 'ko'
    ? '대사관, 영사관, 국제기구 검색...'
    : 'Search embassies, consulates...';

  return (
    <div className="sticky top-14 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-xl py-3 px-4">
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-apple-gray-400"
            aria-hidden="true"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-11 pl-10 pr-10 rounded-xl bg-apple-gray-100 dark:bg-apple-gray-800
                       text-apple-gray-600 dark:text-white placeholder-apple-gray-400
                       focus:outline-none focus:ring-2 focus:ring-apple-blue
                       transition-all duration-200"
            aria-label={language === 'ko' ? '검색' : 'Search'}
          />
          {query && (
            <button
              onClick={() => onChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full
                         bg-apple-gray-300 dark:bg-apple-gray-600 hover:bg-apple-gray-400
                         dark:hover:bg-apple-gray-500 transition-colors duration-200"
              aria-label={language === 'ko' ? '검색어 지우기' : 'Clear search'}
            >
              <X className="w-3 h-3 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
