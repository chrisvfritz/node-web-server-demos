var Vue = require('vue')
var App = require('./App.vue')
var store = require('./store')

store.dispatch('syncTodos')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  render: function (h) {
    return h(App)
  }
})
