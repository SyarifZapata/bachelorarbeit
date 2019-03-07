import {app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';
import {SsbServer} from './server';
const pull = require('pull-stream');

let win: BrowserWindow;
let server: any;

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


app.on('ready', createWindow);

const Server = new SsbServer();

ipcMain.on('startServer', (event) => {
  this.server = Server.startServer();
  if (this.server) {
    win.webContents.send('serverStarted', 'Server is started');
  }
});

ipcMain.on('getPosts', (event) => {
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
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});


function formatTimeStamp(timestamp) {
  const date = new Date(timestamp);
  const months = [ 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December' ];
  if (Date.now() - timestamp < 86400000){
    return date.getHours().toString() + ' hours ago';
  } else {
    return date.getDate().toString() + ' ' + months[date.getMonth() - 1] + ' ' + date.getFullYear().toString();
  }
}
