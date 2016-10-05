// this module displays our homepage to the user
let fs = require('fs')
let homePagePath = './handlers/home-page/index.html'

function showHomePage (res) {
  // display our home page to the user
  fs.readFile(homePagePath, (err, data) => {
    if (err) console.log(err.message)
    // display index.html
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(data)
    res.end()
  })
}

module.exports = showHomePage
