import * as fs from "fs";
import * as path from "path";

const homedir = require('os').homedir();
// const Server = require('ssb-server');
// const config = require('ssb-config');
const ssbkeys = require('ssb-keys');
const createStream = require('broadcast-stream');
const SHS = require('secret-handshake');



const keys = ssbkeys.loadOrCreateSync(homedir + '/.ssb/secret');
const stream = createStream(8008);

function check(id) {
  console.log(id);
}

function authorize(id, cb){
  cb(null, check(id));
}

const appKey = Buffer.from('pTkVP2tZ9tVFlaC/8q2CcvJ80xTem++Xy5nStcCZNFs=')

const ServerStream = SHS.createServer(keys, authorize, appKey);
const ClientStream = SHS.createClient(keys, appKey);

const my_stream = ServerStream((err, serverStream)=>{
  console.log(serverStream);
});



stream.on('data', function (msg) {
  console.log(msg.address,':', msg.port, msg.toString());
});

setInterval(function () {
  stream.write(Buffer.from(JSON.stringify(keys.id), 'utf8'));
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



