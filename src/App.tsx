import React, { useState, useMemo, useEffect } from 'react';
import { AppContext, View, Theme, FontFamily } from './context';
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
  const [fontFamily, setFontFamily] = useState<FontFamily>(() => {
    return (localStorage.getItem('shiprum-font') as FontFamily) || 'newsreader';
  });
  const [fontSize, setFontSize] = useState<number>(() => {
    return Number(localStorage.getItem('shiprum-font-size')) || 16;
  });
  const [accentColor, setAccentColor] = useState<string>(() => {
    return localStorage.getItem('shiprum-accent') || '';
  });
  const [glassmorphism, setGlassmorphism] = useState<boolean>(() => {
    const saved = localStorage.getItem('shiprum-glass');
    return saved === null ? true : saved === 'true';
  });
  const [activeLanguages, setActiveLanguages] = useState<string[]>(() => {
    const saved = localStorage.getItem('shiprum-languages');
    return saved ? JSON.parse(saved) : ['Swedish', 'Finnish', 'Dutch', 'Spanish', 'Scottish Gaelic'];
  });

  useEffect(() => {
    localStorage.setItem('shiprum-theme', theme);
    localStorage.setItem('shiprum-font', fontFamily);
    localStorage.setItem('shiprum-font-size', fontSize.toString());
    localStorage.setItem('shiprum-accent', accentColor);
    localStorage.setItem('shiprum-glass', glassmorphism.toString());
    localStorage.setItem('shiprum-languages', JSON.stringify(activeLanguages));

    const root = document.documentElement;
    root.classList.remove('theme-catppuccin', 'theme-github', 'theme-ocean');
    if (theme !== 'siprum') {
      root.classList.add(`theme-${theme}`);
    }

    // Inject Custom Variables
    root.style.setProperty('--global-font-body', fontFamily === 'newsreader' ? '"Newsreader", serif' : fontFamily === 'inter' ? '"Inter", sans-serif' : '"JetBrains Mono", monospace');
    root.style.setProperty('--global-font-size', `${fontSize}px`);
    if (accentColor) {
      root.style.setProperty('--primary', accentColor);
    }
    root.style.setProperty('--glass-opacity', glassmorphism ? '0.7' : '1');
  }, [theme, fontFamily, fontSize, accentColor, glassmorphism, activeLanguages]);


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
    setTheme,
    fontFamily,
    setFontFamily,
    fontSize,
    setFontSize,
    accentColor,
    setAccentColor,
    glassmorphism,
    setGlassmorphism,
    activeLanguages,
    setActiveLanguages
  }), [currentView, activeDiscussion, theme, fontFamily, fontSize, accentColor, glassmorphism, activeLanguages]);

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
