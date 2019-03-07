var OffsetLog = require('flumelog-offset');
var codec = require('flumecodec');
var Reduce = require('flumeview-reduce');
var Flume = require('flumedb');
var homedir = require('os').homedir();
const pull = require('pull-stream');
const toStream = require('pull-stream-to-stream');


var x = 1000000;
var count = 0;
console.time('indexing');

// var db = Flume(OffsetLog(homedir+'/flumedb_test/flume_test.json', {codec: codec.json}))
//   .use('irgendwas', Reduce(5, function (acc, item) {
//     count ++;
//     var result = (acc||[]).concat(item);
//     if(count === x){
//       console.log(count);
//       console.timeEnd('indexing')
//     }
//
//     return result;
//   }));

var db = Flume(OffsetLog(homedir+'/flumedb_test/LOG', {codec: codec.json}));
  // .use('irgendwas', Reduce(5, function (acc, item) {
  //   count ++;
  //   var result = (acc||0) + item.foo;
  //   if(count === x){
  //     console.log(count);
  //     console.timeEnd('indexing')
  //   }
  //
  //   return result;
  // }));


// db.irgendwas.get(function (err, value) {
//   if(err) throw err;
//   console.log(value) // 1
// });

// pull(
//   db.irgendwas.stream(), pull.collect((err,msg)=>{
//     console.log(msg)
//   }));


// for(var i = 1; i<x+1; i++){
//   db.append({foo: 5, content: {text: 'hallo', number: 13}}, (err,sec)=> {
//
//   });
// }

// db.append({foo: 7, content: {text: 'end', number: 13}}, (err,sec)=> {
//
//   });


// stream read from top of the file to bottom.
// stream = toStream.source(db.stream());
//
// console.time('nodeStream');
// stream.on('data', (chunk) =>{
//   count++;
//   if(count%100000===0){
//     console.log(count)
//   }
// });
// stream.on('end', ()=>{
//   console.log('there will be no more data');
//   console.log(count);
//   console.timeEnd('nodeStream')
// });

console.time('pulling');
pull(
  db.stream({}),
  pull.drain(function (data) {
        count++;
        if(count===5000000){
          console.timeEnd('pulling');
        }

  })
  // pull.collect((err,msgs)=>{
  //   msgs.forEach((msg)=>{
  //     count++;
  //     if(count===5000000){
  //       console.timeEnd('pulling');
  //     }
  //   })
  // })
);


