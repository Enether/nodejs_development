let fs = require('fs')
let url = require('url')

// when the user wants to enter it, we load the HTML
function buildListingHtml (images) {
  var header = ''
  var body = ''

  // create the body
  for (let imageIndex in images) {
    let imageName = images[imageIndex]
    body += '<a href=' + '"/content/images/details/' + imageIndex + '">' + imageName + '</a>\n'
  }
  body += '<button onclick="goBack()">Back</button>\n'
  body += '<script>\n'
  body += 'function goBack() {\n'
  body += '\twindow.history.back();\n'
  body += '}\n'
  body += '</script>\n'

  return '<!DOCTYPE html>' + '<html><header>' + header + '</header><body>' + body + '</body></html>'
};

module.exports = (req, res, images) => {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName === '/details') {
    // build html

    fs.writeFile('./details.html', buildListingHtml(images))

    fs.readFile('./details.html', (err, data) => {
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
