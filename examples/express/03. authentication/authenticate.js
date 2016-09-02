var boom = require('boom')
var bcrypt = require('bcrypt')

var users = {
  'chrisvfritz@gmail.com': {
    id: 1,
    email: 'chrisvfritz@gmail.com',
    username: 'chrisvfritz',
    name: 'Chris Fritz',
    // Hash for "secret"
    password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm'
  }
}

module.exports = function (email, password) {
  return new Promise(function (resolve, reject) {
    var user = users[email]
    if (!user) {
      return reject(boom.unauthorized('Bad email or password'))
    }

    bcrypt.compare(password, user.password, function (error, isValid) {
      if (error || !isValid) {
        return reject(boom.unauthorized('Bad email or password'))
      }
      resolve({ email: email })
    })
  })
}
