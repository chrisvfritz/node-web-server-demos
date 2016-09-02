var Hapi = require('Hapi')
var server = new Hapi.Server(3000)

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello World!')
  }
})

server.start(function () {
  console.log('Server running at localhost:' + server.info.port)
})
