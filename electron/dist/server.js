"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var homedir = require('os').homedir();
// const Server = require('ssb-server');
// const config = require('ssb-config');
var ssbkeys = require('ssb-keys');
var createStream = require('broadcast-stream');
var keys = ssbkeys.loadOrCreateSync(homedir + '/.ssb/secret');
var stream = createStream(8008);
stream.on('data', function (msg) {
    console.log(msg.address, ':', msg.port, msg.toString());
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
var SsbServer = /** @class */ (function () {
    function SsbServer() {
    }
    SsbServer.prototype.startServer = function () {
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
        }
        catch (e) {
            return 'server is not started';
        }
    };
    return SsbServer;
}());
exports.SsbServer = SsbServer;
//# sourceMappingURL=server.js.map