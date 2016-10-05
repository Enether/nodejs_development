// strangely enough, this module is made to show the comments of a todo on a single page, it generates it's HTML and shows the comments of the corresponding todo
let url = require('url')
let fs = require('fs')
let regexPattern = new RegExp(/\/details\/(\d+)\/comments/)
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

module.exports = (req, res, todos) => {
  req.pathName = req.pathName || url.parse(req.url).pathname
  let match = req.pathName.match(regexPattern)

  if (match !== null) {
    // show the comments
    let todoIndex = parseInt(match[1])
    let commentsPageDir = './details/' + todoIndex + '/' + todoIndex + 'comments.html'
    if (!fs.existsSync('./details/' + todoIndex + '/')) {
      fs.mkdirSync('./details/' + todoIndex + '/')
    }
    fs.writeFileSync(commentsPageDir, createHTML(todos[todoIndex]))
    fs.readFile(commentsPageDir, (err, data) => {
      if (err) {
        console.log(err.message)
      }

      res.writeHead(200)
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
