// VENDOR
var Hapi = require('hapi')
var joi = require('joi')

// -------
// PLUGINS
// -------

var plugins = [
  require('hapi-auth-cookie'),
  {
    register: require('yar'),
    options: {
      cookieOptions: {
        password: '3e68db015376eadd84f1d01a780648bcfae1e9f66c8f1fc0bf1197f56daa3519e92c02b548e0828113169f084899327f477a696be1dfa9f033df0bf95959eda1',
        isSecure: process.env.NODE_ENV === 'production'
      }
    }
  }
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(require('hapi-require-https'))
}

// -------------
// SERVER CONFIG
// -------------

var server = new Hapi.Server({
  connections: {
    router: {
      stripTrailingSlash: true
    }
  }
})

// -----------------
// CONNECTION CONFIG
// -----------------

server.connection({ port: 3000 })

// -------------------
// PLUGIN REGISTRATION
// -------------------

server.register(plugins, function () {
  // --------------
  // AUTHENTICATION
  // --------------

  server.auth.strategy('base', 'cookie', {
    password: '3e68db015376eadd84f1d01a780648bcfae1e9f66c8f1fc0bf1197f56daa3519e92c02b548e0828113169f084899327f477a696be1dfa9f033df0bf95959eda1',
    redirectTo: '/login',
    ttl: 24 * 60 * 60 * 1000, // Set session to 1 day
    isSecure: process.env.NODE_ENV === 'production'
  })

  // ------
  // ROUTES
  // ------

  server.route([
    {
      method: 'GET',
      path: '/',
      config: {
        auth: 'base'
      },
      handler: function (request, reply) {
        reply(`
          <h1>Secrets!</h1>
          <p>You have to be logged in to see this.</p>
          <a href="/logout">
            <button>Log out</button>
          </a>
        `)
      }
    }, {
      method: 'GET',
      path: '/login',
      handler: function (request, reply) {
        if (request.auth.isAuthenticated) {
          return reply.redirect('/')
        }
        var message = request.yar.flash('message')[0]
        reply(`
          <p>${message || ''}</p>
          <form action="/login" method="POST">
            <input name="email" placeholder="Email" required>
            <input name="password" type="password" placeholder="Password" required>
            <button type="submit">Log in</button>
          </form>
        `)
      }
    }, {
      method: 'POST',
      path: '/login',
      config: {
        validate: {
          payload: {
            email: joi.string().email().required(),
            password: joi.string().min(4).max(200).required()
          },
          failAction: function (request, reply, source, error) {
            request.yar.flash('message', error.data.details[0].message)
            reply.redirect('/login')
          }
        },
        handler: function (request, reply) {
          require('./authenticate')(
            request.payload.email,
            request.payload.password
          ).then(function (user) {
            request.cookieAuth.set(user)
            reply.redirect('/')
          }).catch(function (error) {
            request.yar.flash('message', error.output.payload.message)
            reply.redirect('/login')
          })
        }
      }
    }, {
      method: ['GET', 'DELETE'],
      path: '/logout',
      config: {
        handler: function (request, reply) {
          request.cookieAuth.clear()
          request.yar.flash('message', 'You have successfully been logged out.')
          reply.redirect('/login')
        }
      }
    }
  ])

  // ------------
  // START SERVER
  // ------------

  server.start(function () {
    console.log('Server running at localhost:' + server.info.port)
  })
})
