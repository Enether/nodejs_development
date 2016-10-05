/* this module shows a dynamically-created page for a separate TODO, displaying it's properties */
let fs = require('fs')
let createHTMLPage = require('./create-details-page')  // function that creates the HTML and return it's path'

function showDetailsPage (res, todo) {
  //  create the HTML and get it's path
  let detailsPageDir = createHTMLPage(todo)
  fs.readFile(detailsPageDir, (err, data) => {
    if (err) {
      console.log(err.message)
    }

    res.writeHead(200)
    res.write(data)
    res.end()
  })
}

module.exports = showDetailsPage



