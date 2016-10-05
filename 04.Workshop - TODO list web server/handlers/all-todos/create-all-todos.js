/* this module dynamically generates the HTML page of all the TODOs and saves it */
let fs = require('fs')

let TODO_TITLE_KEY = 'title'
let TODO_DESCRIPTION_KEY = 'description'
let TODO_STATE_KEY = 'state'
let TODO_INDEX_KEY = 'index'
let allPagePath = './handlers/all-todos/all-page.html'

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
    body += '<h2><a href=' + '"details/' + todoID + '">' + todoTitle + '</a></h2>'
    body += '<ul>'
    body += '<li>' + todoDesc + '</li>'
    body += '<li>' + todoState + '</li>'
    body += '</ul>'
  }

  return '<!DOCTYPE html><html><header></header><body>' + body + '</body></html>'
}

function saveHTML (todos) {
  // function creates the HTML page and saves it to the filesystem
  let html = createHTML(todos)
  // create the html file
  fs.writeFileSync(allPagePath, html)

  // return the path we saved it to
  return allPagePath
}

module.exports = saveHTML
