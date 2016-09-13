var restify = require('restify');

var server = restify.createServer();

server.get('/', function respond(req, res, next) {
  res.send('Hello World!');
  next();
});

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
