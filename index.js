const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 2560,
    height: 1600,
    webPreferences: { nodeIntegration: true },
  });
  mainWindow.loadFile('./dist/index.html');
  mainWindow.on('closed', () => (mainWindow = null));
  // mainWindow.webContents.openDevTools();
};
app.whenReady().then(createWindow);

try {
  require('electron-reloader')(module);
} catch (_) {}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
