var Vue = require('vue')
var Vuex = require('vuex')

/* global Horizon */
var db = Horizon({ host: 'localhost:8181' })
var dbTodos = db('todos')

Vue.use(Vuex)

module.exports = new Vuex.Store({
  state: {
    todos: [],
    newTodoText: '',
    errorMessage: '',
    isLoading: true
  },
  actions: {
    syncTodos: function (store) {
      dbTodos.watch().subscribe(
        function (todos) {
          store.commit('SET_TODOS', todos)
          store.commit('SET_ERROR_MESSAGE', '')
          store.commit('SET_IS_LOADING', false)
        },
        function () {
          store.commit('SET_ERROR_MESSAGE', 'Could not sync todos.')
        }
      )
    },
    setNewTodoText: function (store, newTodoText) {
      store.commit('SET_NEW_TODO_TEXT', newTodoText)
    },
    addTodo: function (store, newTodoText) {
      var newTodo = { text: newTodoText }
      dbTodos.store(newTodo).subscribe(
        function () {
          store.commit('SET_NEW_TODO_TEXT', '')
          store.commit('SET_ERROR_MESSAGE', '')
        },
        function () {
          store.commit('SET_ERROR_MESSAGE', 'Could not save todo.')
        }
      )
    },
    removeTodo: function (store, todo) {
      dbTodos.remove(todo.id).subscribe(
        function () {
          store.commit('SET_ERROR_MESSAGE', '')
        },
        function () {
          store.commit('SET_ERROR_MESSAGE', 'Could not delete todo.')
        }
      )
    }
  },
  mutations: {
    SET_TODOS: function (state, newTodos) {
      state.todos = newTodos
    },
    SET_NEW_TODO_TEXT: function (state, text) {
      state.newTodoText = text
    },
    SET_ERROR_MESSAGE: function (state, text) {
      state.errorMessage = text
    },
    SET_IS_LOADING: function (state, newIsLoading) {
      state.isLoading = newIsLoading
    }
  }
})
