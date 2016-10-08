// this module creates the HTML page for our todo-comments page, which shows the comments of a todo
let fs = require('fs')
let TODO_COMMENTS_KEY = 'comments'
let COMMENT_DATE_KEY = 'date'
let COMMENT_COMMENT_KEY = 'comment'

function createHTML (todo) {
  // creates a simple HTML showing the comments on this particular TODO
  let body = ''
  let todoComments = todo[TODO_COMMENTS_KEY]  // array of comment objects

  for (let i in todoComments) {
    let comment = todoComments[i]
    body += '<p>Comment at ' + comment[COMMENT_DATE_KEY] + '<br>- ' + comment[COMMENT_COMMENT_KEY] + '</p>'
  }

  return '<!DOCTYPE html><html><header></header><body>' + body + '</body></html>'
}

function saveHTML (todo, todoIndex) {
  // this module saves the HTML and returns the path to it
  let commentsPageDir = './details/' + todoIndex + '/' + todoIndex + 'comments.html'  // ex: /details/0/0comments.html
  let folderDir = './details' + todoIndex + '/' // the folder we're going to be storing the html file in

  if (!fs.existsSync(folderDir)) {
    fs.mkdirSync(folderDir)
  }
  fs.writeFileSync(commentsPageDir, createHTML(todo))  // save the html file

  return commentsPageDir
}

module.exports = saveHTML
