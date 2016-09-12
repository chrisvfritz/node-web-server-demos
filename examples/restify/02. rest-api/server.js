var restify = require('restify');
var joi = require('joi');

const validTodoParams = {
  id: joi.number().integer().min(1).required()
};

const server = restify.createServer();
server.use(restify.queryParser({ mapParams: false }));
server.use(restify.bodyParser({ mapParams: false }));

server.get('/todos', function(req, res, next) {
  res.send({ action: 'Show todos' });
  next();
});

server.post('/todos', function(req, res, next) {
  res.send(201, { action: 'Create todo' });
  next();
});

server.get('/todos/:id', function(req, res, next) {
  joi.validate({ id: req.params.id }, validTodoParams, function(err, value) {
    if (err) {
      next(new restify.BadRequestError(err.message));
    } else {
      res.send({
        action: 'Show todo',
        id: req.params.id
      });
      next();
    }
  });
});

server.put('/todos/:id', function(req, res, next) {
  joi.validate({ id: req.params.id }, validTodoParams, function(err, value) {
    if (err) {
      next(new restify.BadRequestError(err.message));
    } else {
      res.send({
        action: 'Update todo',
        id: req.params.id
      });
      next();
    }
  });
});

server.del('/todos/:id', function(req, res, next) {
  joi.validate({ id: req.params.id }, validTodoParams, function(err, value) {
    if (err) {
      next(new restify.BadRequestError(err.message));
    } else {
      res.send({
        action: 'Delete todo',
        id: req.params.id
      });
      next();
    }
  });
});

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
