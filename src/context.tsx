import React from 'react';

export type View = 'dashboard' | 'sources' | 'discussions' | 'search' | 'panglossia' | 'wordhord' | 'struktur' | 'fonetik' | 'library';

interface AppContextType {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export const AppContext = React.createContext<AppContextType>({
  currentView: 'dashboard',
  setCurrentView: () => {},
});

export const useApp = () => React.useContext(AppContext);
