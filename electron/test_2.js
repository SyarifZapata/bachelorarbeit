const homedir = require('os').homedir();
const fs = require('fs');
const _ = require('lodash');

var path = homedir + '/.syarif-ssb/flume/contacts2.json';
var contact = fs.readFileSync(path);
console.log(_.keys(JSON.parse(contact).value).length);


