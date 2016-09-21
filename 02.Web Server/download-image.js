let http = require('http')
let fs = require('fs')
// TODO: https too
function downloadImage (imageUrl, imageName, callback) {
  let file = fs.createWriteStream(imageName)
  let request = http.get(imageUrl, function (response) {
    response.pipe(file)
  })
  callback()
}


module.exports = (imageurl, imagename) => {
  // downloads the image
  downloadImage(imageurl, './images/' + imagename + '.png', function () {
    console.log('Done downloading image ' + imagename)
  })
}
