let http = require('http')
let handlers = require('./handlers/index')
let downloadImage = require('./download-image')

let port = 1337
let images = {}  // object that holds all the images we've downloaded, like this: 'imageIndex: imageName' => '1: Cat'
let HOMEPAGE_HANDLER_INDEX = 3  // the index of the homepage handler in the handler array

http.createServer((req, res) => {
  if (req.method === 'POST') {
    downloadImage(req, images)
    req.on('end', () => {
      // redirect to the homepage once the user sends the file
      req.pathName = '/'
      handlers[HOMEPAGE_HANDLER_INDEX](req, res) /* redirect to the home page */
    })
  } else if (req.method === 'GET') {
    // loop through the handlers and get to the one that will process the request
    for (let handler of handlers) {
      let next = handler(req, res, images)
      if (!next) {
        break
      }
    }
  }
})
.listen(port)


