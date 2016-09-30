// this module downloads an image the user has entered
let multiparty = require('multiparty')
let fs = require('fs')
let urlGenerator = require('./generate-unique-image-url')
let imageDirPath = './content/images/'
let detailsDirPath = './content/images/details/'
let isPrivate = false // if we want the file to be accessible by a private URL only

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

function getLatestPrivateImageIndex () {
  /* this function will loop through our current folder and search for the folder with the highest index.
   It will then give us that index + 1 */
  let privateIndex = 1
  detailsDirPath = './content/images/details/'
  while (true) {
    if (fs.existsSync(detailsDirPath + 'private' + privateIndex)) {
      privateIndex++
    } else {
      break
    }
  }

  return privateIndex
}

function downloadImage (req, images, imagePath, callback) {
  let form = new multiparty.Form()

  form.parse(req)
  form.on('part', (part) => {
    if (part.filename) {
      let privateIndex = undefined // will hold the index for private images
      let index = undefined // will hold the index for the public images
      

      let file = ''
      part.setEncoding('binary')
      part.on('data', (data) => { file += data })

      part.on('end', () => {
        // create a separate folder for the jpg
        let fs = require('fs')

        if (isPrivate) {
          // handle a private image
          privateIndex = getLatestPrivateImageIndex()  // the index of a private image,
          // used to differentiate between private images (their folder is privateX where X is the index)

          detailsDirPath = './content/images/details/private' + privateIndex + '/'
        } else {
          // handle a public image
          index = getLatestImagesIndex(images)  // the index we're going to store it in the images object

          detailsDirPath = './content/images/details/' + index + '/'
        }
        fs.mkdir(detailsDirPath)  // create the folder

        detailsDirPath += isPrivate ? privateIndex + '.jpg' : index + '.jpg'  // add the image name to complete the path for saving

        fs.writeFile(detailsDirPath, file, 'ascii', (err) => {
          if (err) console.log(err.message)
          else {
            if (isPrivate) {
              // generate a unique URL for the image
              urlGenerator(detailsDirPath, part.filename)
            } else {
              // save it in the images object, which means it will later be displayed with the other public images
              images[index] = part.filename
            }
            isPrivate = false  // reset the boolean
          }
        })

        callback(part.filename)
      })
    } else if (part.name === 'privateImageCheckBox') {
      isPrivate = true
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
