/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { AppContext, View } from './context';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Dashboard from './components/Dashboard';
import Analysis from './components/Analysis';
import GlobalSearch from './components/GlobalSearch';
import AppEmbed from './components/AppEmbed';
import Library from './components/Library';
import Discussions from './components/Discussions';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'sources':
        return <Analysis />;
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
      case 'library':
        return <Library />;
      default:
        return <Dashboard />;
    }
  };

  const contextValue = useMemo(() => ({ currentView, setCurrentView }), [currentView]);

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

        {/* Global Grain Overlay for texture - local replacement or removed to stop 403 */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-[100] bg-noise"></div>
      </div>
    </AppContext.Provider>
  );
}
