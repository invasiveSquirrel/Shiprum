import { useState, useEffect } from 'react';
import { 
  Search, 
  Command, 
  Languages, 
  ExternalLink, 
  Globe, 
  Cpu, 
  Hash, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context';

type SearchSource = 'all' | 'panglossia' | 'wordhord' | 'fonetik' | 'struktur' | 'deepl' | 'web';

export default function GlobalSearch() {
  const { setCurrentView } = useApp();
  const [query, setQuery] = useState('');
  const [source, setSource] = useState<SearchSource>('all');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async (val: string) => {
    if (!val.trim()) {
      setResults([]);
      return;
    }
    setIsSearching(true);
    
    try {
      const apps = [
        { id: 'panglossia', name: 'Panglossia', port: 5173, type: 'Discussions' },
        { id: 'wordhord', name: 'Wordhord', port: 5174, type: 'Dictionary' },
        { id: 'fonetik', name: 'Fonetik', port: 5175, type: 'Phonology' },
        { id: 'struktur', name: 'Struktur', port: 5176, type: 'Syntax' }
      ];

      const allResults: any[] = [];

      for (const app of apps) {
        if (source !== 'all' && source !== app.id) continue;
        
        try {
          // Attempt to fetch from the app's search endpoint if it exists
          // For now, many apps use port 8000+ for backends
          const backendPort = app.port === 5173 ? 8000 : app.port === 5174 ? 8001 : app.port === 5175 ? 8002 : 8003;
          
          // Reverting to a more robust internal search check if apps support it
          // OR use the electronAPI.searchApp if implemented
          const appResults = await globalThis.electronAPI?.searchApp?.(app.id, val);
          if (appResults) {
            allResults.push(...appResults.map((r: any) => ({ ...r, source: app.name, type: app.type })));
          }
        } catch (err) {
          // Silent fail
        }
      }

      if (source === 'deepl' || source === 'all') {
        allResults.push({
          id: 'deepl-link',
          title: `Translate "${val}" via DeepL`,
          desc: 'High-precision neural translation for scholarly research.',
          source: 'DeepL',
          type: 'Translation',
          isExternal: true,
          url: `https://www.deepl.com/translator#any/en/${encodeURIComponent(val)}`
        });
      }

      if (source === 'web' || source === 'all') {
         allResults.push({
          id: 'google-link',
          title: `Search Web for "${val}"`,
          desc: 'Broad spectrum linguistic and etymological inquiry.',
          source: 'Web',
          type: 'Search',
          isExternal: true,
          url: `https://www.google.com/search?q=${encodeURIComponent(val + " etymology")}`
        });
      }

      setResults(allResults);
    } catch (err) {
      console.error('Global search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => performSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, source]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 min-h-[80vh]">
      <header className="mb-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
            <Command className="text-primary" size={32} />
          </div>
        </div>
        <h1 className="text-5xl font-headline italic mb-4">Sōkjan</h1>
        <p className="text-outline-variant font-body uppercase tracking-[0.3em] text-[10px]">Universal Linguistic Intelligence Search</p>
      </header>

      <div className="bg-surface-container-low border border-outline-variant/10 shadow-2xl p-2 rounded-2xl mb-8">
        <div className="flex items-center gap-4 px-6 h-16">
          <Search className="text-outline" size={24} />
          <input 
            type="text" 
            autoFocus
            placeholder="Search keywords, terms, or semantic roots..."
            className="flex-1 bg-transparent border-none outline-none text-2xl font-body placeholder:text-outline/30 placeholder:italic"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {isSearching && (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
            />
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-12 justify-center">
        {[
          { id: 'all', label: 'All Sources', icon: <Hash size={14} /> },
          { id: 'panglossia', label: 'Panglossia', icon: <Cpu size={14} /> },
          { id: 'wordhord', label: 'Wordhord', icon: <BookOpen size={14} /> },
          { id: 'deepl', label: 'DeepL', icon: <Languages size={14} /> },
          { id: 'web', label: 'Web Search', icon: <Globe size={14} /> },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setSource(btn.id as any)}
            className={`px-6 py-2 rounded-full border transition-all flex items-center gap-2 font-label text-[10px] uppercase tracking-widest ${
              source === btn.id 
                ? 'bg-primary text-on-primary border-primary' 
                : 'bg-surface-container-highest/20 border-outline-variant/10 text-outline hover:border-primary/50'
            }`}
          >
            {btn.icon}
            {btn.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {results.map((result, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={result.id || `${result.source}-${idx}`}
              className="bg-surface-container-low p-6 border border-outline-variant/10 group hover:border-primary/30 transition-all cursor-pointer shadow-sm hover:shadow-xl"
              onClick={() => {
                if (result.isExternal) {
                  window.open(result.url, '_blank');
                } else {
                  setCurrentView(result.source.toLowerCase() as any);
                }
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] bg-primary-container text-on-primary-container px-2 py-0.5 font-bold tracking-tighter uppercase">{result.type}</span>
                  <span className="text-[9px] text-outline uppercase tracking-widest font-label">{result.source}</span>
                </div>
                {result.isExternal ? <ExternalLink size={14} className="text-primary" /> : <ArrowRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />}
              </div>
              <h3 className="text-2xl font-headline italic group-hover:text-primary transition-colors">{result.title}</h3>
              <p className="text-on-surface-variant font-body text-sm line-clamp-2 mt-2 opacity-80">{result.desc || result.content}</p>
            </motion.div>
          ))}
        </AnimatePresence>

        {query && !isSearching && results.length === 0 && (
          <div className="text-center py-24 border-2 border-dashed border-outline-variant/10 rounded-3xl">
            <p className="text-outline italic font-body">No internal records match this inquiry.</p>
            <button 
              className="mt-6 text-primary font-label text-[10px] uppercase tracking-widest border-b border-primary/20 hover:border-primary pb-1"
              onClick={() => setSource('web')}
            >
              Try Global Web Inquiry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
