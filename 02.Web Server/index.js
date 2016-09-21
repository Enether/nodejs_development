let http = require('http')
let handlers = require('./handlers/index')
let port = 1337

http.createServer((req, res) => {
  for (let handler of handlers) {
    let next = handler(req, res)
    if (!next) {
      break
    }
  }
})
.listen(port)
