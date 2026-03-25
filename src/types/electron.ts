export interface ElectronAPI {
  startApp: (appName: string) => Promise<void>;
  stopApp: (appName: string) => Promise<void>;
  listLibrary: () => Promise<any>;
  listDiscussions: () => Promise<any>;
  readFile: (path: string) => Promise<string>;
  openExternal: (path: string) => Promise<void>;
  getRecentDiscussions: () => Promise<any[]>;
  getGeminiKey: () => Promise<string | null>;
  getAppStats: () => Promise<any>;
  getDeepLKey: () => Promise<string | null>;
  saveDeepLKey: (key: string) => Promise<boolean>;
  registerSource: () => Promise<string | null>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
