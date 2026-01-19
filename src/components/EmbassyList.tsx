'use client';

import { Embassy, Language } from '@/lib/types';
import EmbassyCard from './EmbassyCard';

interface EmbassyListProps {
  embassies: Embassy[];
  language: Language;
  isSearching: boolean;
}

export default function EmbassyList({ embassies, language, isSearching }: EmbassyListProps) {
  if (!isSearching) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <p className="text-apple-gray-400 dark:text-apple-gray-500">
          {language === 'ko'
            ? '대사관, 영사관, 국제기구를\n검색해 보세요'
            : 'Search for embassies,\nconsulates, or international organizations'}
        </p>
      </div>
    );
  }

  if (embassies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <p className="text-apple-gray-400 dark:text-apple-gray-500">
          {language === 'ko'
            ? '검색 결과가 없습니다'
            : 'No results found'}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-3">
      {embassies.map((embassy, index) => (
        <EmbassyCard
          key={`${embassy.nameEN}-${index}`}
          embassy={embassy}
          language={language}
        />
      ))}
    </div>
  );
}
