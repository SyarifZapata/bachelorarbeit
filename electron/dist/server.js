"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var homedir = require('os').homedir();
var Server = require('ssb-server');
var config = require('ssb-config');
var ssbkeys = require('ssb-keys');
var keys = ssbkeys.loadOrCreateSync(homedir + '/.ssb/secret');
Server.use(require('ssb-server/plugins/master'))
    .use(require('ssb-gossip'))
    .use(require('ssb-replicate'))
    .use(require('ssb-backlinks'));
var SsbServer = /** @class */ (function () {
    function SsbServer() {
    }
    SsbServer.prototype.startServer = function () {
        try {
            var server = Server(config);
            var manifest = server.getManifest();
            fs.writeFileSync(path.join(config.path, 'manifest.json'), JSON.stringify(manifest));
            server.whoami(function (error, feed) {
                console.log(feed);
            });
            return 'server is started';
        }
        catch (e) {
            return 'server is not started';
        }
    };
    return SsbServer;
}());
exports.SsbServer = SsbServer;
//# sourceMappingURL=server.js.map