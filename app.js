
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

var hserver = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// function decode(buf) {
//   var n = buf.readUInt16LE(0) / 6;
// //  console.log(n);
//   var cs = [];
//   for(var i=0; i<n-1; i++) {
//     var c = {};
//     var r,g,b;

// //xxyyccrrggbb

//     c.x = buf.readUInt16LE(2+i*12);
//     c.y = buf.readUInt16LE(2+i*12 + 2);
//     c.char = String.fromCharCode(buf.readUInt16LE(2+i*12 + 4));

//     r = buf.readUInt16LE(2+i*12 + 6);
//     g = buf.readUInt16LE(2+i*12 + 8);
//     b = buf.readUInt16LE(2+i*12 + 10);

//     c.bg = '#'+(((r & 0x00FF) << 16) | ((g & 0x00FF) << 8) | (b & 0x00FF)).toString(16);
//     c.fg = '#'+(((r & 0xFF00) << 16) | ((g & 0xFF00) << 8) | (b & 0xFF00)).toString(16);

//     cs.push(c);
//   }
//   return cs;
// }



//////////////////////
var BinaryServer = require('binaryjs').BinaryServer;
var sserver = BinaryServer({port: 9000});

function bcast(data) {
  for(var c in sserver.clients) {
    sserver.clients[c].send(data);
  }
}


////////////////////
var net = require('net');
var server = net.createServer(function(c) { //'connection' listener
  console.log('server connected');
  c.on('data', function(d){
   // console.log("DATA", d);
   //console.log(decode(d));
   bcast(d);
  });
  c.on('end', function() {
    console.log('server disconnected');
  });
  //c.write('hello\r\n');
  //c.pipe(c);
});
server.listen(80085, function() { //'listening' listener
  console.log('server bound');
});


