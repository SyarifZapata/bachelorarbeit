const homedir = require('os').homedir();
const Server = require('ssb-server');
const config = require('ssb-config');
const ssbkeys = require('ssb-keys');

const keys = ssbkeys.loadOrCreateSync(homedir + '/.ssb/secret');
Server.use(require('ssb-server/plugins/master'))
   .use(require('ssb-gossip'))
   .use(require('ssb-replicate'))
   .use(require('ssb-backlinks'));

const server = Server(config);
const manifest = server.getManifest();

// fs.writeFileSync(path.join(config.path, 'manifest.json'), JSON.stringify(manifest));

server.whoami((err, feed) => {
  console.log(feed);
});
