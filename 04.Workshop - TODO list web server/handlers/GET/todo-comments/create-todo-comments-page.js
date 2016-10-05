// this module creates the HTML page for our todo-comments page, which shows the comments of a todo
let fs = require('fs')
let TODO_COMMENTS_KEY = 'comments'

function createHTML (todo) {
  // creates a simple HTML showing the comments on this particular TODO
  let body = ''
  let todoComments = todo[TODO_COMMENTS_KEY]  // array of comment objects

  for (let i in todoComments) {
    let comment = todoComments[i]
    body += '<p>Comment at ' + comment.date + '<br>- ' + comment.comment + '</p>'
  }

  return '<!DOCTYPE html><html><header></header><body>' + body + '</body></html>'
}

function saveHTML (todo, todoIndex) {
  // this module saves the HTML and returns the path to it
  let commentsPageDir = './details/' + todoIndex + '/' + todoIndex + 'comments.html'
  if (!fs.existsSync('./details/' + todoIndex + '/')) {
    fs.mkdirSync('./details/' + todoIndex + '/')
  }
  fs.writeFileSync(commentsPageDir, createHTML(todo))

  return commentsPageDir
}

module.exports = saveHTML
