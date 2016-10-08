/* this module routes a POST request to modify a TODO task to the modify-todo.js file */
let modifyTodo = require('./modify-todo')
let FIELDS_TODOINDEX_KEY = 'todoIndex'

module.exports = (req, res, fields, files, todos) => {
  if (fields.todoIndex) {
    // the user wants to change the state of a TODO (and possibly add a comment about it)
    let todoIndex = fields[FIELDS_TODOINDEX_KEY]
    todoIndex = parseInt(todoIndex)  // convert  it to an int
    modifyTodo(res, todos, todoIndex, fields)
  } else {
    return true
  }
}
