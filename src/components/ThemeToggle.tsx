'use client';

import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full
                 bg-apple-gray-100 dark:bg-neutral-800
                 hover:bg-apple-gray-200 dark:hover:bg-neutral-700
                 active:scale-95 transition-all duration-200"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 text-apple-gray-500" />
      )}
    </button>
  );
}
