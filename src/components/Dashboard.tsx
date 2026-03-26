import { motion } from 'motion/react';
import { 
  Languages, 
  BookText, 
  Mic, 
  GitBranch, 
  MessageSquare,
  Search,
  PlayCircle,
  Hash,
  ArrowRight
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApp } from '../context';

export default function Dashboard() {
  const { setCurrentView } = useApp();
  const [discussions, setDiscussions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const disc = await globalThis.electronAPI.getRecentDiscussions();
        setDiscussions(disc);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1400px] mx-auto min-h-screen pb-20"
    >
      {/* Hero Section */}
      <section className="mb-20">
        <h1 className="text-7xl font-headline font-light text-on-surface mb-4 tracking-tight italic">
          Šiprum Dashboard
        </h1>
        <div className="w-32 h-1 bg-primary/30 mb-8 rounded-full"></div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Functional Command Center */}
        <section className="lg:col-span-8 flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                id: 'search', 
                icon: <Search className="text-primary" size={24} />, 
                title: 'Cross-App Search', 
                desc: 'Universal query across all linguistic archives.',
                action: 'Open Sōkjan'
              },
              { 
                id: 'panglossia', 
                icon: <MessageSquare className="text-secondary" size={24} />, 
                title: 'Conversation Engine', 
                desc: 'Initialize a strict lexicographical dialogue.',
                action: 'Start Panglossia'
              },
              { 
                id: 'wordhord', 
                icon: <BookText className="text-tertiary" size={24} />, 
                title: 'Lexical Expansion', 
                desc: 'Manage your personal wordhord and frequencies.',
                action: 'Open Wordhord'
              },
              { 
                id: 'sources', 
                icon: <PlayCircle className="text-primary" size={24} />, 
                title: 'Integrated Archive', 
                desc: 'Audiovisual research and slow-play analysis.',
                action: 'Open Sources'
              },
              { 
                id: 'fonetik', 
                icon: <Mic className="text-secondary" size={24} />, 
                title: 'Phonetic Audit', 
                desc: 'IPA transcription and acoustic synthesis.',
                action: 'Open Fonetik'
              },
              { 
                id: 'struktur', 
                icon: <GitBranch className="text-tertiary" size={24} />, 
                title: 'Syntactic Parsing', 
                desc: 'Visualize grammatical trees and phrasal nesting.',
                action: 'Open Struktur'
              },
            ].map((module) => (
              <button 
                key={module.id} 
                onClick={() => setCurrentView(module.id as any)}
                className="bg-surface-container-low p-8 border border-outline-variant/10 text-left group hover:bg-surface-container transition-all hover:border-primary/30 relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  {module.icon}
                </div>
                <div className="flex items-center gap-4 mb-4">
                  {module.icon}
                  <h3 className="font-headline text-2xl italic">{module.title}</h3>
                </div>
                <p className="text-xs text-outline font-body leading-relaxed mb-8 opacity-70 group-hover:opacity-100 transition-opacity">
                  {module.desc}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-label uppercase tracking-widest text-primary opacity-40 group-hover:opacity-100 transition-all">
                  <span>{module.action}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Scholarly Context */}
        <aside className="lg:col-span-4 space-y-12">
          <div className="bg-surface-container-low p-10 border border-outline-variant/10 shadow-xl relative">
            <h2 className="font-label text-[10px] uppercase tracking-[0.3em] text-primary mb-10 border-b border-outline-variant/10 pb-4">
              Scholarly Logbook
            </h2>
            <div className="space-y-8">
              {discussions.length > 0 ? (
                discussions.slice(0, 4).map((item) => (
                  <div key={item.fullPath} className="group cursor-pointer">
                    <p className="font-headline text-lg leading-tight group-hover:text-primary transition-colors italic mb-2 truncate">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2">
                       <Hash size={10} className="text-outline/40" />
                       <span className="font-label text-[9px] text-outline uppercase tracking-widest">{item.date}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-outline italic opacity-50">No recent inquiries found.</p>
              )}
            </div>
          </div>

          <div className="p-10 border border-primary/10 bg-primary/5 rounded-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Languages size={120} />
             </div>
             <p className="text-[10px] font-label uppercase tracking-[0.2em] text-primary mb-4">System Status</p>
             <p className="text-xs font-body italic text-on-surface/60 leading-relaxed mb-6">
               "Linguistic archives and cross-app nodes are currently synchronized. Gemini 2.0-Flash remains responsive for all generative tasks."
             </p>
             <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(var(--secondary-rgb),0.5)]"></div>
                <span className="text-[9px] font-label uppercase tracking-widest text-outline">Network Grid Active</span>
             </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
