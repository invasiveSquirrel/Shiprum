const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'electronAPI', {
    pingModule: (moduleName) => ipcRenderer.invoke('ping-module', moduleName),
    // Add more methods here as needed for your module integrations
  }
);
