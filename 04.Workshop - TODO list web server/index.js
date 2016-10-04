let http = require('http')
let handlers = require('./handlers/handlers')
let port = 1337

http.createServer((req, res) => {
  if (req.method === 'GET') {
    // iterate through the handlers, when we get to the correct one we break the for loop
    for (let handler of handlers) {
      let toContinue = handler(req, res)
      if (!toContinue) {
        break
      }
    }
  }
}).listen(port)
