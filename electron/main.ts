import {app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';
const homedir = require('os').homedir();
const Server = require('ssb-server');
const config = require('ssb-config');
const ssbkeys = require('ssb-keys');

const keys = ssbkeys.loadOrCreateSync(homedir + '/.ssb/secret');
Server.use(require('ssb-server/plugins/master'))
  .use(require('ssb-gossip'))
  .use(require('ssb-replicate'))
  .use(require('ssb-backlinks'));

const server = Server(config);
const manifest = server.getManifest();

fs.writeFileSync(path.join(config.path, 'manifest.json'), JSON.stringify(manifest));

server.whoami((err, feed) => {
  console.log(feed);
});



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

