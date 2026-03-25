import React, { useState } from 'react';
import { useApp, View } from '../context';
import { Search, Loader2, Globe, X } from 'lucide-react';
import { translateDeepL } from '../utils/deepl';

export default function TopNav() {
  const { currentView, setCurrentView } = useApp();
  const [translation, setTranslation] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const navLinks: { id: View; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'sources', label: 'Sources' },
    { id: 'discussions', label: 'Discussions' },
    { id: 'search', label: 'Archives' },
  ];

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const query = e.currentTarget.value;
      if (query.startsWith('w/')) {
        window.open(`https://en.wikipedia.org/wiki/${query.slice(2)}`, '_blank');
      } else if (query.startsWith('d/')) {
        window.open(`https://en.wiktionary.org/wiki/${query.slice(2)}`, '_blank');
      } else if (query.startsWith('t/')) {
        setIsTranslating(true);
        const result = await translateDeepL(query.slice(2));
        setTranslation(result);
        setIsTranslating(false);
      }
    }
  };

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-5rem)] z-50 flex justify-between items-center px-8 h-16 bg-surface-container-low/80 backdrop-blur-md border-b border-outline-variant/5">
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-2">
          <span className="text-xl font-headline font-bold text-primary tracking-tight">𒆥 Šiprum</span>
        </div>
        
        <nav className="hidden md:flex gap-8 text-[11px] font-label uppercase tracking-[0.2em] text-outline">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setCurrentView(link.id)}
              className={`transition-colors hover:text-primary ${currentView === link.id ? 'text-primary font-bold border-b border-primary pb-1' : ''}`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 max-w-2xl mx-12 relative">
        <div className="relative group">
          {isTranslating ? (
            <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 text-primary animate-spin" size={16} />
          ) : (
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" size={16} />
          )}
          <input 
            type="text"
            placeholder="Interrogate Archives... (t/ for DeepL, w/ for Wikipedia)"
            className="w-full bg-surface-container-highest/30 border border-outline-variant/10 rounded-full py-2 pl-12 pr-4 text-[13px] font-body focus:outline-none focus:border-primary/40 transition-all placeholder:text-outline/40"
            onKeyDown={handleSearch}
          />
        </div>

        {translation && (
          <div className="absolute top-full left-0 w-full mt-2 bg-surface-container-high border border-primary/20 p-4 shadow-2xl animate-in slide-in-from-top-2 duration-200 z-50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-label text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                <Globe size={12} /> DeepL Translation
              </span>
              <button onClick={() => setTranslation(null)} className="text-outline hover:text-on-surface">
                <X size={14} />
              </button>
            </div>
            <p className="text-sm font-body leading-relaxed text-on-surface">
              {translation}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end opacity-40">
          <span className="text-[10px] font-label text-primary uppercase tracking-[0.2em]">DeepL Engine</span>
          <span className="text-[9px] font-headline uppercase">Connected via Hub</span>
        </div>
      </div>
    </header>
  );
}
