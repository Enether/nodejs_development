/* this module routes the GET request to a dynamically-generated statistics page
which shows the total number of todos and comments.
We only route to the page if there is a status header 'My-Authorization' with value 'Admin' */
let url = require('url')

let STATISTICS_PAGE_PATHNAME = '/stats'
let REQUIRED_STATUS_HEADER = 'my-authorization'
let REQUIRED_STATUS_HEADER_VALUE = 'Admin'

let showPage = require('./show-stats-page')

module.exports = (req, res, todos) => {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName === STATISTICS_PAGE_PATHNAME) {
    if (req.headers[REQUIRED_STATUS_HEADER] === REQUIRED_STATUS_HEADER_VALUE) {
      showPage(res, todos)
    } else {
      res.writeHead(404)
      res.write('404 File Not Found')
      res.end()
    }
  } else {
    return true
  }
}
