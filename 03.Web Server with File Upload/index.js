let http = require('http')
let handlers = require('./handlers/index')
let downloadImage = require('./download-image')
let port = 1337
let images = {}  // object that holds all the images we've downloaded, like this: 'imageIndex: imageName' => '1: Cat'
let HOMEPAGE_HANDLER_INDEX = 2  // the index of the homepage handler in the handler array

http.createServer((req, res) => {
  if (req.method === 'POST') {
    downloadImage(req, images)
    res.end()
    res.on('end', () => { handlers[HOMEPAGE_HANDLER_INDEX](req, res) /* redirect to the home page */ })
  } else if (req.method === 'GET') {
    for (let handler of handlers) {
      let next = handler(req, res, images)
      if (!next) {
        break
      }
    }
  }
})
.listen(port)


