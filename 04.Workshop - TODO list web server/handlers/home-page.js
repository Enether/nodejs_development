/* this module handles GET requests to the homepage, effectively displaying our index.html */
let url = require('url')
let fs = require('fs')
let indexPagePath = './index.html'

module.exports = (req, res) => {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName === '/') {
    fs.readFile(indexPagePath, (err, data) => {
      if (err) console.log(err.message)
      // display index.html
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
