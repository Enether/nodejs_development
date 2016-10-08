/* this module creates the HTML page that displays the total number of our TODO tasks and comments */
let fs = require('fs')
let statsPageDir = './handlers/GET/statistics-page/statistics-page.html'
let TODO_COMMENTS_KEY = 'comments'

function countTodoComments (todos) {
  // this function returns the total number of TODO comments
  let todoCommentsCount = 0

  for (let idx in todos) {
    todoCommentsCount += todos[idx][TODO_COMMENTS_KEY].length
  }

  return todoCommentsCount
}

function createHTML (todos) {
  let body = ''
  body += '<h1>' + 'Total number of TODO tasks added: ' + todos.length + '</h1>'
  body += '<h1>' + 'Total number of TODO comments added: ' + countTodoComments(todos) + '</h1>'

  return '<!DOCTYPE html><html><header></header><body>' + body + '</body></html>'
}

function saveHTML (todos) {
  // this function saves the dynamically-created HTML and returns it's path
  let html = createHTML(todos)

  fs.writeFileSync(statsPageDir, html)

  return statsPageDir
}

module.exports = saveHTML
