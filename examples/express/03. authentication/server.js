// VENDOR
var express = require('express')
var validate = require('celebrate')
var joi = require('joi')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var forceSSL = require('express-force-ssl')
// APP
var app = express()

// -------
// PLUGINS
// -------

if (process.env.NODE_ENV === 'production') {
  app.use(forceSSL)
}

app
  .use(require('body-parser').urlencoded({ extended: false }))
  .use(require('cookie-parser')())
  .use(require('express-session')({
    secret: '3e68db015376eadd84f1d01a780648bcfae1e9f66c8f1fc0bf1197f56daa3519e92c02b548e0828113169f084899327f477a696be1dfa9f033df0bf95959eda1',
    resave: false,
    saveUninitialized: false,
    cookies: {
      maxAge: 24 * 60 * 60 * 1000, // Set session to 1 day
      secure: process.env.NODE_ENV === 'production'
    }
  }))
  .use(require('connect-flash')())
  .use(passport.initialize())
  .use(passport.session())

// --------------
// AUTHENTICATION
// --------------

passport.serializeUser(function (user, complete) {
  complete(null, JSON.stringify(user))
})

passport.deserializeUser(function (user, complete) {
  complete(null, JSON.parse(user))
})

passport.use('base', new LocalStrategy({
  usernameField: 'email'
}, function (email, password, complete) {
  require('./authenticate')(email, password)
    .then(function (user) {
      complete(null, user)
    })
    .catch(function (error) {
      complete(null, false, error.output.payload.message)
    })
}))

var requireAuth = function (request, response, next) {
  if (!request.isAuthenticated()) {
    return response.redirect('/login')
  }
  next()
}

// ------
// ROUTES
// ------

app.get('/', requireAuth, function (request, response) {
  response.send(`
    <h1>Secrets!</h1>
    <p>You have to be logged in to see this.</p>
    <a href="/logout">
      <button>Log out</button>
    </a>
  `)
})

app.route('/login')
  .get(function (request, response) {
    if (request.isAuthenticated()) {
      return response.redirect('/')
    }
    var message = (
      request.flash('message')[0] ||
      request.flash('error')[0]
    )
    response.send(`
      <p>${message || ''}</p>
      <form action="/login" method="POST">
        <input name="email" placeholder="Email" required>
        <input name="password" type="password" placeholder="Password" required>
        <button type="submit">Log in</button>
      </form>
    `)
  })
  .post(
    validate({
      body: {
        email: joi.string().email().required(),
        password: joi.string().min(4).max(200).required()
      }
    }),
    passport.authenticate('base', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })
  )

var logoutHandler = function (request, response) {
  request.logout()
  request.flash('message', 'You have successfully been logged out.')
  response.redirect('/login')
}

app.route('/logout')
  .get(logoutHandler)
  .delete(logoutHandler)

// -------------
// HANDLE ERRORS
// -------------

app.use(function (error, request, response, next) {
  if (error.isJoi) {
    request.flash('message', error.details[0].message)
    response.redirect('back')
    return
  }
  response.status(500).send('Something went wrong.')
})

// ------------
// START SERVER
// ------------

app.set('port', 3000)
app.listen(app.get('port'), function () {
  console.log('Server running at localhost:' + app.get('port'))
})
