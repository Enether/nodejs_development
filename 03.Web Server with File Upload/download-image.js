// this module downloads an image the user has entered
let multiparty = require('multiparty')
let fs = require('fs')
let urlGenerator = require('./generate-unique-image-url')
let imageDirPath = './content/images/'
let detailsDirPath = './content/images/details/'

function getLatestImagesIndex (images) {
  // this method goes through the images object and returns a free index that you can use.
  /*
  ex: the object is {1: img.jpg, 2: img2.jpg, 3: img3.jpg}
  this function will return the next free index, which is 4
   */
  let maxIndex = 0
  let keysArray = Object.keys(images)

  for (let keysArrayIndex in keysArray) {
    let intIndex = parseInt(keysArray[keysArrayIndex])

    if (intIndex > maxIndex) {
      maxIndex = intIndex
    }
  }

  return maxIndex + 1
}

function downloadImage (req, images, imagePath, callback) {
  let form = new multiparty.Form()

  form.parse(req)
  form.on('part', (part) => {
    if (part.filename) {
      let index = getLatestImagesIndex(images)  // the index we're going to store it in the images object
      let file = ''
      part.setEncoding('binary')

      part.on('data', (data) => { file += data })

      part.on('end', () => {  
        // create a separate folder for the jpg
        let fs = require('fs')
        detailsDirPath = './content/images/details/' + index + '/'
        fs.mkdir(detailsDirPath)
        detailsDirPath += index + '.jpg'  // add the image name to get the full path

        fs.writeFile(detailsDirPath, file, 'ascii', (err) => {
          if (err) console.log(err.message)
          else {
            images[index] = part.filename
            urlGenerator(detailsDirPath)
            
          }
        })

        callback(part.filename)
      })
    } else {
      let field = '' // read it like stream
    } })
}

module.exports = (req, images) => {
  // downloads the image
  downloadImage(req, images, imageDirPath, function (name) {
    console.log('Done downloading image "' + name + '"')
  })
}
