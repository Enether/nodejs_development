/* this module handles GET requests to the homepage, effectively displaying our index.html */
let fs = require('fs')
let indexPagePath = './handlers/create-task/add-todo-task.html'

module.exports = function createTask (res) {
  fs.readFile(indexPagePath, (err, data) => {
    if (err) console.log(err.message)
    // display index.html
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(data)
    res.end()
  })
}


