/* if we get a header with a name StatusHeader and it's value - Full
   we show an html file with the number of images we've downloaded'  */
let fs = require('fs')
let url = require('url')
let statusFileDir = './status.html'

// generate the HTML
function buildStatusHtml (imagesCount) {
  return '<!DOCTYPE html><html><header><h1>' +
  'The total number of saved images: ' + imagesCount +
  '</h1></header><body></body></html>'
}

module.exports = (req, res, images) => {
  req.pathName = req.pathName || url.parse(req.url).pathName

  if (req.headers['StatusHeader'] === 'Full') {
    fs.writeFile('./status.html', buildStatusHtml(Object.keys(images).length))

    fs.readFile(statusFileDir, (err, data) => {
      if (err) console.log(err.code)

      res.writeHead(200)
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
