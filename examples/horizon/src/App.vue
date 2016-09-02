<template>
  <div id="app">
    <p v-if="isLoading">Loading todos...</p>
    <template v-else>
      <h1>Todos</h1>
      <p v-if="errorMessage">
        {{ errorMessage }}
        Are you sure you're connected to the Internet? If so, try refreshing.
      </p>
      <input
        :value="newTodoText"
        @input="setNewTodoText($event.target.value)"
        @keydown.enter="addTodo(newTodoText)"
        placeholder="Add a new todo"
      >
      <ul v-if="todos.length">
        <li v-for="todo in todos">
          {{ todo.text }}
          <button @click="removeTodo(todo)">X</button>
        </li>
      </ul>
      <p v-else>No todos! You're all done... for now.</p>
    </template>
  </div>
</template>

<script>
var Vuex = require('vuex')
var mapState = Vuex.mapState
var mapActions = Vuex.mapActions

module.exports = {
  computed: mapState([
    'isLoading', 'errorMessage', 'newTodoText', 'todos'
  ]),
  methods: mapActions([
    'setNewTodoText', 'addTodo', 'removeTodo'
  ])
}
</script>
