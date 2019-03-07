import * as fs from "fs";
import * as path from "path";

const homedir = require('os').homedir();
// const Server = require('ssb-server');
// const config = require('ssb-config');
const ssbkeys = require('ssb-keys');
const createStream = require('broadcast-stream');


const keys = ssbkeys.loadOrCreateSync(homedir + '/.ssb/secret');

const stream = createStream(8008);

stream.on('data', function (msg) {
  console.log(msg.address,':', msg.port, msg.toString());
});

setInterval(function () {
  stream.write(new Buffer(JSON.stringify(keys.id), 'utf8'));
}, 2000);


// Server.use(require('ssb-server/plugins/master'))
//   .use(require('ssb-gossip'))
//   .use(require('ssb-replicate'))
//   .use(require('ssb-backlinks'))
//   .use(require('ssb-about'));


// Thread (Zeitstamp)
// Zentrales element => weg werfen.
// Alles was
// Tangle? thread.. in SQL.
// Gathering anschauen.
// Alles selbst berechnen
// Manipulation timestime.
// Topologisches Sort. Javascript.


export class SsbServer {

  startServer(): any{
    try {
      // const server = Server(config);
      // const manifest = server.getManifest();
      // fs.writeFileSync(path.join(config.path, 'manifest.json'), JSON.stringify(manifest));
      //
      // server.whoami((error, feed) => {
      //   console.log(feed);
      // });
      // return server;
      return 'hallo';
    } catch (e) {
      return 'server is not started';
    }

  }
}



