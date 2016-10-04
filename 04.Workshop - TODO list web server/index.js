let http = require('http')
let qs = require('querystring')

let handlers = require('./handlers/handlers')
let port = 1337
let todos = []  // array that will hold our TODO objects

http.createServer((req, res) => {
  if (req.method === 'GET') {
    // iterate through the handlers, when we get to the correct one we break the for loop
    for (let handler of handlers) {
      let toContinue = handler(req, res, todos)
      if (!toContinue) {
        break
      }
    }
  } else if (req.method === 'POST') {
    let body = ''

    req.on('data', (data) => {
      body += data
    })

    req.on('end', () => {
      let post = qs.parse(body)
      let todoTitle = post['todoname']
      let todoDescription = post['tododesc']
      let todoState = 'Pending'
      let todoIndex = todos.length

      if (todoTitle.length === 0 || todoDescription.length === 0) {
        // Invalid data
        res.writeHead(404)
        res.write('The title and description of a TODO cannot be empty!')
        res.end()
        return
      }

      todos[todoIndex] = {'title': todoTitle, 'description': todoDescription, 'state': todoState, 'index': todoIndex}
    })
  }
}).listen(port)
