import React from 'react';

export type View = 'dashboard' | 'analysis' | 'curriculum' | 'search';

interface AppContextType {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export const AppContext = React.createContext<AppContextType>({
  currentView: 'dashboard',
  setCurrentView: () => {},
});

export const useApp = () => React.useContext(AppContext);
