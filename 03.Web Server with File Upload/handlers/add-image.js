/* this module opens the add-image page with forms for submitting an image */
let fs = require('fs')
let url = require('url')
let addImagePagePath = './add-image.html'

module.exports = (req, res) => {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName === '/add-image') {
    fs.readFile(addImagePagePath, (err, data) => {
      if (err) {
        console.log(err.message)
      }

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
