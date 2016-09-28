/* this module handles the request to open an image from content/images/details */
let url = require('url')
let fs = require('fs')
let regexPattern = new RegExp(/\/content\/images\/details\/(\d+)\/\1/)
let imageExtension = '.jpg'

module.exports = (req, res, images) => {
  req.pathName = req.pathName || url.parse(req.url).pathName
  let match = req.pathName.match(regexPattern)

  if (match !== null) {
    // if it's trying to access an image from the details directory
    let dir = '.' + match[0] + imageExtension

    fs.readFile(dir, (err, data) => {
      if (err) {
        console.log(err.message)
      }

      res.writeHead(200)
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
