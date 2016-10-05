/* this module handles GET requests to the homepage, effectively displaying our index.html */
let url = require('url')
let createTask = require('./create-task')

module.exports = (req, res) => {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName === '/create') {
    createTask(res)
  } else {
    return true
  }
}
