export interface IElectronAPI {
  pingModule: (moduleName: string) => Promise<{ status: string; module: string; timestamp: string }>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
