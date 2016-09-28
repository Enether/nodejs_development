let shortid = require('shortid')
let fs = require('fs')

if (!fs.exists('./image-urls.json')) {
  fs.writeFile('./image-urls.json', '{}')
}



function updateJSONFile (imagePath, imageName) {
  // generate unique image url
  let imageUrl = '/' + shortid.generate()

  // read the file
  let parsedJSON = require('./image-urls')

  // update the json
  parsedJSON[imageUrl] = {'path': imagePath, 'name': imageName}
  console.log(imageUrl)
  // save the file
  fs.writeFile('./image-urls.json', JSON.stringify(parsedJSON))
}

module.exports = (imagePath, imageName) => {
  updateJSONFile(imagePath, imageName)
}
