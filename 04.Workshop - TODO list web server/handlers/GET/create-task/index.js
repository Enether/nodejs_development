/* this module handles GET requests to the page that lets the user add a TODO */
let url = require('url')
let CREATE_TASK_PATHNAME = '/create'
let showCreateTaskPage = require('./show-create-task-page')

module.exports = (req, res) => {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName === CREATE_TASK_PATHNAME) {
    showCreateTaskPage(res)
  } else {
    return true
  }
}
