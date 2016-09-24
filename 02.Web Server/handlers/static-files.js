/* this module opens .css/.js/.jpg/.html static files from the content subfolder */
let fs = require('fs')
let url = require('url')

function getContentType (url) {
  // returns the content type of the given url
  let contentType = ''

  if (url.endsWith('.css')) {
    contentType = 'text/css'
  } else if (url.endsWith('.js')) {
    contentType = 'application/javascript'
  } else {
    contentType = 'text/plain'
  }

  return contentType
}

function fileIsStatic (url) {
  // we serve only .html, .css, .js and .jpg files.
  // if the request wants something other than those, do not serve it from this handler
  if (url.endsWith('.css') ||
      url.endsWith('.js') ||
      url.endsWith('.jpg') ||
      url.endsWith('.html')) {
    return true
  }

  return false
}

function fileIsFromContent (url) {
  // return a boolean indicating if the url is trying to access the content folder
  return url.startsWith('/content/')
}

module.exports = (req, res) => {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (fileIsStatic(req.pathName) && fileIsFromContent(req.pathName)) {
    fs.readFile('.' + unescape(req.pathName), (err, data) => {
      if (err) {
        res.writeHead(404)
        res.write('404 Not Found')
        res.end()
        return true
      }

      let contentType = getContentType(req.pathName)

      res.writeHead(200, {
        'Content-Type': contentType
      })
      res.write(data)
      res.end()
    })
  } else {  // if it's not a static file'
    return true
  }
}
