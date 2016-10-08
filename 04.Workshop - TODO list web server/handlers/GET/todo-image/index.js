/* this module routes the GET request to a specific TODO's image
and displays it, althought it does not end the response. This is used when we display the image along with
other information about the TODO */
let url = require('url')
let regexPattern = new RegExp(/\/details\/(\d+)\/\d+.jpg/)

let showImage = require('./display-todo-image')

module.exports = (req, res) => {
  req.pathName = req.pathName || url.parse(req.url).pathname
  let match = req.pathName.match(regexPattern)

  if (match !== null) {
    showImage(res, req.pathName)
  } else {
    return true
  }
}
