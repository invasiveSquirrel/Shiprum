import React, { useState, useMemo, useEffect } from 'react';
import { AppContext, View, Theme } from './context';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Dashboard from './components/Dashboard';
import Library from './components/Sources';
import GlobalSearch from './components/GlobalSearch';
import AppEmbed from './components/AppEmbed';
import Discussions from './components/Discussions';
import Settings from './components/Settings';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [activeDiscussion, setActiveDiscussion] = useState<any | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('shiprum-theme') as Theme) || 'siprum';
  });

  useEffect(() => {
    localStorage.setItem('shiprum-theme', theme);
    // Apply theme class to document for global variables
    const root = document.documentElement;
    root.classList.remove('theme-catppuccin', 'theme-github', 'theme-ocean');
    if (theme !== 'siprum') {
      root.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'sources':
      case 'library':
        return <Library />;
      case 'discussions':
        return <Discussions />;
      case 'search':
        return <GlobalSearch />;
      case 'settings':
        return <Settings />;
      case 'panglossia':
        return <AppEmbed appName="panglossia" port={5173} />;
      case 'wordhord':
        return <AppEmbed appName="wordhord" port={5174} />;
      case 'fonetik':
        return <AppEmbed appName="fonetik" port={5175} />;
      case 'struktur':
        return <AppEmbed appName="struktur" port={5176} />;
      default:
        return <Dashboard />;
    }
  };

  const contextValue = useMemo(() => ({ 
    currentView, 
    setCurrentView,
    activeDiscussion,
    setActiveDiscussion,
    theme,
    setTheme
  }), [currentView, activeDiscussion, theme]);

  return (
    <AppContext.Provider value={contextValue}>
      <div className={`min-h-screen bg-surface text-on-surface font-body selection:bg-primary/30 theme-${theme}`}>
        <Sidebar />
        <TopNav />
        
        <main className="ml-20 pt-24 px-8 md:px-12 pb-12 min-h-screen relative z-10">
          <AnimatePresence mode="wait">
            <div key={currentView}>
              {renderView()}
            </div>
          </AnimatePresence>
        </main>
      </div>
    </AppContext.Provider>
  );
}
