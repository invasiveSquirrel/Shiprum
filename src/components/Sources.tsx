import { motion } from 'motion/react';
import { Plus, Search, FileText, Key, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Sources() {
  const [library, setLibrary] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const data = await globalThis.electronAPI.listLibrary();
        setLibrary(data);
      } catch (err) {
        console.error('Error fetching library:', err);
      }
    };
    fetchLibrary();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-[1400px] mx-auto"
    >
      <div className="mb-12 border-b border-outline-variant/10 pb-8 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-headline font-light text-on-surface mb-2">Sources & Archive</h2>
          <p className="text-outline font-body italic opacity-80 max-w-2xl">
            Register and interrogate your linguistic corpora. Support for PDF, Markdown, and custom path indexing.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 font-label text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
          <Plus size={16} /> Register Path
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Archive Explorer */}
        <section className="lg:col-span-8 space-y-8">
          <div className="bg-surface-container-low p-1 border border-outline-variant/10 flex items-center px-4">
            <Search size={18} className="text-outline/40" />
            <input 
              type="text" 
              placeholder="Search in sources..."
              className="flex-1 bg-transparent border-none py-3 px-4 text-sm font-body focus:outline-none placeholder:text-outline/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(library).map(([lang, files]) => (
              <div key={lang} className="bg-surface-container p-6 border border-outline-variant/5 group hover:border-primary/20 transition-all">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-headline text-lg uppercase tracking-tight text-primary/80">{lang}</h3>
                  <span className="text-[10px] font-label text-outline opacity-40">{files.length} Files</span>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                  {files.filter(f => f.toLowerCase().includes(searchQuery.toLowerCase())).map((file) => (
                    <div key={file} className="flex items-center gap-3 text-xs font-body group/file cursor-pointer py-1.5 border-b border-outline-variant/5">
                      <FileText size={14} className="text-outline/40 group-hover/file:text-primary" />
                      <span className="truncate opacity-70 group-hover/file:opacity-100">{file}</span>
                    </div>
                  ))}
                  {files.length === 0 && <p className="text-[10px] italic text-outline opacity-30">No files indexed for this root.</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Interrogation Layer */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-highest/20 p-8 border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Zap size={120} />
            </div>
            <h4 className="font-label text-[10px] uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
              <Key size={12} /> AI Interrogation (Gemini)
            </h4>
            <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
              Ask deep questions across your entire library. The AI will chunk your sources to find relevant linguistic evidence.
            </p>
            <div className="relative group">
              <textarea 
                placeholder="e.g., Find all references to 'labio-velars' in the Hittite corpus."
                className="w-full h-32 bg-surface-container-low border border-outline-variant/10 p-4 text-xs font-body focus:outline-none focus:border-primary/40 resize-none transition-all"
              />
              <button className="absolute bottom-3 right-3 p-2 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary transition-all">
                <Zap size={14} />
              </button>
            </div>
          </div>

          <div className="p-8 bg-surface-container shadow-sm border border-outline-variant/5">
            <h4 className="font-label text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Connectivity</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-outline uppercase tracking-widest">Library Path:</span>
                <span className="font-body opacity-60">~/Shiprum/Library</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-outline uppercase tracking-widest">Gemini Engine:</span>
                <span className="text-secondary font-bold">READY</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
