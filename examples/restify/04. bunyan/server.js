var restify = require('restify');
var bunyan = require('bunyan');

var server = restify.createServer();
server.on('after', restify.auditLogger({
  log: bunyan.createLogger({
    name: 'bunyan-log',
    stream: process.stdout,
    level: 'info'
  })
}));

server.get('/', function respond(req, res, next) {
  res.send('Hello World!');
  next();
});

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
