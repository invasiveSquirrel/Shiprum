import React from 'react';

export type View = 'dashboard' | 'sources' | 'discussions' | 'search' | 'panglossia' | 'wordhord' | 'struktur' | 'fonetik' | 'library' | 'settings';

export type Theme = 'siprum' | 'catppuccin' | 'github' | 'ocean';

interface AppContextType {
  currentView: View;
  setCurrentView: (view: View) => void;
  activeDiscussion: any | null;
  setActiveDiscussion: (disc: any | null) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const AppContext = React.createContext<AppContextType>({
  currentView: 'dashboard',
  setCurrentView: () => {},
  activeDiscussion: null,
  setActiveDiscussion: () => {},
  theme: 'siprum',
  setTheme: () => {},
});

export const useApp = () => React.useContext(AppContext);
