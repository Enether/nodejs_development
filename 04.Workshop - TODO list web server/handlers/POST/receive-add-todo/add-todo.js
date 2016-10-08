// this module creates a TODO object and adds it to our globally-used todos array of TODO objects
function addTodo (res, todos, fields) {
  let todoTitle = fields['todoname']
  let todoDescription = fields['tododesc']
  let todoState = 'Pending'
  let todoComments = [] // array that will hold separate comment objects
  let todoIndex = todos.length

  if (todoTitle.length === 0 || todoDescription.length === 0) {
    // Invalid data
    res.writeHead(404)
    res.write('The title and description of a TODO cannot be empty!')
    res.end()
    return
  }

  todos[todoIndex] = {'title': todoTitle, 'description': todoDescription, 'state': todoState, 'index': todoIndex, 'comments': todoComments}
  // TODO: REDIRECT
}

module.exports = addTodo
