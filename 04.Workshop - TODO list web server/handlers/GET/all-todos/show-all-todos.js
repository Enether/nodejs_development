/* displays the page of all the todos to the user */
let fs = require('fs')
let createHTMLPage = require('./create-all-todos')
let ALL_PAGE_DIR = './handlers/GET/all-todos/all-page.html'

function showPage (res, todos) {
  // show the page to the user
  // create the page
  createHTMLPage(todos)
  // open the html file
  fs.readFile(ALL_PAGE_DIR, (err, data) => {
    if (err) {
      console.log(err.message)
    }

    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(data)
    res.end()
  })
}

module.exports = showPage
