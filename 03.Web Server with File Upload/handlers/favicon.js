let fs = require('fs')
let url = require('url')
let favIconPath = './content/favicon.ico'

module.exports = (req, res) => {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName === '/favicon.ico') {
    fs.readFile(favIconPath, (err, data) => {
      if (err) {
        console.log(err.message)
      }

      res.writeHead(200, {
        'Content-Type': 'image/vnd.microsoft.icon'
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
