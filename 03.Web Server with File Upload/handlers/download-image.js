/* this module handles the download of private images through their unique hidden URL.
   image-urls.json holds information about secret URLs and their corresponding path */
let url = require('url')
let fs = require('fs')
let zlib = require('zlib')
let gzip = zlib.createGzip()

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

function gzipFile (fileDir) {
  let gzipFileDir = fileDir + '.gz'
  // create the streams
  let readStream = fs.createReadStream(fileDir)
  let writeStream = fs.createWriteStream(gzipFileDir)

  // read the file and create a gzip version of it
  readStream.pipe(gzip).pipe(writeStream)

  // read the gzipped file
  let gzippedFile = fs.readFileSync(gzipFileDir, 'binary')

  // delete the gzipped file, because it's no longer needed on the filesystem
  fs.unlink(gzipFileDir, () => { console.log('deleted file at ' + gzipFileDir) })

  return gzippedFile
}

module.exports = (req, res, images) => {
  req.pathName = req.pathName || url.parse(req.url).pathname
  // load the json holding information about private image URLs
  let parsedJSON = require('../image-urls.json')

  if (pathNameInJSON(parsedJSON, req.pathName)) {
    // read the file
    let imageDir = parsedJSON[req.pathName].path
    // convert it to gzip
    let gzippedImage = gzipFile(imageDir)

    res.setHeader('Content-disposition', 'attachment; filename=' + parsedJSON[req.pathName].name)
    res.writeHead(200, {'Content-Type': 'image/jpeg', 'Content-Encoding': 'gzip'})
    res.write(gzippedImage, 'binary')
    res.end()
  } else {
    return true
  }
}
