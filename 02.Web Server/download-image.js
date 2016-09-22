// this modules downloads an image the user has entered
let http = require('http')
let fs = require('fs')
let imageDir = './content/images/'
let detailsDir = './content/images/details/'

// TODO: https too
function downloadImage (imageUrl, imageName, callback) {
  let file = fs.createWriteStream(imageName)

  // request for the image
  http.get(imageUrl, function (response) {
    response.pipe(file)
  })
  callback()
}

// create the image folder and details if it doesnt exist
fs.stat(imageDir, (err, stats) => {
  if (err === null) {
    console.log('HANDLE ERROR')
  } else if (err.code === 'ENOENT') {
    // file does not exist
    fs.mkdirSync(imageDir)
    fs.mkdirSync(detailsDir)
  }
})


module.exports = (imageurl, imagename, imageIndex) => {
  // downloads the image
  downloadImage(imageurl, './content/images/details/' + imageIndex + '.jpg', function () {
    console.log('Done downloading image ' + imagename)
  })
}
