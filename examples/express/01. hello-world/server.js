var express = require('express')
var app = express()

app.get('/', function (request, response) {
  response.send('Hello World!')
})

app.set('port', 3000)
app.listen(app.get('port'), function () {
  console.log('Server running at localhost:' + app.get('port'))
})
