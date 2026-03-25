import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import isDev from 'electron-is-dev';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    backgroundColor: '#0c0e11', // Matches Šiprum surface color
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    titleBarStyle: 'hiddenInset', // Modern "frameless" look on macOS
  });

  // Load the app
  if (isDev) {
    win.loadURL('http://localhost:3000');
    // Open DevTools in development
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, 'dist/index.html'));
  }

  // Handle window close
  win.on('closed', () => {
    app.quit();
  });
}

// IPC Handlers for module integration
ipcMain.handle('ping-module', async (event, moduleName) => {
  console.log(`Pinging module: ${moduleName}`);
  // This is where you'd add logic to communicate with your other apps
  return { status: 'connected', module: moduleName, timestamp: new Date().toISOString() };
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
