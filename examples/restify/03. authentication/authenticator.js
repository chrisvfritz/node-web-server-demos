var restify = require('restify');
var jwt = require('jsonwebtoken');

var secret = 'TooManySecrets';

var users = {
  'erik.gillespie@gmail.com': {
    id: 2,
    email: 'erik.gillespie@gmail.com',
    name: 'Erik Gillespie',
    password: '1234'
  }
};

module.exports = {
  login: function(req, res, next) {
    if (!req.body['email'] || !req.body['password']) {
      return next(new restify.UnauthorizedError({ message: 'Invalid credentials' }));
    }
    
    var user = users[req.body['email']];
    if (!user || user.password !== req.body['password']) {
      return next(new restify.UnauthorizedError({ message: 'Invalid credentials' }));
    }

    var now = Date.now();
    var token = {
      sub: user.id,
      iat: now,
      exp: now + 7 * 24 * 60 * 60 * 1000, // 7 days
      jti: '' + Math.random(),
      name: user.name,
      email: user.email
    };

    res.header('Authorization', 'Bearer ' + jwt.sign(token, secret));
    res.send(200, { message: 'Logged in' });
    return next();
  },

  verify: function(req, res, next) {
    if (!req.headers.authorization) {
      return next(new restify.UnauthorizedError({ message: 'Invalid token' }));
    }
    
    var auth = req.headers.authorization.split(' ');
    if (auth[0] !== 'Bearer' || !auth[1]) {
      return next(new restify.UnauthorizedError({ message: 'Invalid token' }));
    }
    
    jwt.verify(auth[1], secret, function(err, decoded) {
      if (err) {
        return next(new restify.UnauthorizedError({ message: 'Invalid token' }));
      }
      return next();
    });
  }
};
