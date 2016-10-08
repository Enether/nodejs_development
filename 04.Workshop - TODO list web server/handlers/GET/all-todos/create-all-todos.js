/* this module dynamically generates the HTML page of all the TODOs and saves it */
let fs = require('fs')
let ALL_PAGE_DIR = './handlers/GET/all-todos/all-page.html'
// keys for a TODO object's properties
let TODO_TITLE_KEY = 'title'
let TODO_DESCRIPTION_KEY = 'description'
let TODO_STATE_KEY = 'state'
let TODO_INDEX_KEY = 'index'

function compareTODOStates (a, b) {
  // a comparer function for TODO objects
  // first we compare them by their states, and if they're equal -> by their indexes
  // we compare indexes to have the newest TODOs end up on the top (first)
  if (a[TODO_STATE_KEY] < b[TODO_STATE_KEY]) {
    return -1
  }

  if (a[TODO_INDEX_KEY] < b[TODO_INDEX_KEY]) {
    return -1
  } else {
    return 1
  }
}

function createHTML (todos) {
  // todos is an array holding TODO objects with properties title, description, index and state
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
  fs.writeFileSync(ALL_PAGE_DIR, html)
}

module.exports = saveHTML
