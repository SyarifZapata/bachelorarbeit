import * as fs from "fs";
import * as path from "path";

const homedir = require('os').homedir();
const ssbkeys = require('ssb-keys');
const createStream = require('broadcast-stream');
const pull = require('pull-stream');

const Config = require('ssb-config/inject');
const cl = require('chloride');
const SecretStack = require('secret-stack');
const SSB = require('ssb-db');
const _ = require('lodash');


const main_address = 'net:192.168.0.101:9898~shs:/na0uX/HrCF5ylJRO0hKN4yMb8+oBNdoiDfLpJTX4fU=';
const keys = ssbkeys.loadOrCreateSync(homedir + '/.ssb/secret');
const stream = createStream(8989);


const testkey = cl.crypto_sign_keypair();

const syarifKey = Buffer.from('@GIjvY/Wz1maK0lpFZlU57AhOvN2b5ZF0NoTsq+0L/FU=', 'base64');
const appKey = Buffer.from('pTkVP2tZ9tVFlaC/8q2CcvJ80xTem++Xy5nStcCZNFs=', 'base64');
const ssbAppkey = Buffer.from('1KHLiKZvAvjbY1ziZEHMXawbCEIM6qwjCDm3VYRan/s=', 'base64');

const createApp = SecretStack({
  appKey: appKey
}).use(SSB);
  // .use(require('ssb-gossip'))
  // .use(require('ssb-replicate'));
  // .use(require('ssb-friends'));

const config = Config('syarif-ssb', {port: 8989});
// const config = Config('ssb', {port: 8008, keys: keys});

const node = createApp(config);
console.log(node);

node.publish({type: 'post', text: 'My First Post!'}, (err, msg)=>{
  console.log(err);
  console.log(msg);
});
// pull(node.replicate.upto({live:true}), pull.drain(console.log));

// setInterval(() =>{
//   console.log(_.keys(node.peers).length);
//   console.log(node.progress());
//
// }, 400);

// pull(
//   node.replicate.upto(), pull.drain((err, msg)=>{
//     console.log(msg);
//   })
// );



stream.on('data', function (msg) {
  console.log(msg.address, msg.toString());
});

setInterval(function () {
  stream.write(Buffer.from(JSON.stringify(node.getAddress()), 'utf8'));
}, 5000);



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

      node.whoami((error, feed) => {
        console.log(feed);
      });
      // return server;
      return 'hallo';
    } catch (e) {
      return 'server is not started';
    }

  }
}



