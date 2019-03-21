"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var homedir = require('os').homedir();
var ssbkeys = require('ssb-keys');
var express = require('express');
var path = require('path');
var http = require('http');
var app = express();
var main_address = 'net:192.168.0.101:9898~shs:/na0uX/HrCF5ylJRO0hKN4yMb8+oBNdoiDfLpJTX4fU=';
var keys = ssbkeys.loadOrCreateSync(homedir + '/.syarif-ssb/secret');
var appKey = Buffer.from('pTkVP2tZ9tVFlaC/8q2CcvJ80xTem++Xy5nStcCZNFs=', 'base64');
console.log(keys);
var port = '3003';
app.set('port', port);
var server = http.createServer(app);
var SimpleServer = /** @class */ (function () {
    function SimpleServer() {
    }
    SimpleServer.prototype.startServer = function () {
        try {
            server.listen(port, function () { return console.log("Running on localhost:" + port); });
            return 'server Started';
        }
        catch (e) {
            return 'server is not started';
        }
    };
    return SimpleServer;
}());
exports.SimpleServer = SimpleServer;
//# sourceMappingURL=simple-server.js.map