/* this module dynamically generates HTML of all the TODOs and displays that page to the user */
let fs = require('fs')
let url = require('url')
let allPagePath = './all-page.html'
let TODO_TITLE_KEY = 'title'
let TODO_DESCRIPTION_KEY = 'description'
let TODO_STATE_KEY = 'state'
let TODO_INDEX_KEY = 'index'

function compareTODOStates (a, b) {
  if (a.state < b.state) {
    return -1
  }
  if (a.last_nom > b.last_nom) {
    return 1
  }

  if (a.index < b.index) {
    return -1
  } else {
    return 1
  }
}


function createHTML (todos) {
  // todos is an object holding TODO objects with properties title, description, index and state
  // this function creates an HTML page with all of our todos
  let body = ''
  todos.sort(compareTODOStates)  // sorts them by their state and index(index acts as a date)
  // create the body
  for (let todoIndex in todos) {
    let todo = todos[todoIndex]
    let todoTitle = todo[TODO_TITLE_KEY]
    let todoDesc = todo[TODO_DESCRIPTION_KEY]
    let todoState = todo[TODO_STATE_KEY]
    let todoID = todo[TODO_INDEX_KEY]
/*
<h2><a href="brr">An unordered HTML list</a></h2>
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul> */
    body += '<h2><a href=' + '"details/' + todoID + '">' + todoTitle + '</a></h2>'
    body += '<ul>'
    body += '<li>' + todoDesc + '</li>'
    body += '<li>' + todoState + '</li>'
    body += '</ul>'
  }

  return '<!DOCTYPE html><html><header></header><body>' + body + '</body></html>'
}

module.exports = (req, res, todos) => {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName === '/all') {
    // create the html file
    fs.writeFileSync(allPagePath, createHTML(todos))

    // open the html file
    fs.readFile(allPagePath, (err, data) => {
      if (err) {
        console.log(err.message)
      }

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
