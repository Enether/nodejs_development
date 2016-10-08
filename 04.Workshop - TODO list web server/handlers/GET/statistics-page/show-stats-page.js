/* this module shows the dynamically-created statistics page */
let fs = require('fs')
let createHTMLPage = require('./create-stats-page')

function showStatsPage (res, todos) {
  let statsPageDir = createHTMLPage(todos)  // creates the page and returns it's path

  fs.readFile(statsPageDir, (err, data) => {
    if (err) {
      console.log(err)
    }

    res.writeHead(200)
    res.write(data)
    res.end()
  })
}

module.exports = showStatsPage
