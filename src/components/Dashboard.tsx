import { motion } from 'motion/react';
import { 
  Languages, 
  BookText, 
  Mic, 
  GitBranch, 
  Folder, 
  ChevronRight, 
  MessageSquare, 
  ExternalLink,
  Activity
} from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
  const [connectionStatus, setConnectionStatus] = useState<string | null>(null);

  const checkModuleConnection = async (name: string) => {
    if (window.electronAPI) {
      try {
        const result = await window.electronAPI.pingModule(name);
        setConnectionStatus(`Connected to ${result.module} at ${new Date(result.timestamp).toLocaleTimeString()}`);
      } catch (err) {
        setConnectionStatus('Electron integration error');
      }
    } else {
      setConnectionStatus('Not running in Electron environment');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1400px] mx-auto"
    >
      <header className="mb-16 flex justify-between items-start">
        <div>
          <h1 className="text-5xl font-headline font-light text-on-surface mb-2">Welcome back, Chris.</h1>
          <p className="text-outline font-body italic text-lg opacity-80">
            The archive has been quiet in your absence. Resume your linguistic inquiry.
          </p>
        </div>
        {connectionStatus && (
          <div className="bg-primary-container/20 px-4 py-2 border border-primary/20 flex items-center gap-2">
            <Activity size={14} className="text-primary animate-pulse" />
            <span className="text-[10px] font-label uppercase tracking-widest text-primary">{connectionStatus}</span>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Modules */}
        <section className="lg:col-span-8 bg-surface-container-low p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">Active Modules & Last Access</h2>
            <button 
              onClick={() => checkModuleConnection('External Linguistic Hub')}
              className="text-[9px] font-bold text-primary hover:text-on-surface transition-colors uppercase tracking-widest border border-primary/20 px-2 py-1"
            >
              Verify Module Links
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Languages className="text-primary" />, title: 'Panglossia', time: '2 hours ago' },
              { icon: <BookText className="text-primary" />, title: 'Wordhord', time: 'Yesterday' },
              { icon: <Mic className="text-primary" />, title: 'Fonetik', time: '3 days ago' },
              { icon: <GitBranch className="text-primary" />, title: 'Struktur', time: 'Last week' },
            ].map((module, i) => (
              <div key={i} className="bg-surface-container p-6 border-b border-transparent hover:border-primary transition-all cursor-pointer group">
                <div className="mb-4">{module.icon}</div>
                <h3 className="font-headline text-xl mb-1">{module.title}</h3>
                <p className="font-label text-[9px] text-outline uppercase tracking-widest">{module.time}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Additions */}
        <section className="lg:col-span-4 bg-surface-container p-8">
          <h2 className="font-label text-[10px] uppercase tracking-[0.2em] text-primary mb-6">Recent Additions</h2>
          <div className="space-y-6">
            {[
              { 
                title: 'Akkadian Lexicon - Vol. IV', 
                meta: 'Added Oct 24 • PDF',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBN6blKX3_BQCNsc-q8RXcZCyPKRu9nC6p1kSX1pv4tgqhjuFkADggQdWiqHLX9VEOXEiU8haaINXV3V4atR9psaPal4zXBQfS8fosRN7w3dC0iI8h2vidEuBHFvV72b3RndmKkBSuIWkTfVk9WYaukIdWd2bVLXpGZnzV7oLU-Z2mccTTWyRT-eKXLO9GI_R1OKQXrQJxuvA_qFKVOp8_INjtbLMo8rfVSamiKeC8GqliRZPvo3XFjG30NvL3dMKELUwkdTBrpV5s'
              },
              { 
                title: 'Syntax of Ugaritic Prose', 
                meta: 'Added Oct 22 • Markdown',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChoEvAb78hYCIZxvm2tleplqANNY7j_H2pm64lNbCYqTf4L1geA6TmhioqKabJcURukHfu23FatS80i5f91NZsc9hkFm-10CiiTco6zw38W3cRnJ9Ci2nA-Ma0Yn5Q5Cp5-GY_BpAv0cMG9_37m325XuPB3KwYQCawcmSmUgtfouxRILk6fMGWKyO0lHMc9We5fk6RLbnbeuIIiU2w6QazqPc8GL2Mg5Y_FTd2lvdcr-g-2KBtqBmBfe7txqxUwKqvIZR2xKEV7XU'
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start group cursor-pointer">
                <div className="w-12 h-16 bg-surface-container-high flex-shrink-0 overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="font-headline text-lg leading-tight">{item.title}</p>
                  <p className="font-label text-[9px] text-outline uppercase mt-1 tracking-widest">{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 text-primary font-label text-[9px] uppercase tracking-[0.2em] border-b border-primary/30 hover:border-primary transition-all pb-1">
            View all accessions
          </button>
        </section>

        {/* Research Directory */}
        <section className="lg:col-span-7 bg-surface-container-high p-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-headline text-3xl">Research Directory</h2>
            <span className="font-label text-[9px] uppercase text-outline tracking-widest">1,204 Files</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              'Linguistic Root Analysis',
              'Morphological Surveys',
              'Cuneiform Transcriptions',
              'Phonetic Reconstructions'
            ].map((folder, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-outline-variant/10 group cursor-pointer">
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
              { 
                title: 'Proto-Indo-European Laryngeals', 
                desc: 'A deep dive into the *h1, *h2, and *h3 coefficients and their coloring effects on adjacent vowels...',
                date: 'Oct 20, 2023'
              },
              { 
                title: 'Sumerian Ergativity Paradigms', 
                desc: 'Discussion regarding the split-ergative nature of the Sumerian verb in different aspectual contexts...',
                date: 'Oct 18, 2023'
              }
            ].map((log, i) => (
              <div key={i} className="bg-surface p-5 hover:bg-surface-container-highest transition-colors cursor-pointer border-l-2 border-primary-container">
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
            { label: 'Login', active: false },
            { label: 'Archive Scan', active: false },
            { label: 'Current', active: true },
            { label: 'Synthesis', active: false, disabled: true },
          ].map((step, i) => (
            <div key={i} className={`relative z-10 flex flex-col items-center ${step.disabled ? 'opacity-30' : ''}`}>
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
