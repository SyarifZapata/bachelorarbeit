import * as fs from "fs";
import * as path from "path";

const homedir = require('os').homedir();
const ssbkeys = require('ssb-keys');
const createStream = require('broadcast-stream');
//const SHS = require('secret-handshake');
const Config = require('ssb-config/inject');
const cl = require('chloride');
const SecretStack = require('secret-stack');


const main_address = 'net:192.168.0.101:9898~shs:/na0uX/HrCF5ylJRO0hKN4yMb8+oBNdoiDfLpJTX4fU=';
const keys = ssbkeys.loadOrCreateSync(homedir + '/.ssb/secret');
const stream = createStream(8008);

// function check(id) {
//   console.log(id);
// }

// function authorize(id, cb){
//   cb(null, check(id));
// }

const testkey = cl.crypto_sign_keypair();

const syarifKey = Buffer.from('@GIjvY/Wz1maK0lpFZlU57AhOvN2b5ZF0NoTsq+0L/FU=', 'base64');
const appKey = Buffer.from('pTkVP2tZ9tVFlaC/8q2CcvJ80xTem++Xy5nStcCZNFs=', 'base64');

const createApp = SecretStack({
  appKey: appKey
});

const config = Config('syarif-ssb', {port: 9898});

const node = createApp(config);

console.log(node.getAddress());

// const ServerStream = SHS.createServer(keys, authorize, appKey);
// const ClientStream = SHS.createClient(keys, appKey);

// const my_stream = ServerStream((err, serverStream)=>{
//   console.log(serverStream);
// });



stream.on('data', function (msg) {
  console.log(msg.address, msg.toString());
});

setInterval(function () {
  stream.write(Buffer.from(JSON.stringify(node.getAddress()), 'utf8'));
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



