/* this module will save the image that has been sent with the TODO task and return the path where it was saved.
How it works is we simply copy the already-created image file in our server's temp folder */
let fs = require('fs')


function copyFile (source, target, cb) {
  // copy the file from the source directory to the target directory
  // in the callback, print out an error
  var cbCalled = false

  var rd = fs.createReadStream(source)
  rd.on('error', (err) => {
    done(err)
  })

  var wr = fs.createWriteStream(target)
  wr.on('error', (err) => {
    done(err)
  })
  wr.on('close', (ex) => {
    done()
  })

  rd.pipe(wr)  // read the file and send it to our target destination

  function done (err) {
    if (!cbCalled) {
      cb(err)
      cbCalled = true
    }
  }
}

function downloadImage (imagePath, todoIndex, todos) {
  let imageDestinationPath = './details/' + todoIndex + '/' + todoIndex + '.jpg'

  copyFile(imagePath, imageDestinationPath, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('File saved successfully to ' + imageDestinationPath)
      todos[todoIndex].imagePath = '/details/' + todoIndex + '/' + todoIndex + '.jpg'  // save the image's path to it's object in our array
    }
  })
}

function saveImage (imagePath, todoIndex, todos) {
  if (!fs.existsSync('./details/' + todoIndex + '/')) {
    fs.mkdirSync('./details/' + todoIndex + '/')  // create such a folder if it doesn't exist
  }
  downloadImage(imagePath, todoIndex, todos)
}

module.exports = saveImage
