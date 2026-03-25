import { useApp, View } from '../context';
import { Search, Bell } from 'lucide-react';

export default function TopNav() {
  const { currentView, setCurrentView } = useApp();

  const navLinks: { id: View; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'analysis', label: 'Sources' },
    { id: 'curriculum', label: 'Discussions' },
    { id: 'search', label: 'Archives' },
  ];

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-5rem)] z-50 flex justify-between items-center px-8 h-16 bg-surface-container-low/80 backdrop-blur-md border-b border-outline-variant/5">
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-2">
          <span className="text-xl font-headline font-bold text-primary tracking-tight">𒆥 Šiprum</span>
        </div>
        
        <nav className="hidden md:flex gap-8 text-[11px] font-label uppercase tracking-[0.2em] text-outline">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setCurrentView(link.id)}
              className={`transition-colors hover:text-primary ${currentView === link.id ? 'text-primary font-bold border-b border-primary pb-1' : ''}`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentView('search')}
            className="p-2 hover:bg-primary-container/20 transition-colors text-primary"
          >
            <Search size={18} />
          </button>
          <button className="p-2 hover:bg-primary-container/20 transition-colors text-primary relative">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-secondary rounded-full"></span>
          </button>
          <div className="w-8 h-8 bg-primary-container overflow-hidden border border-outline-variant/20">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBexqOFZ5_1GORbJpGu24tA1iQqdvHI-MznoSyZPnL7Hrpzl81aNUbBSGXK0Mn02hOnX2aZAf6zuyDbUvA5vFmsz1iD2aWy2AIgnLFFNai4VmTE2h1975mXXiphnrWikgJq2S54y3QP_RsjtKgueG1vYMzTtJOuacbu2LYR_7z0qEQnRk-mBj2QSOXK9UdEPCm29W71imDa2wSxwIF5t-ubeP3Lho4K50w9mTR7tvJ3TlkW10p8JyGD-8MPQpDyr4qU7T-q_Ajx2w" 
              alt="Chris" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
