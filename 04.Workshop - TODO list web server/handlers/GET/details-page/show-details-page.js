/* this module shows a dynamically-created page for a separate TODO, displaying it's properties */
let fs = require('fs')
let DETAILS_PAGE_DIR = './handlers/GET/details-page/details-page.html'
let createHTMLPage = require('./create-details-page')  // function that creates the HTML

function showDetailsPage (res, todo, reload) {
  // create the HTML
  createHTMLPage(todo, reload)

  fs.readFile(DETAILS_PAGE_DIR, (err, data) => {
    if (err) {
      console.log(err.message)
    }

    res.writeHead(200)
    res.write(data)
    res.end()
  })
}

module.exports = showDetailsPage



