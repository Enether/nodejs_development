let http = require('http')
let multiparty = require('multiparty')
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
    let form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
      if (err) console.log(err)
      for (let handler of postHandlers) {
        let toContinue = handler(res, req, fields, files, todos)
        if (!toContinue) {
          break
        }
      }
    })

    // pass the data around until we reach the correct handler for the data
    req.on('end', () => {
      console.log('request has ended')
    })
  }
}).listen(port)
