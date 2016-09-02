// VENDOR
var path = require('path')
var express = require('express')
var boom = require('express-boom')
var bodyParser = require('body-parser')
var validate = require('celebrate')
var joi = require('joi')
// APP
var app = express()
var apiRouter = express.Router()
// FILES & DIRECTORIES
var frontendDir = path.join(__dirname, 'frontend')
var frontendIndex = path.join(frontendDir, 'index.html')
var staticDir = path.join(frontendDir, 'static')

// -----------
// API PLUGINS
// -----------

apiRouter
  .use(boom())
  .use(bodyParser.json())

// ----------
// API ROUTER
// ----------

apiRouter.route('/todos')
  .get(function (request, response) {
    response.send({ action: 'Show todos' })
  })
  .post(function (request, response) {
    response.send({ action: 'Create todo' })
  })

var validTodoParams = {
  id: joi.number().integer().min(1).required()
}

apiRouter.route('/todos/:id')
  .get(
    validate({
      params: validTodoParams
    }),
    function (request, response) {
      response.send({
        action: 'Show todo with id: ' + request.params.id
      })
    }
  )
  .put(
    validate({
      params: validTodoParams
    }),
    function (request, response) {
      response.send({
        action: 'Update todo with id: ' + request.params.id
      })
    }
  )
  .delete(
    validate({
      params: validTodoParams
    }),
    function (request, response) {
      response.send({
        action: 'Delete todo with id: ' + request.params.id
      })
    }
  )

apiRouter.route('*').all(function (request, response) {
  response.boom.notFound()
})

// --------------
// ROUTE MAPPINGS
// --------------

app
  // API
  .use('/api', apiRouter)
  // STATIC ASSETS
  .use('/static', express.static(staticDir))
  // FRONTEND CLIENT
  .route('*').all(function (request, response) {
    response.sendFile(frontendIndex)
  })

// -------------
// HANDLE ERRORS
// -------------

app.use(function (error, request, response, next) {
  if (error.isJoi) {
    return response.status(400).send(error)
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
