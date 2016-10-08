let modifyTodo = require('./modify-todo')

module.exports = (req, res, fields, files, todos) => {
  if (fields.todoIndex) {
    // the user wants to change the state of a TODO (and possibly add a comment about it)
    let todoIndex = fields.todoIndex
    todoIndex = parseInt(todoIndex)  // convert  it to an int
    modifyTodo(todos, todoIndex, fields)
  } else {
    return true
  }
}
