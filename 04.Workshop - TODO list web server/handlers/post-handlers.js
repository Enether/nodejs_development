/* this module returns an array of all our POST request handlers */
let receiveAddTodo = require('./POST/receive-add-todo/index')
let modifyTodo = require('./POST/modify-todo/index')

module.exports =
[
  receiveAddTodo,
  modifyTodo
]

