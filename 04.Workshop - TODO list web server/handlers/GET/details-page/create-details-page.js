/* this module creates the HTML page that displays a specific TODO task and it's properties' */
let fs = require('fs')
let detailsPageDir = './handlers/GET/details-page/details-page.html'
// the keys for our todo object
let TODO_TITLE_KEY = 'title'
let TODO_DESCRIPTION_KEY = 'description'
let TODO_STATE_KEY = 'state'
let TODO_INDEX_KEY = 'index'
let TODO_COMMENTS_KEY = 'comments'

function createHTML (todo) {
    // this function creates the html that displays information about a TODO
  let body = ''
  body += '<h1>' + todo[TODO_TITLE_KEY] + '</h1>'
  body += '<p>' + todo[TODO_DESCRIPTION_KEY] + '</p>'

  let stateParagraphText = ''
  let todoState = todo[TODO_STATE_KEY]
  if (todoState === 'pending') {
    stateParagraphText = 'PENDING...'
  } else {
    stateParagraphText = 'DONE'
  }
  body += '<p id="stateParagraph">' + stateParagraphText + '</p>'

  // add an image if there is one
  if (todo.imagePath) {
    body += '<img src="' + todo.imagePath + '" align="left">'
  }

  // add comments if there are any
  let todoComments = todo[TODO_COMMENTS_KEY]
  for (let i in todoComments) {
    let comment = todoComments[i]
    body += '<p>Comment at ' + comment.date + '<br>- ' + comment.comment + '</p>'
  }

  body += '<form id="stateForm" method="POST" action="/" enctype="multipart/form-data">'
  body += '<input type="hidden" name="state" value="pending">'
  body += '<input type="hidden" name="todoIndex" value="' + todo[TODO_INDEX_KEY] + '">'
  body += '<textarea rows="4" cols="50" name="comment">Enter comment here...</textarea>'
  body += '<button type="submit" onclick="changeState();" id="changeStateButton">DONE</button>'
  body += '<script>'
  body += '  function changeState(){'
  body += 'state = document.getElementById("stateParagraph").innerHTML;'
  body += 'if (state === "PENDING...") {'
  body += 'document.getElementById("stateParagraph").innerHTML = "DONE!";'
  body += 'document.getElementById("state").setAttribute("value","done");'
  body += 'document.getElementById("changeStateButton").innerHTML = "Change to pending";'
  body += 'document.getElementById("stateForm").submit();'
  body += '} else {'
  body += 'document.getElementById("stateParagraph").innerHTML = "PENDING...";'
  body += 'document.getElementById("state").setAttribute("value","pending");'
  body += 'document.getElementById("changeStateButton").innerHTML = "DONE";'
  body += 'document.getElementById("stateForm").submit();'
  body += '}'
  body += '}'
  body += '</script>'
  body += '</form>'

  return '<!DOCTYPE html><html><header></header><body>' + body + '</body></html>'
}

function saveHTML (todo) {
  // this function saves the dynamically-created HTML and returns it's path
  let html = createHTML(todo)

  fs.writeFileSync(detailsPageDir, html)

  return detailsPageDir
}

module.exports = saveHTML
