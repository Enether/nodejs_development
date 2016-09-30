/* this module handles the generation of unique private image URLs and the storage of that information information
a JSON file, called image-urls.json */

let shortid = require('shortid')
let fs = require('fs')
let imageUrlsPath = './image-urls.json'

if (!fs.existsSync(imageUrlsPath)) {
  fs.writeFile(imageUrlsPath, '{}')
}

function updateJSONFile (imagePath, imageName) {
  // generate unique image url
  let imageUrl = '/' + shortid.generate()

  // read the file
  let parsedJSON = require('./image-urls')

  // update the json
  parsedJSON[imageUrl] = {'path': imagePath, 'name': imageName}
  console.log('The hidden URL of ' + imageName + ' is: ' + imageUrl)
  // save the file
  fs.writeFile('./image-urls.json', JSON.stringify(parsedJSON))
}

module.exports = (imagePath, imageName) => {
  updateJSONFile(imagePath, imageName)
}
