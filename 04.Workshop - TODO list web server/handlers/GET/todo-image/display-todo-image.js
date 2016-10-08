let fs = require('fs')

function showImage (response, imagePath) {
  // this function shows the image by writing it in the response
  fs.readFile('.' + unescape(imagePath), (err, data) => {
    if (err) {
      console.log(err)
      return true
    }

    response.write(data)
  })
}

module.exports = showImage
