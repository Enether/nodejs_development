let http = require('http')
let handlers = require('./handlers/index')
let qs = require('querystring')
let fs = require('fs')
let downloadImage = require('./download-image')
let port = 1337
let images = {}
let imageCount = 0

let HOMEPAGE_HANDLER_INDEX = 1

http.createServer((req, res) => {
  if (req.method === 'POST') {
    var body = ''

    req.on('data', function (data) {
      body += data

      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) {
        req.connection.destroy()
      }
    })

    req.on('end', function () {
      imageCount++
      let post = qs.parse(body)
      let imageName = post['imagename']
      let imageUrl = post['imageurl']
      let imageIndex = imageCount

      if (imageName.length === 0 || imageUrl.length === 0) {
        // ERROR
        res.writeHead(404)
        res.write('The name and URL of the image cannot be empty.')
        res.end()
        return
      }

      images[imageIndex] = imageName
      downloadImage(imageUrl, imageName, imageIndex)  // download the image
      handlers[HOMEPAGE_HANDLER_INDEX](req, res)  // display the homepage again
    })
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


