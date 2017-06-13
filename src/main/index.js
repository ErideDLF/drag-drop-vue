import { app, BrowserWindow, ipcMain } from 'electron' // eslint-disable-line
import fs from 'fs';
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('renameFile', (event, filePath, oldName, newName) => {
  //TODO: seguramente esto ssólos irva para mac... comprobar en el resto de S.O.
  const fileType = oldName.split('.');
  const oldFilePath = `${filePath}/${oldName}`;
  const newFilePath = `${filePath}/${newName}.${fileType[fileType.length - 1]}`;

  console.log('archivo:', oldFilePath, newFilePath);
  console.log(fs);
  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) {
      event.sender.send('error-renameFile', err);
      console.log('ERROR: ', err);
    } else {
      event.sender.send('success-renameFile', newFilePath);
    }
  });
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
