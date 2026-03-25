/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { AppContext, View } from './context';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Dashboard from './components/Dashboard';
import Library from './components/Sources';
import GlobalSearch from './components/GlobalSearch';
import AppEmbed from './components/AppEmbed';
import Discussions from './components/Discussions';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [activeDiscussion, setActiveDiscussion] = useState<any | null>(null);

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
    setActiveDiscussion
  }), [currentView, activeDiscussion]);

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary/30">
        <Sidebar />
        <TopNav />
        
        <main className="ml-20 pt-24 px-8 md:px-12 pb-12 min-h-screen">
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
