/* this module shows (and creates) the details page for a specific TODO.
We use REGEX to validate the URL pathname ex: "/details/3/" where 3 is variable */
let url = require('url')
let regexPattern = new RegExp(/\/details\/(\d+)/)
let showPage = require('./show-details-page')

module.exports = (req, res, todos) => {
  req.pathName = req.pathName || url.parse(req.url).pathname
  let match = req.pathName.match(regexPattern)

  if (match !== null) {
    // if it's trying to access an image from the details directory
    let todoIndex = parseInt(match[1])  // get the index from the URL
    let specificTodo = todos[todoIndex]  // TODO object we'll be showing

    showPage(res, specificTodo)
  } else {
    return true
  }
}

