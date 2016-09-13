var restify = require('restify');
var joi = require('joi');
var authenticator = require('./authenticator');

const server = restify.createServer();
server.use(restify.queryParser({ mapParams: false }));
server.use(restify.bodyParser({ mapParams: false }));

server.get('/', function(req, res, next) {
  res.send({ action: 'Hello!'});
  return next();
});

server.post('logins', authenticator.login);

server.get('/todos',
  authenticator.verify,
  function(req, res, next) {
    res.send({ action: 'Show todos' });
    return next();
  });

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
