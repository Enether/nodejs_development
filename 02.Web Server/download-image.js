// this modules downloads an image the user has entered
let http = require('http')
let https = require('https')
let fs = require('fs')
let imageDirPath = './content/images/'
let detailsDirPath = './content/images/details/'
let imageFileExtension = '.jpg'

function downloadImage (imageUrl, imagePath, callback) {
  let image = fs.createWriteStream(imagePath)

  // request for the image
  if (imagePath.startsWith('https')) {
    https.get(imageUrl, function (response) {
      response.pipe(image)
    })
  } else {
    http.get(imageUrl, function (response) {
      response.pipe(image)
    })
  }

  callback()
}

// create the image folder and details if it doesnt exist
fs.stat(imageDirPath, (err, stats) => {
  if (err.code === 'ENOENT') {
    // file does not exist
    fs.mkdirSync(imageDirPath)
    fs.mkdirSync(detailsDirPath)
  } else if (err) {
    console.log(err.message)
  }
})

module.exports = (imageurl, imagename, imageIndex) => {
  // downloads the image
  downloadImage(imageurl, detailsDirPath + imageIndex + imageFileExtension, function () {
    console.log('Done downloading image "' + imagename + '"')
  })
}
