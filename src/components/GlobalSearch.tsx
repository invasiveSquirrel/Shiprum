import { motion } from 'motion/react';
import { Search, History, Sparkles, BookOpen, Mic } from 'lucide-react';

export default function GlobalSearch() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1000px] mx-auto py-12"
    >
      <div className="w-full mb-12 flex justify-between items-end border-b border-outline-variant/5 pb-8">
        <div className="space-y-1">
          <h1 className="font-headline text-5xl font-semibold tracking-tight text-on-surface">Global Search</h1>
          <p className="text-on-surface-variant font-label text-[10px] tracking-[0.3em] uppercase">Cross-Database Linguistic Query • Šiprum Environment</p>
        </div>
        <button className="text-[10px] font-bold text-primary hover:text-on-surface transition-colors border-b border-primary/20 pb-1 uppercase tracking-widest">
          Advanced Syntax Guide
        </button>
      </div>

      <div className="space-y-12">
        <section className="relative group">
          <div className="bg-surface-container-low p-2 border border-outline-variant/10 shadow-2xl focus-within:border-primary/30 transition-all duration-500">
            <div className="flex items-center px-4 py-2">
              <Search className="text-on-surface-variant mr-4" size={32} />
              <input 
                type="text" 
                className="w-full bg-transparent border-none focus:ring-0 text-2xl font-body placeholder:text-on-surface-variant/40 text-on-surface py-4"
                placeholder="Search lexemes, phonemes, or research papers..."
              />
              <kbd className="hidden md:inline-flex items-center gap-1 px-3 py-1 text-[10px] font-bold text-on-surface-variant bg-surface-container-highest border border-outline-variant/20">
                ⌘K
              </kbd>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 px-4 pb-4 mt-2">
              {[
                { label: 'Language: Indo-European' },
                { label: 'Source: Academic Journals' },
                { label: 'Phonetic: IPA Transcription' }
              ].map((filter, i) => (
                <div key={i} className="flex items-center gap-2 bg-surface-container-high px-3 py-1.5 text-[10px] font-bold text-on-surface-variant border border-outline-variant/20 cursor-pointer hover:bg-surface-container-highest transition-colors uppercase tracking-widest">
                  {filter.label}
                </div>
              ))}
              <button className="ml-auto text-[10px] font-bold text-primary px-4 py-1.5 hover:bg-primary/10 transition-colors uppercase tracking-widest">
                Clear All
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center justify-between border-b border-outline-variant/10 pb-2">
              <h3 className="text-[10px] font-bold text-on-surface-variant tracking-[0.2em] uppercase">Recent Queries</h3>
              <History className="text-on-surface-variant/50 cursor-pointer" size={14} />
            </div>
            <ul className="space-y-1">
              {[
                { title: 'Proto-Germanic Vowel Shifts', meta: '2 hours ago • Phonology' },
                { title: 'Syntax of Austronesian', meta: 'Yesterday • Morphosyntax' },
                { title: 'Grimm\'s Law', meta: 'Oct 24 • Historical' }
              ].map((q, i) => (
                <li key={i} className="group flex items-center justify-between p-3 hover:bg-surface-container-low transition-all cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors font-headline italic">{q.title}</span>
                    <span className="text-[9px] text-on-surface-variant uppercase tracking-widest mt-1">{q.meta}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div className="flex items-center justify-between border-b border-outline-variant/10 pb-2">
              <h3 className="text-[10px] font-bold text-on-surface-variant tracking-[0.2em] uppercase">Scholarly Recommendations</h3>
              <span className="text-[9px] text-primary font-bold px-2 py-0.5 bg-primary/10 uppercase tracking-widest">AI Curated</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { 
                  icon: <BookOpen size={20} />, 
                  title: 'Lexical Analysis of Middle High German', 
                  desc: 'Recent thesis upload exploring the semantical shift in courtly literature.',
                  tag: 'Archive Access'
                },
                { 
                  icon: <Mic size={20} />, 
                  title: 'Phonetic Database: Uralic Dialects', 
                  desc: 'High-fidelity recordings and spectrograms from recent field research.',
                  tag: 'Active Project'
                }
              ].map((rec, i) => (
                <div key={i} className="group relative bg-surface-container-low p-5 border border-outline-variant/5 hover:border-primary/20 transition-all cursor-pointer h-48 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 bg-surface-container-highest flex items-center justify-center mb-4 text-primary">
                      {rec.icon}
                    </div>
                    <h4 className="font-headline text-lg font-medium leading-tight text-on-surface italic">{rec.title}</h4>
                    <p className="text-[11px] text-on-surface-variant mt-2 line-clamp-2 font-body">{rec.desc}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-primary uppercase tracking-widest">{rec.tag}</span>
                    <div className="h-[1px] flex-grow bg-outline-variant/10"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <h4 className="text-[9px] font-bold text-on-surface-variant tracking-[0.3em] uppercase mb-4">Popular Fields</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Etymology', 'Cognitive Linguistics', 'Sociolinguistics', 'Dead Languages', 'Natural Language Processing'
                ].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-surface-container-high text-[10px] text-on-surface-variant hover:text-on-surface hover:bg-primary/20 cursor-pointer transition-colors border border-outline-variant/10 uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-20 border-t border-outline-variant/10 pt-8 flex flex-col md:flex-row justify-between items-center opacity-40 hover:opacity-100 transition-opacity duration-500">
          <p className="text-[9px] font-medium tracking-[0.2em] text-on-surface-variant uppercase">Connected to: Oxford Linguistic Corpus, MIT Cog-Science Data, & Šiprum Local Archives</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="text-[9px] font-medium text-on-surface-variant uppercase tracking-[0.2em]">Latency: 24ms</span>
            <span className="text-[9px] font-medium text-on-surface-variant uppercase tracking-[0.2em]">Status: Synchronized</span>
          </div>
        </footer>
      </div>
    </motion.div>
  );
}
