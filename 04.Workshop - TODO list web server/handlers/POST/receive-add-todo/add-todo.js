// this module creates a TODO object and adds it to our globally-used todos array of TODO objects
let saveImage = require('./save-image')

function addTodo (res, todos, fields, files) {
  let todoTitle = fields['todoname']
  let todoDescription = fields['tododesc']
  let todoState = 'Pending'
  let todoComments = [] // array that will hold separate comment objects
  let todoIndex = todos.length
  let imagePath = ''
  let image = files.image[0]  // a object holding the file's information. If there is no file, the originalFilename will be ''

  if (todoTitle.length === 0 || todoDescription.length === 0) {
    // Invalid data
    res.writeHead(404)
    res.write('The title and description of a TODO cannot be empty!')
    res.end()
    return
  }
  if (image.originalFilename) {  // if there is a file, save it
    console.log(image.path)
    saveImage(image.path, todoIndex, todos)
  }
  todos[todoIndex] = {'title': todoTitle, 'description': todoDescription, 'state': todoState, 'index': todoIndex, 'comments': todoComments, 'imagePath': imagePath}
  // TODO: REDIRECT
}

module.exports = addTodo
