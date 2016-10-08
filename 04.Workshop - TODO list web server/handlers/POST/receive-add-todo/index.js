// this module reads the POST request and determines if we've been submitted a TODO.
// We add that TODO to our todos array if so
let addTodo = require('./add-todo')

let FIELDS_TODOTITLE_KEY = 'todoname'

module.exports = (req, res, fields, files, todos) => {
  if (fields[FIELDS_TODOTITLE_KEY]) {
    // we've been sent a TODO, meaning we need to add it
    addTodo(res, todos, fields, files)  // creates a TODO object and adds it to our todos array
  } else {
    return true
  }
}
