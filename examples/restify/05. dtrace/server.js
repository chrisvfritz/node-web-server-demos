var restify = require('restify');

var server = restify.createServer({
  name: 'hello-server'
});

server.use(function bottleneck(req, res, next) {
  setTimeout(function() {
    return next();
  }, Math.random() * 1000);
});

server.get({
  path: '/',
  name: 'index'
}, function greeting(req, res, next) {
  res.send('Hello World!');
  next();
});

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
