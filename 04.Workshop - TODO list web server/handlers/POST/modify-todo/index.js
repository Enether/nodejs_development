let modifyTodo = require('./modify-todo')

module.exports = (req, res, post, todos) => {
  let todoIndex = post['todoIndex']
  if (todoIndex !== undefined) {
      // the user wants to change the state of a TODO (and possibly add a comment about it)
    todoIndex = parseInt(todoIndex)  // convert  it to an int
    modifyTodo(todos, todoIndex, post)
  } else {
    return true
  }
}
