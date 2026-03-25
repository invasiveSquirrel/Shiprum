/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppContext, View } from './context';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Dashboard from './components/Dashboard';
import Analysis from './components/Analysis';
import Curriculum from './components/Curriculum';
import GlobalSearch from './components/GlobalSearch';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'analysis':
        return <Analysis />;
      case 'curriculum':
        return <Curriculum />;
      case 'search':
        return <GlobalSearch />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppContext.Provider value={{ currentView, setCurrentView }}>
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

        {/* Global Grain Overlay for texture */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>
    </AppContext.Provider>
  );
}
