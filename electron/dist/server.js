"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var homedir = require('os').homedir();
var ssbkeys = require('ssb-keys');
var createStream = require('broadcast-stream');
var pull = require('pull-stream');
var Config = require('ssb-config/inject');
var cl = require('chloride');
var SecretStack = require('secret-stack');
var SSB = require('ssb-db');
var _ = require('lodash');
var main_address = 'net:192.168.0.101:9898~shs:/na0uX/HrCF5ylJRO0hKN4yMb8+oBNdoiDfLpJTX4fU=';
var keys = ssbkeys.loadOrCreateSync(homedir + '/.ssb/secret');
var stream = createStream(8989);
var syarifKey = Buffer.from('@GIjvY/Wz1maK0lpFZlU57AhOvN2b5ZF0NoTsq+0L/FU=', 'base64');
var appKey = Buffer.from('pTkVP2tZ9tVFlaC/8q2CcvJ80xTem++Xy5nStcCZNFs=', 'base64');
var ssbAppkey = Buffer.from('1KHLiKZvAvjbY1ziZEHMXawbCEIM6qwjCDm3VYRan/s=', 'base64');
var createApp = SecretStack({
    appKey: ssbAppkey
}).use(SSB)
    .use(require('ssb-gossip'))
    .use(require('ssb-replicate'))
    .use(require('ssb-friends'))
    .use(require('ssb-backlinks'))
    .use(require('ssb-threads'));
// const config = Config('syarif-ssb', {port: 8989});
var config = Config('ssb', { port: 8008, keys: keys });
var node = createApp(config);
// console.log(node);
function createBacklinkStream(id) {
    var filterQuery = {
        $filter: {
            dest: id
        }
    };
    return node.backlinks.read({
        query: [filterQuery],
        index: 'DTA',
        live: true
    });
}
var msgKey = '%E+OxB7V8JUhzsmv+yxUJHZUD8YEvsA8wHMRd1+VR4S8=.sha256';
var relatedMessages = [];
pull(createBacklinkStream(msgKey), pull.filter(function (msg) { return !msg.sync; }), 
// note the 'live' style streams emit { sync: true } when they're up to date!
pull.drain(function (msg) {
    relatedMessages.push(msg);
}));
setInterval(function () {
    console.log(relatedMessages);
}, 3000);
// node.publish({type: 'post', text: 'My First Post!'}, (err, msg) => {
//   console.log('post published');
// });
// node.publish({
//   type: 'post',
//   root: '%MPB9vxHO0pvi2ve2wh6Do05ZrV7P6ZjUQ+IEYnzLfTs=.sha256',
//   branch: '%kRi8MzGDWw2iKNmZak5STshtzJ1D8G/sAj8pa4bVXLI=.sha256',
//   text: 'this is a reply!'
// }, (err, msg) => {
//   console.log('post published');
// });
// pull(node.replicate.upto({live:true}), pull.drain(console.log));
// setInterval(() =>{
//   console.log(_.keys(node.peers).length);
//
// }, 400);
//
// pull(
//   node.replicate.upto(), pull.drain((err, msg) => {
//     console.log(msg);
//   })
// );
// stream all messages for all keypairs.
// pull(
//   node.createLogStream(),
//   pull.drain(function (msg) {
//     if(msg.value.content.root){
//       console.log(msg);
//     }
//   })
// );
// pull(
//   node.threads.public({
//     limit: 2, // how many threads at most
//     reverse: true, // threads sorted from most recent to least recent
//     threadMaxSize: 3, // at most 3 messages in each thread
//   }),
//   pull.drain(thread => {
//     console.log(JSON.stringify(thread));
//     // thread is an object { messages, full } where `messages` is an
//     // array of SSB messages, and full is a boolean indicating whether
//     // `messages` array contains all of the possible messages in the
//     // thread
//   }),
// );
// stream.on('data', function (msg) {
//   console.log(msg.address, msg.toString());
// });
//
// setInterval(function () {
//   stream.write(Buffer.from(JSON.stringify(node.getAddress()), 'utf8'));
// }, 5000);
// Thread (Zeitstamp)
// Zentrales element => weg werfen.
// Alles was
// Tangle? thread.. in SQL.
// Gathering anschauen.
// Alles selbst berechnen
// Manipulation timestime.
// Topologisches Sort. Javascript.
var SsbServer = /** @class */ (function () {
    function SsbServer() {
    }
    SsbServer.prototype.startServer = function () {
        try {
            node.whoami(function (error, feed) {
                console.log(feed);
            });
            // return server;
            return 'hallo';
        }
        catch (e) {
            return 'server is not started';
        }
    };
    return SsbServer;
}());
exports.SsbServer = SsbServer;
//# sourceMappingURL=server.js.map