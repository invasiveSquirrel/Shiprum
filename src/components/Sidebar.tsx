import React, { useState } from 'react';
import { useApp, View } from '../context';
import { 
  LayoutDashboard, 
  BookOpen, 
  Mic2, 
  Network, 
  Settings, 
  HelpCircle,
  Search,
  MessageSquare,
  PlayCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Sidebar() {
  const { currentView, setCurrentView } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems: { id: View; icon: React.ReactNode; label: string }[] = [
    { id: 'dashboard', icon: <LayoutDashboard size={22} />, label: 'Homebase Dashboard' },
    { id: 'panglossia', icon: <MessageSquare size={22} />, label: 'Panglossia Tutor' },
    { id: 'wordhord', icon: <BookOpen size={22} />, label: 'Wordhord Lexicon' },
    { id: 'fonetik', icon: <Mic2 size={20} />, label: 'Fonetik IPA' },
    { id: 'struktur', icon: <Network size={22} />, label: 'Struktur Syntax' },
    { id: 'library', icon: <PlayCircle size={22} />, label: 'Sources' },
    { id: 'search', label: 'Search', icon: <Search size={22} /> },
  ];

  return (
    <motion.nav 
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      initial={false}
      animate={{ width: isExpanded ? 260 : 80 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-full flex flex-col z-40 bg-surface-container-low border-r border-outline-variant/10 overflow-hidden shadow-2xl"
    >
      <div className="h-20 flex items-center justify-center shrink-0">
        <span className="text-primary font-headline text-3xl">𒆥</span>
        <AnimatePresence>
          {isExpanded && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-3 font-headline text-xl text-on-surface whitespace-nowrap"
            >
              Šiprum
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex flex-col gap-2 flex-grow w-full px-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex items-center p-3 rounded-lg transition-all relative group h-12
              ${currentView === item.id ? 'text-primary bg-primary/5' : 'text-outline opacity-60 hover:opacity-100 hover:bg-surface-container-highest/50'}
            `}
          >
            {currentView === item.id && (
              <motion.div 
                layoutId="active-nav"
                className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r-full"
              />
            )}
            <div className="w-10 flex-shrink-0 flex justify-center">
              {item.icon}
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="ml-3 text-[11px] font-label uppercase tracking-widest whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 p-3 border-t border-outline-variant/10">
        <button 
          onClick={() => setCurrentView('search')}
          className="flex items-center gap-4 p-3 text-outline opacity-60 hover:opacity-100 hover:bg-surface-container-highest/50 rounded-lg transition-all"
        >
          <div className="w-10 flex-shrink-0 flex justify-center"><Search size={22} /></div>
          {isExpanded && <span className="text-[11px] font-label uppercase tracking-widest whitespace-nowrap">Global Search</span>}
        </button>
        <button 
          onClick={() => setCurrentView('settings')}
          className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
            currentView === 'settings' ? 'text-primary bg-primary/5' : 'text-outline opacity-60 hover:opacity-100 hover:bg-surface-container-highest/50'
          }`}
        >
          <div className="w-10 flex-shrink-0 flex justify-center"><Settings size={22} /></div>
          {isExpanded && <span className="text-[11px] font-label uppercase tracking-widest whitespace-nowrap">Hub Settings</span>}
        </button>
        <button className="flex items-center gap-4 p-3 text-outline opacity-60 hover:opacity-100 hover:bg-surface-container-highest/50 rounded-lg transition-all">
          <div className="w-10 flex-shrink-0 flex justify-center"><HelpCircle size={22} /></div>
          {isExpanded && <span className="text-[11px] font-label uppercase tracking-widest whitespace-nowrap">Archives Guide</span>}
        </button>
      </div>
    </motion.nav>
  );
}
