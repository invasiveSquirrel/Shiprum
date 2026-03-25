import { motion } from 'motion/react';
import { 
  Languages, 
  BookText, 
  Mic, 
  GitBranch, 
  Folder, 
  ChevronRight,
  ExternalLink
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
      className="max-w-[1400px] mx-auto"
    >
      {/* Hero Section / Global Status */}
      <section className="mb-16 grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 lg:col-span-8">
          <h1 className="text-6xl font-headline font-light text-on-surface mb-6 tracking-tight italic">Academic Trajectory</h1>
          <p className="text-on-surface-variant max-w-2xl font-body text-xl leading-relaxed opacity-80">
            The current inquiry focuses on <span className="text-primary italic">Comparative Phonology</span> and 
            etymological registries. Your mastery across all archived modules is trending 14% higher than the previous quarter.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-4 flex justify-end">
          <div className="bg-surface-container-low p-8 border-b-2 border-primary/20 w-full max-w-xs shadow-2xl">
            <p className="text-[10px] uppercase tracking-[0.2em] text-outline mb-2">Total Research Time</p>
            <p className="text-4xl font-headline italic text-primary">142h <span className="text-lg text-outline">/ 200h</span></p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Modules Bento Grid */}
        <section className="lg:col-span-12 mb-8">
          <div className="flex justify-between items-center mb-8 border-b border-outline-variant/10 pb-4">
            <h2 className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">Registry Nodes • Core Connectivity</h2>
            <span className="text-[9px] text-outline uppercase tracking-widest">4 Active Systems</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'panglossia', icon: <Languages size={32} />, title: 'Panglossia', level: 'Level 4', desc: 'Translation Mastery' },
              { id: 'wordhord', icon: <BookText size={32} />, title: 'Wordhord', level: 'Level 7', desc: 'Lexical Inventory' },
              { id: 'fonetik', icon: <Mic size={32} />, title: 'Fonetik', level: 'Level 2', desc: 'Acoustic Analysis' },
              { id: 'struktur', icon: <GitBranch size={32} />, title: 'Struktur', level: 'Level 3', desc: 'Syntax Mapping' },
            ].map((module) => (
              <button 
                key={module.id} 
                className="bg-surface-container-low p-8 flex flex-col justify-between group hover:bg-surface-container transition-all cursor-pointer border border-transparent hover:border-primary/20 h-64 text-left w-full"
                onClick={() => setCurrentView(module.id as any)}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-primary group-hover:scale-110 transition-transform duration-500">{module.icon}</div>
                    <span className="text-[9px] bg-primary-container text-on-primary-container px-2 py-0.5 font-bold tracking-tighter uppercase">{module.level}</span>
                  </div>
                  <h3 className="font-headline text-3xl mb-2 italic">{module.title}</h3>
                  <p className="text-[10px] text-outline uppercase tracking-[0.2em]">{module.desc}</p>
                </div>
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[9px] font-label uppercase tracking-widest text-primary">Initialize Module</span>
                  <ExternalLink size={14} className="text-primary" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Recent Discussions Summary */}
        <section className="lg:col-span-4 bg-surface-container-low p-8 border border-outline-variant/5 shadow-2xl">
          <h2 className="font-label text-[10px] uppercase tracking-[0.2em] text-primary mb-8 border-b border-outline-variant/10 pb-4">Scholarly Logbook</h2>
          <div className="space-y-8">
            {discussions.length > 0 ? (
              discussions.slice(0, 3).map((item) => (
                <div key={item.fullPath} className="flex gap-6 items-start group cursor-pointer border-b border-outline-variant/5 pb-6 last:border-0 hover:translate-x-1 transition-transform">
                  <div className="w-14 h-14 bg-surface-container-highest flex-shrink-0 flex items-center justify-center border border-outline-variant/10 group-hover:border-primary/30 transition-colors">
                    <span className="text-2xl font-headline opacity-20 group-hover:opacity-100 transition-opacity">𒆥</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-headline text-xl leading-tight group-hover:text-primary transition-colors truncate italic">{item.title}</p>
                    <p className="font-label text-[9px] text-outline uppercase mt-2 tracking-widest">{item.date} • {item.lang || 'Archive'}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-outline italic">No recent inquiries logged.</p>
            )}
          </div>
        </section>

        {/* Global Hub Telemetry (Formerly Research Directory) */}
        <section className="lg:col-span-8 bg-surface-container p-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex justify-between items-center mb-10 border-b border-outline-variant/10 pb-4">
            <h2 className="font-headline text-4xl italic">Sōkjan Portal</h2>
            <span className="font-label text-[9px] uppercase text-outline tracking-widest">Internal File Systems</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 relative z-10">
            {['Panglossia', 'Wordhord', 'Struktur', 'Fonetik'].map((folder) => (
              <button 
                key={folder} 
                className="flex items-center justify-between py-4 border-b border-outline-variant/10 group cursor-pointer hover:bg-surface-container-highest/30 px-4 -mx-4 transition-all text-left w-full"
                onClick={() => setCurrentView('sources')}
              >
                <div className="flex items-center gap-6">
                  <Folder className="text-outline group-hover:text-primary transition-colors" size={24} />
                  <div>
                    <span className="font-headline text-2xl italic capitalize block">{folder}</span>
                    <span className="text-[9px] text-outline-variant uppercase tracking-widest">Root System Partition</span>
                  </div>
                </div>
                <ChevronRight className="text-outline group-hover:text-primary transition-all group-hover:translate-x-2" size={20} />
              </button>
            ))}
          </div>
        </section>
      </div>

    </motion.div>
  );
}
