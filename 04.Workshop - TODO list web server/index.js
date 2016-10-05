let http = require('http')
let qs = require('querystring')

let getHandlers = require('./handlers/get-handlers')
let postHandlers = require('./handlers/post-handlers')
let port = 1337
let todos = []  // array that will hold our TODO objects


http.createServer((req, res) => {
  if (req.method === 'GET') {
    // iterate through the handlers, when we get to the correct one we break the for loop
    for (let handler of getHandlers) {
      let toContinue = handler(req, res, todos)
      if (!toContinue) {
        break
      }
    }
  } else if (req.method === 'POST') {
    // read and save the data
    let body = ''
    req.on('data', (data) => {
      body += data
    })

    // pass the data around until we reach the correct handler for the data
    req.on('end', () => {
      let post = qs.parse(body)
      for (let handler of postHandlers) {
        let toContinue = handler(res, req, post, todos)
        if (!toContinue) {
          break
        }
      }
    })
  }
}).listen(port)
