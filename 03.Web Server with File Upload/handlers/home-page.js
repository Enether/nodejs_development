/* this module is used to load the homepage */
let fs = require('fs')
let url = require('url')
let indexPagePath = './index.html'

module.exports = (req, res) => {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName === '/') {
    fs.readFile(indexPagePath, (err, data) => {
      if (err) console.log(err.message)

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
