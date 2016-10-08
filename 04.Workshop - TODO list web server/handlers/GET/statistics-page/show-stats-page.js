/* this module shows the dynamically-created statistics page */
let fs = require('fs')

let STATS_PAGE_DIR = './handlers/GET/statistics-page/statistics-page.html'
let createHTMLPage = require('./create-stats-page')

function showStatsPage (res, todos) {
  createHTMLPage(todos)  // creates the page

  fs.readFile(STATS_PAGE_DIR, (err, data) => {
    if (err) {
      console.log(err)
    }

    res.writeHead(200)
    res.write(data)
    res.end()
  })
}

module.exports = showStatsPage
