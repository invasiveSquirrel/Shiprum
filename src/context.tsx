import React from 'react';

export type View = 'dashboard' | 'sources' | 'discussions' | 'search' | 'panglossia' | 'wordhord' | 'struktur' | 'fonetik' | 'library' | 'settings';

export type Theme = 'siprum' | 'catppuccin' | 'github' | 'ocean';
export type FontFamily = 'newsreader' | 'inter' | 'mono';

interface AppContextType {
  currentView: View;
  setCurrentView: (view: View) => void;
  activeDiscussion: any | null;
  setActiveDiscussion: (disc: any | null) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontFamily: FontFamily;
  setFontFamily: (font: FontFamily) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  glassmorphism: boolean;
  setGlassmorphism: (enabled: boolean) => void;
  activeLanguages: string[];
  setActiveLanguages: (langs: string[]) => void;
}

export const AppContext = React.createContext<AppContextType>({
  currentView: 'dashboard',
  setCurrentView: () => {},
  activeDiscussion: null,
  setActiveDiscussion: () => {},
  theme: 'siprum',
  setTheme: () => {},
  fontFamily: 'newsreader',
  setFontFamily: () => {},
  fontSize: 16,
  setFontSize: () => {},
  accentColor: '',
  setAccentColor: () => {},
  glassmorphism: true,
  setGlassmorphism: () => {},
  activeLanguages: ['Swedish', 'Finnish', 'Dutch', 'Spanish', 'Scottish Gaelic'],
  setActiveLanguages: () => {},
});

export const useApp = () => React.useContext(AppContext);
