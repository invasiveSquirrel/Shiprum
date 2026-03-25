const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'electronAPI', {
    startApp: (appName) => ipcRenderer.invoke('start-app', appName),
    stopApp: (appName) => ipcRenderer.invoke('stop-app', appName),
    listLibrary: () => ipcRenderer.invoke('list-library'),
    listDiscussions: () => ipcRenderer.invoke('list-discussions'),
    readFile: (path) => ipcRenderer.invoke('read-file', path),
    openExternal: (path) => ipcRenderer.invoke('open-external', path),
    getRecentDiscussions: () => ipcRenderer.invoke('get-recent-discussions'),
    getGeminiKey: () => ipcRenderer.invoke('get-gemini-key'),
    getAppStats: () => ipcRenderer.invoke('get-app-stats'),
    getDeepLKey: () => ipcRenderer.invoke('get-deepl-key'),
    saveDeepLKey: (key) => ipcRenderer.invoke('save-deepl-key', key),
    registerSource: () => ipcRenderer.invoke('register-source'),
  }
);
