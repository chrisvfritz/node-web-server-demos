// VENDOR
var path = require('path')
var Hapi = require('hapi')
var boom = require('boom')
var joi = require('joi')
// APP
var plugins = [
  require('inert')
]

// -------------
// SERVER CONFIG
// -------------

var server = new Hapi.Server({
  connections: {
    router: {
      stripTrailingSlash: true
    },
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'frontend')
      }
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
  // ----------
  // API ROUTES
  // ----------

  var validTodoParams = {
    id: joi.number().integer().min(1).required()
  }

  var apiRoutes = [
    {
      method: 'GET',
      path: '/todos',
      handler: function (request, reply) {
        reply({ action: 'Show todos' })
      }
    }, {
      method: 'POST',
      path: '/todos',
      handler: function (request, reply) {
        reply({ action: 'Create todo' })
      }
    }, {
      method: 'GET',
      path: '/todos/{id}',
      config: {
        validate: {
          params: validTodoParams
        }
      },
      handler: function (request, reply) {
        reply({
          action: 'Show todo with id: ' + request.params.id
        })
      }
    }, {
      method: 'PUT',
      path: '/todos/{id}',
      config: {
        validate: {
          params: validTodoParams
        }
      },
      handler: function (request, reply) {
        reply({
          action: 'Update todo with id: ' + request.params.id
        })
      }
    }, {
      method: 'DELETE',
      path: '/todos/{id}',
      config: {
        validate: {
          params: validTodoParams
        }
      },
      handler: function (request, reply) {
        reply({
          action: 'Delete todo with id: ' + request.params.id
        })
      }
    }, {
      method: '*',
      path: '/{route*}',
      handler: function (request, reply) {
        reply(boom.notFound())
      }
    }
  ]

  server.route(
    apiRoutes.map(function (route) {
      return Object.assign(route, {
        // Prefix API routes with '/api'
        path: '/api' + route.path
      })
    })
  )

  // -------------
  // STATIC ROUTES
  // -------------

  // STATIC ASSETS
  server.route({
    method: 'GET',
    path: '/static/{file*}',
    handler: {
      directory: {
        path: 'static'
      }
    }
  })

  // FRONTEND CLIENT
  server.route({
    method: '*',
    path: '/{route*}',
    handler: {
      file: 'index.html'
    }
  })

  // ------------
  // START SERVER
  // ------------

  server.start(function () {
    console.log('Server running at localhost:' + server.info.port)
  })
})
