"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var fs = require("fs");
var homedir = require('os').homedir();
var Server = require('ssb-server');
var config = require('ssb-config');
var ssbkeys = require('ssb-keys');
var keys = ssbkeys.loadOrCreateSync(homedir + '/.ssb/secret');
Server.use(require('ssb-server/plugins/master'))
    .use(require('ssb-gossip'))
    .use(require('ssb-replicate'))
    .use(require('ssb-backlinks'));
var server = Server(config);
var manifest = server.getManifest();
fs.writeFileSync(path.join(config.path, 'manifest.json'), JSON.stringify(manifest));
server.whoami(function (err, feed) {
    console.log(feed);
});
var win;
function createWindow() {
    win = new electron_1.BrowserWindow({ width: 1200, height: 800 });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/ssb-electron/index.html"),
        protocol: 'file:',
        slashes: true
    }));
    win.webContents.openDevTools();
    win.on('closed', function () {
        win = null;
    });
}
electron_1.ipcMain.on('getFiles', function (event) {
    fs.readFile(__dirname + '/hallo.txt', function (err, data) {
        console.log(data.toString());
        win.webContents.send('getFilesResponse', data.toString());
    });
});
electron_1.app.on('ready', createWindow);
// mac only
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map