const homedir = require('os').homedir();
const ssbkeys = require('ssb-keys');
const express = require('express');
const path = require('path');
const http = require('http');
const app = express();


const main_address = 'net:192.168.0.101:9898~shs:/na0uX/HrCF5ylJRO0hKN4yMb8+oBNdoiDfLpJTX4fU=';
const keys = ssbkeys.loadOrCreateSync(homedir + '/.syarif-ssb/secret');

const appKey = Buffer.from('pTkVP2tZ9tVFlaC/8q2CcvJ80xTem++Xy5nStcCZNFs=', 'base64');
console.log(keys);

const port = '3003';
app.set('port', port);

const server = http.createServer(app);

export class SimpleServer {

  startServer(): any{
    try {
      server.listen(port, () => console.log(`Running on localhost:${port}`));
      return 'server Started';
    } catch (e) {
      return 'server is not started';
    }

  }
}



