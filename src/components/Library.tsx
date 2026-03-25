import React, { useEffect, useState } from 'react';
import { Book, FolderOpen, ExternalLink } from 'lucide-react';

export default function Library() {
  const [library, setLibrary] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    globalThis.electronAPI.listLibrary().then(data => {
      setLibrary(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-primary/10 rounded-xl text-primary">
          <Book size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-headline text-on-surface">Resource Library</h1>
          <p className="text-on-surface-variant opacity-70">Unified access to all linguistic sources in Struktur.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(Object.entries(library) as [string, string[]][]).map(([lang, files]) => (
          <div key={lang} className="bg-surface-container rounded-2xl border border-outline-variant/10 overflow-hidden">
            <div className="px-6 py-4 bg-surface-container-high flex items-center gap-3 border-b border-outline-variant/5">
              <FolderOpen size={18} className="text-primary" />
              <h2 className="font-headline text-lg">{lang}</h2>
              <span className="ml-auto text-xs font-label opacity-40 uppercase tracking-tighter">{files.length} items</span>
            </div>
            <div className="p-4 max-h-[300px] overflow-y-auto custom-scrollbar">
              {files.length === 0 ? (
                <p className="text-sm text-center py-4 opacity-40 italic">No resources found.</p>
              ) : (
                <ul className="space-y-2">
                  {files.map(file => (
                    <li key={file}>
                      <button
                        onClick={() => globalThis.electronAPI.openExternal(`/home/chris/struktur/library/${lang}/${file}`)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container-highest transition-colors flex items-center gap-2 group"
                      >
                        <span className="truncate text-sm flex-grow opacity-80 group-hover:opacity-100">{file}</span>
                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-40 transition-opacity" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
