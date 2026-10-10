import React from 'react';
import { Globe } from 'lucide-react';

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' }
];

export default function LanguageSelector({ currentLang = 'en', onChangeLang }) {
  return (
    <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl text-xs">
      <Globe className="w-4 h-4 text-violet-400 ml-1" />
      <span className="text-slate-400 font-medium hidden sm:inline">Language:</span>
      <div className="flex items-center space-x-1">
        {LANGUAGES.map(lang => (
          <button
            key={lang.code}
            onClick={() => onChangeLang(lang.code)}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              currentLang === lang.code
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-glow-violet'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            {lang.native}
          </button>
        ))}
      </div>
    </div>
  );
}
