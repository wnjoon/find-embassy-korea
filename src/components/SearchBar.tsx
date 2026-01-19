'use client';

import { Search, X } from 'lucide-react';
import { Language } from '@/lib/types';
import { useRef, useEffect } from 'react';

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
  language: Language;
}

export default function SearchBar({ query, onChange, language }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const placeholder = language === 'ko'
    ? '대사관, 영사관, 국제기구 검색...'
    : 'Search embassies, consulates...';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        onChange('');
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onChange]);

  return (
    <div className="sticky top-14 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-xl py-3 px-4 border-b border-apple-gray-100 dark:border-apple-gray-900">
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-apple-gray-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-12 pl-11 pr-11 rounded-xl bg-apple-gray-100 dark:bg-apple-gray-800
                       text-apple-gray-600 dark:text-white placeholder-apple-gray-400
                       focus:outline-none focus:ring-2 focus:ring-apple-blue focus:bg-white dark:focus:bg-apple-gray-900
                       transition-all duration-200 text-base"
            aria-label={language === 'ko' ? '검색' : 'Search'}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          {query && (
            <button
              onClick={() => {
                onChange('');
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full
                         bg-apple-gray-300 dark:bg-apple-gray-600
                         hover:bg-apple-gray-400 dark:hover:bg-apple-gray-500
                         active:scale-90 transition-all duration-200"
              aria-label={language === 'ko' ? '검색어 지우기' : 'Clear search'}
            >
              <X className="w-3.5 h-3.5 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
