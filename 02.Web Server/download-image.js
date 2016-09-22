// this modules downloads an image the user has entered
let http = require('http')
let fs = require('fs')
let imageDir = './content/images/'

// TODO: https too
function downloadImage (imageUrl, imageName, callback) {
  let file = fs.createWriteStream(imageName)

  // request for the image
  http.get(imageUrl, function (response) {
    response.pipe(file)
  })
  callback()
}

// create the image folder if it doesnt exist
if (!fs.lstatSync(imageDir)) {
  fs.mkdirSync(imageDir)
}


module.exports = (imageurl, imagename) => {
  // downloads the image
  downloadImage(imageurl, './content/images/' + imagename + '.jpg', function () {
    console.log('Done downloading image ' + imagename)
  })
}
