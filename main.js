import { app, BrowserWindow, ipcMain, shell, dialog } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
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
      webviewTag: true,
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

import { exec, spawn } from 'node:child_process';
import fs from 'node:fs/promises';

// Track running processes
const processes = {};

// IPC Handlers for module integration
ipcMain.handle('start-app', async (event, appName) => {
  console.log(`Starting app: ${appName}`);
  if (processes[appName]) return { status: 'already_running' };

  const appPaths = {
    panglossia: '/home/chris/panglossia/start.sh',
    wordhord: '/home/chris/wordhord/start.sh',
    struktur: '/home/chris/struktur/start_backend.sh',
    fonetik: '/home/chris/fonetik/start_headless.sh'
  };

  const scriptPath = appPaths[appName];
  if (!scriptPath) return { status: 'error', message: 'Unknown app' };

  try {
    const proc = spawn('bash', [scriptPath], {
      detached: true,
      stdio: 'ignore',
      env: { ...process.env, SHIPRUM_EMBEDDED: 'true' }
    });
    proc.unref();
    processes[appName] = proc;
    return { status: 'started' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
});

ipcMain.handle('stop-app', async (event, appName) => {
  console.log(`Stopping app: ${appName}`);
  // Most of these apps have their own cleanup in the start scripts,
  // but we can add more direct pkill logic here if needed.
  const appPorts = {
    panglossia: 5173,
    wordhord: 5174,
    fonetik: 5175,
    struktur: 5176
  };

  const port = appPorts[appName];
  if (port) {
    exec(`fuser -k ${port}/tcp`);
  }
  delete processes[appName];
  return { status: 'stopped' };
});

ipcMain.handle('list-library', async () => {
  const libraryPath = '/home/chris/struktur/library';
  try {
    const languages = await fs.readdir(libraryPath);
    const library = {};
    for (const lang of languages) {
      try {
        const langPath = path.join(libraryPath, lang);
        const stats = await fs.stat(langPath);
        if (stats.isDirectory()) {
          const files = await fs.readdir(langPath);
          library[lang] = files.filter(f => f.endsWith('.pdf'));
        }
      } catch (err) {
        console.error(`Error scanning lang ${lang}:`, err);
      }
    }
    return library;
  } catch (error) {
    console.error('Library scan error:', error);
    return {};
  }
});

ipcMain.handle('register-source', async (event) => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  if (!result.canceled && result.filePaths.length > 0) {
    // For now we just return it, but in a real app we'd save it to a config file
    return result.filePaths[0];
  }
  return null;
});

// Gemini API Integration
ipcMain.handle('get-gemini-key', async () => {
  const keyPath = '/home/chris/wordhord/wordhord_api.txt';
  try {
    const key = await fs.readFile(keyPath, 'utf-8');
    return key.trim();
  } catch (err) {
    console.error('Gemini Key not found:', err);
    return null;
  }
});

// Real Data Integration: Panglossia Logs
ipcMain.handle('get-recent-discussions', async () => {
  const discussionsPath = '/home/chris/panglossia/discussions';
  try {
    const files = await fs.readdir(discussionsPath);
    const mdFiles = files.filter(f => f.endsWith('.md')).sort((a, b) => b.localeCompare(a)).slice(0, 5);
    
    const results = await Promise.all(mdFiles.map(async (file) => {
      const fullPath = path.join(discussionsPath, file);
      const content = await fs.readFile(fullPath, 'utf-8');
      const stats = await fs.stat(fullPath);
      return {
        title: file.replaceAll('.md', '').replaceAll('-', ' '),
        desc: content.slice(0, 150) + '...',
        date: stats.mtime.toLocaleDateString(),
        fullPath: fullPath
      };
    }));
    return results;
  } catch (err) {
    console.error('Error fetching discussions:', err);
    return [];
  }
});

// Enhanced File & Analysis Handlers
ipcMain.handle('run-lexical-analysis', async (event, { filePath, lang }) => {
  return new Promise((resolve) => {
    const scriptPath = '/home/chris/wordhord/analyze_corpus.py';
    exec(`python3 ${scriptPath} "${filePath}" --lang ${lang} --json`, (error, stdout, stderr) => {
      if (error) {
        console.error('Analysis error:', stderr);
        resolve({ error: stderr || error.message });
      } else {
        try {
          resolve(JSON.parse(stdout));
        } catch (e) {
          resolve({ error: 'Failed to parse JSON output' });
        }
      }
    });
  });
});

import https from 'node:https';
ipcMain.handle('get-rss-feed', async (event, url) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', (err) => resolve(null));
  });
});

