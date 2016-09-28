let url = require('url')
let fs = require('fs')

function pathNameInJSON (json, key) {
    /*
    This function takes the end of an url's pathname' /r3j3F for example and loops through our
    JSON object image-urls.json to see if there is a saved image linked to the given
    pathname.
    image-urls.json's content is as folllows:
    key : path of the image
    '/r3j3F': "./content/images/details/1/1.jpg"
    */

  let keys = Object.keys(json)

  for (let idx in keys) {
    // loop through the keys
    if (keys[idx] === key) return true
  }

  return false
}

module.exports = (req, res, images) => {
  req.pathName = req.pathName || url.parse(req.url).pathname
  // read the file
  let parsedJSON = require('../image-urls.json')
  if (pathNameInJSON(parsedJSON, req.pathName)) {
    // read the file
    let imageDir = parsedJSON[req.pathName]
    let file = fs.readFileSync(imageDir, 'binary')

    res.setHeader('Content-disposition', 'attachment; filename=' + 'brrrrraBeE.jpg')
    res.writeHead(200, {'Content-Type': 'image/jpeg'})
    res.write(file, 'binary')
    res.end()
  } else {
    return true
  }
}
