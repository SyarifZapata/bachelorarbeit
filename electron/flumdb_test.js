var OffsetLog = require('flumelog-offset');
var codec = require('flumecodec');
var Reduce = require('flumeview-reduce');
var Flume = require('flumedb');
var homedir = require('os').homedir();
const pull = require('pull-stream');

var db = Flume(OffsetLog(homedir+'/flumedb_test/flume_test.json', {codec: codec.json}))
  .use('irgendwas', Reduce(5, function (acc, item) {
    // return (acc || 0) + item.foo;
    return (acc||[]).concat(item)
  }));

// db.irgendwas.get(function (err, value) {
//   if(err) throw err;
//   console.log(value) // 1
// });
//
pull(
  db.irgendwas.stream(), pull.collect((err,msg)=>{
    console.log(msg)
  }));

var values = {};
values[0] = {['jhon']:['irma', 'honey']};
console.log(values);

// db.append({foo: 5, boo: 'cocot'}, (err,sec)=> {
//
//   });
