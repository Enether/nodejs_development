// handler for the page displaying all of our todos
let url = require('url')
let ALL_TODOS_PAGE_PATHNAME = '/all'
let showAllTodosPage = require('./show-all-todos')  // this creates the page and shows it to the user

module.exports = (req, res, todos) => {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName === ALL_TODOS_PAGE_PATHNAME) {
    showAllTodosPage(res, todos)
  } else {
    return true
  }
}
