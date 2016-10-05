// this module reads the POST request and determines if we've been submitted a TODO.
// We add that TODO to our todos array if so
let addTodo = require('./add-todo')

module.exports = (res, req, post, todos) => {
  let todoTitle = post['todoname']

  if (todoTitle !== undefined) {
    // we've been sent a TODO, meaning we need to add it
    addTodo(res, todos, post)  // creates a TODO object and adds it to our todos array
  } else {
    return true
  }
}
