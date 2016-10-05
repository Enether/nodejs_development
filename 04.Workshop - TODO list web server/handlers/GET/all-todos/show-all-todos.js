/* displays the page of all the todos to the user */
let fs = require('fs')
let createHTMLPage = require('./create-all-todos')

function showPage (res, todos) {
  // show the page to the user
  // create the page and get the path to it
  let pagePath = createHTMLPage(todos)
  // open the html file
  fs.readFile(pagePath, (err, data) => {
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
