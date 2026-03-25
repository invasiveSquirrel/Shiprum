import React from 'react';
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
  Database
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Sidebar() {
  const { currentView, setCurrentView } = useApp();

  const navItems: { id: View; icon: React.ReactNode; label: string }[] = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Home' },
    { id: 'panglossia', icon: <MessageSquare size={20} />, label: 'Panglossia' },
    { id: 'wordhord', icon: <BookOpen size={20} />, label: 'Wordhord' },
    { id: 'fonetik', icon: <Mic2 size={18} />, label: 'Fonetik' },
    { id: 'struktur', icon: <Network size={20} />, label: 'Struktur' },
    { id: 'library', icon: <Search size={20} />, label: 'Sources' },
    { id: 'discussions', icon: <Database size={20} />, label: 'Discussions' },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-20 flex flex-col items-center py-8 z-40 bg-surface-container-low border-r border-outline-variant/10">
      <div className="mb-12">
        <span className="text-primary font-headline text-2xl">𒆥</span>
      </div>
      
      <div className="flex flex-col gap-8 flex-grow w-full">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center gap-1 p-2 w-full transition-all relative group
              ${currentView === item.id ? 'text-primary' : 'text-outline opacity-60 hover:opacity-100 hover:bg-surface-container-highest/50'}
            `}
          >
            {currentView === item.id && (
              <motion.div 
                layoutId="active-nav"
                className="absolute left-0 top-0 h-full w-0.5 bg-primary"
              />
            )}
            {item.icon}
            <span className="text-[9px] font-label uppercase tracking-widest mt-1">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-8 pb-4">
        <button 
          onClick={() => setCurrentView('search')}
          className="text-outline opacity-60 hover:opacity-100 transition-opacity"
        >
          <Search size={20} />
        </button>
        <button className="text-outline opacity-60 hover:opacity-100 transition-opacity">
          <Settings size={20} />
        </button>
        <button className="text-outline opacity-60 hover:opacity-100 transition-opacity">
          <HelpCircle size={20} />
        </button>
      </div>
    </nav>
  );
}
