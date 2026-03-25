import { motion } from 'motion/react';
import { 
  Languages, 
  BookText, 
  Mic, 
  GitBranch, 
  Folder, 
  ChevronRight,
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [appStats, setAppStats] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const disc = await globalThis.electronAPI.getRecentDiscussions();
        const stats = await globalThis.electronAPI.getAppStats();
        setDiscussions(disc);
        setAppStats(stats);
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
      <header className="mb-16 flex justify-between items-start">
        <div>
          <h1 className="text-5xl font-headline font-light text-on-surface mb-2">Linguistic Hub</h1>
          <p className="text-outline font-body italic text-lg opacity-80">
            Resume your inquiry into the Archive. All modules are linked.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Modules */}
        <section className="lg:col-span-8 bg-surface-container-low p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">Active Modules & Connectivity</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'panglossia', icon: <Languages className="text-primary" />, title: 'Panglossia' },
              { id: 'wordhord', icon: <BookText className="text-primary" />, title: 'Wordhord' },
              { id: 'fonetik', icon: <Mic className="text-primary" />, title: 'Fonetik' },
              { id: 'struktur', icon: <GitBranch className="text-primary" />, title: 'Struktur' },
            ].map((module) => (
              <div key={module.id} className="bg-surface-container p-6 border-b border-transparent hover:border-primary transition-all cursor-pointer group">
                <div className="mb-4">{module.icon}</div>
                <h3 className="font-headline text-xl mb-1">{module.title}</h3>
                <p className="font-label text-[9px] text-outline uppercase tracking-widest">
                  {appStats?.[module.id]?.lastAccess || 'Ready'}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Discussions Summary */}
        <section className="lg:col-span-4 bg-surface-container p-8">
          <h2 className="font-label text-[10px] uppercase tracking-[0.2em] text-primary mb-6">Recent Discussions</h2>
          <div className="space-y-6">
            {discussions.length > 0 ? (
              discussions.slice(0, 3).map((item) => (
                <div key={item.fullPath} className="flex gap-4 items-start group cursor-pointer border-b border-outline-variant/5 pb-4">
                  <div className="w-12 h-12 bg-surface-container-high flex-shrink-0 flex items-center justify-center border border-outline-variant/10">
                    <span className="text-xl font-headline opacity-20">𒆥</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-headline text-lg leading-tight group-hover:text-primary transition-colors">{item.title}</p>
                    <p className="font-label text-[9px] text-outline uppercase mt-1 tracking-widest">{item.date}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-outline italic">No recent discussions found.</p>
            )}
          </div>
        </section>

        {/* Research Directory */}
        <section className="lg:col-span-7 bg-surface-container-high p-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-headline text-3xl">Research Directory</h2>
            <span className="font-label text-[9px] uppercase text-outline tracking-widest">1,204 Files</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {['Linguistic Root Analysis', 'Morphological Surveys', 'Cuneiform Transcriptions', 'Phonetic Reconstructions'].map((folder) => (
              <div key={folder} className="flex items-center justify-between py-2 border-b border-outline-variant/10 group cursor-pointer">
                <div className="flex items-center gap-4">
                  <Folder className="text-outline group-hover:text-primary transition-colors" size={20} />
                  <span className="font-body text-xl">{folder}</span>
                </div>
                <ChevronRight className="text-outline" size={16} />
              </div>
            ))}
          </div>
        </section>

        {/* Tutor Logs */}
        <section className="lg:col-span-5 bg-surface-container-low p-8 border border-outline-variant/5">
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="text-primary" size={20} />
            <h2 className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">Panglossia Tutor Logs</h2>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Proto-Indo-European Laryngeals', desc: 'A deep dive into the *h1, *h2, and *h3 coefficients...', date: 'Oct 20, 2023' },
              { title: 'Sumerian Ergativity Paradigms', desc: 'Discussion regarding the split-ergative nature of the Sumerian verb...', date: 'Oct 18, 2023' }
            ].map((log) => (
              <div key={log.title} className="bg-surface p-5 hover:bg-surface-container-highest transition-colors cursor-pointer border-l-2 border-primary-container">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline text-lg">{log.title}</h3>
                  <span className="font-label text-[9px] text-outline">MD</span>
                </div>
                <p className="text-sm text-on-surface-variant font-body line-clamp-2 italic">{log.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-label text-[9px] uppercase text-outline tracking-widest">{log.date}</span>
                  <ExternalLink className="text-primary" size={16} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Session Trajectory */}
      <section className="mt-24 mb-12">
        <h2 className="font-label text-[10px] uppercase tracking-[0.2em] text-primary mb-12 text-center">Session Trajectory</h2>
        <div className="relative flex justify-between items-center max-w-4xl mx-auto">
          <div className="absolute h-[1px] w-full bg-outline-variant/20 left-0 top-1/2 -translate-y-1/2"></div>
          {[
            { id: 'login', label: 'Login', active: false },
            { id: 'scan', label: 'Archive Scan', active: false },
            { id: 'current', label: 'Current', active: true },
            { id: 'synth', label: 'Synthesis', active: false, disabled: true },
          ].map((step) => (
            <div key={step.id} className={`relative z-10 flex flex-col items-center ${step.disabled ? 'opacity-30' : ''}`}>
              <div className={`mb-3 transition-all ${step.active ? 'w-4 h-4 bg-primary-container border border-primary' : 'w-2 h-2 bg-primary'}`}></div>
              <span className={`font-label text-[9px] uppercase tracking-widest ${step.active ? 'text-primary font-bold' : 'text-outline'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