ipcMain.handle('list-media-files', async (event, dirPath) => {
  try {
    const files = await fs.readdir(dirPath);
    const mediaExtensions = new Set(['.mp3', '.mp4', '.m4a', '.wav', '.mkv']);
    return files.filter(f => mediaExtensions.has(path.extname(f).toLowerCase()));
  } catch (err) {
    console.error('Media listing error:', err);
    return [];
  }
});

// App Activity Stats
ipcMain.handle('get-app-stats', async () => {
  const stats = {
    panglossia: { lastAccess: 'Active', count: 0 },
    wordhord: { lastAccess: 'Checked', count: 0 },
    fonetik: { lastAccess: 'Ready', count: 0 },
    struktur: { lastAccess: 'Synced', count: 0 }
  };
  return stats;
});

// DeepL API Integration
ipcMain.handle('get-deepl-key', async () => {
  const keyPath = '/home/chris/wordhord/deepl_api.txt';
  try {
    const key = await fs.readFile(keyPath, 'utf-8');
    return key.trim();
  } catch (err) {
    console.error('Error reading DeepL Key:', err);
    return null;
  }
});

ipcMain.handle('save-deepl-key', async (event, key) => {
  const keyPath = '/home/chris/wordhord/deepl_api.txt';
  try {
    await fs.writeFile(keyPath, key, 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving DeepL Key:', err);
    return false;
  }
});

ipcMain.handle('run-script', async (event, { scriptPath, args = [] }) => {
  return new Promise((resolve) => {
    exec(`python3 ${scriptPath} ${args.join(' ')}`, (error, stdout, stderr) => {
      resolve({ stdout, stderr, error: error ? error.message : null });
    });
  });
});

ipcMain.handle('revise-script', async (event, { code, prompt }) => {
  const keyPath = '/home/chris/wordhord/wordhord_api.txt';
  try {
    const keyData = await fs.readFile(keyPath, 'utf-8');
    const key = keyData.trim();
    const systemPrompt = "You are an expert Python developer. Your task is to revise the provided script based on the user's request. Return ONLY the modified code, no explanations or markdown blocks.";
    const userMessage = `Prompt: ${prompt}\n\nCode:\n${code}`;
    
    // Using simple fetch to Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ roles: 'user', parts: [{ text: `${systemPrompt}\n\n${userMessage}` }] }]
      })
    });
    
    const data = await response.json();
    const revisedCode = data.candidates[0].content.parts[0].text.trim();
    // Clean up if Gemini adds markdown blocks
    return revisedCode.replace(/^```python\n/, '').replace(/\n```$/, '');
  } catch (err) {
    console.error('Revision error:', err);
    return null;
  }
});

ipcMain.handle('save-file', async (event, { filePath, content }) => {
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return true;
  } catch (err) {
     return false;
  }
});

// Universal Search Bridge for Sub-Apps
ipcMain.handle('search-app', async (event, appId, query) => {
  const basePaths = {
    panglossia: '/home/chris/panglossia/history',
    wordhord: '/home/chris/wordhord/vocabs',
    fonetik: '/home/chris/fonetik/data',
    struktur: '/home/chris/struktur/library'
  };

  const searchPath = basePaths[appId];
  if (!searchPath) return [];

  try {
    const files = await fs.readdir(searchPath);
    const results = [];
    
    for (const file of files) {
      if (file.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          id: `${appId}-${file}`,
          title: file,
          desc: `Found in ${appId} archive.`,
          source: appId
        });
      }
    }
    return results;
  } catch (err) {
    return [];
  }
});

ipcMain.handle('read-file', async (event, filePath) => {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    return `Error reading file: ${error.message}`;
  }
});

ipcMain.handle('open-external', async (event, filePath) => {
  shell.openPath(filePath);
});

const startApp = async () => {
  await app.whenReady();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
};

startApp();

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
