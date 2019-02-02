import {app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

let win: BrowserWindow;

function createWindow() {
  win = new BrowserWindow({width: 1200, height: 800});

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../../dist/ssb-electron/index.html`),
      protocol: 'file:',
      slashes: true
    })
  );

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

ipcMain.on('getFiles', (event) => {
  fs.readFile(__dirname + '/hallo.txt', (err, data)=>{
    console.log(data.toString());
    win.webContents.send('getFilesResponse', data.toString());
  });

});

app.on('ready', createWindow);

// mac only
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

