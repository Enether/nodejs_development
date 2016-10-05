/* this module routes the GET request to a specific TODO's comments
because the URL is a bit more complex, we use regex to parse and validate it */
let url = require('url')
let regexPattern = new RegExp(/\/details\/(\d+)\/comments/)
let showCommentsPage = require('./show-todo-comments')
module.exports = (req, res, todos) => {
  req.pathName = req.pathName || url.parse(req.url).pathname
  let match = req.pathName.match(regexPattern)

  if (match !== null) {
    let todoIndex = parseInt(match[1]) // parse the index from our URL
    showCommentsPage(res, todos[todoIndex], todoIndex)
  } else {
    return true
  }
}
