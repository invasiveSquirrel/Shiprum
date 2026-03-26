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
    
    // Missing IPC methods for Sōkjan Hub
    listMediaFiles: (dirPath) => ipcRenderer.invoke('list-media-files', dirPath),
    runLexicalAnalysis: (params) => ipcRenderer.invoke('run-lexical-analysis', params),
    getRssFeed: (url) => ipcRenderer.invoke('get-rss-feed', url),
    reviseScript: (params) => ipcRenderer.invoke('revise-script', params),
    saveFile: (params) => ipcRenderer.invoke('save-file', params),
    runScript: (params) => ipcRenderer.invoke('run-script', params),
    searchApp: (appId, query) => ipcRenderer.invoke('search-app', appId, query),
    transcribeMedia: (params) => ipcRenderer.invoke('transcribe-media', params),
    translateTranscript: (params) => ipcRenderer.invoke('translate-transcript', params)
  }
);
