"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var server_1 = require("./server");
var pull = require('pull-stream');
var win;
var server;
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
electron_1.app.on('ready', createWindow);
var Server = new server_1.SsbServer();
electron_1.ipcMain.on('startServer', function (event) {
    _this.server = Server.startServer();
    if (_this.server) {
        win.webContents.send('serverStarted', 'Server is started');
    }
});
electron_1.ipcMain.on('getPosts', function (event) {
    // const posts = [];
    // pull(
    //   this.server.createFeedStream({reverse: true, gte: 1549670400000, lte: Date.now() }),
    //   pull.collect((err, msgs) => {
    //     msgs.forEach((msg, index, arr) => {
    //       let name;
    //       const last = index + 1 === arr.length;
    //       const post = {};
    //
    //       this.server.about.socialValue({key: 'name', dest: msg.value.author}, (error, result) => {
    //         if (msg.value.content.type) {
    //           if (msg.value.content.type === 'post') {
    //
    //             name = result;
    //             post['name'] = name;
    //             post['key'] = msg.key;
    //             post['timestamp'] = formatTimeStamp(msg.value.timestamp);
    //             post['type'] = msg.value.content.type;
    //             post['text'] = msg.value.content.text;
    //             posts.push(post);
    //             if (last) {
    //               win.webContents.send('getPostsResponse',
    //                 posts.sort((a,b) => (a.timestamp > b.timestamp)? 1 : ((b.timestamp > a.timestamp)? -1: 0)));
    //             }
    //           }
    //         }
    //       });
    //
    //     });
    //
    //   })
    // );
});
// mac only
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
function formatTimeStamp(timestamp) {
    var date = new Date(timestamp);
    var months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    if (Date.now() - timestamp < 86400000) {
        return date.getHours().toString() + ' hours ago';
    }
    else {
        return date.getDate().toString() + ' ' + months[date.getMonth() - 1] + ' ' + date.getFullYear().toString();
    }
}
//# sourceMappingURL=main.js.map