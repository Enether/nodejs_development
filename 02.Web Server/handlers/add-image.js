let fs = require('fs')
let url = require('url')

module.exports = (req, res) => {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName === '/add-image') {
    fs.readFile('./add-image.html', (err, data) => {
      if (err) console.log('HANDLE ERROR')

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
