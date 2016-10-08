/* this module creates the HTML page that displays a specific TODO task and it's properties' */
let fs = require('fs')
let detailsPageDir = './handlers/GET/details-page/details-page.html'
// the keys for our todo object
let TODO_TITLE_KEY = 'title'
let TODO_DESCRIPTION_KEY = 'description'
let TODO_STATE_KEY = 'state'
let TODO_INDEX_KEY = 'index'
let TODO_COMMENTS_KEY = 'comments'

let PENDING_PARAGRAPH_TEXT = 'PENDING...'
let DONE_PARAGRAPH_TEXT = 'DONE'

function getTodoState (todo) {
  // gets the state of TODO task to be shown on the page
  let stateParagraphText = ''
  let todoState = todo[TODO_STATE_KEY]

  if (todoState === 'pending') {
    stateParagraphText = PENDING_PARAGRAPH_TEXT
  } else {
    stateParagraphText = DONE_PARAGRAPH_TEXT
  }

  return stateParagraphText
}

function createHTML (todo) {
  // this function creates the html that displays information about a TODO
  let body = ''
  // TODO Title and Description
  body += '<h1>' + todo[TODO_TITLE_KEY] + '</h1>'
  body += '<p>' + todo[TODO_DESCRIPTION_KEY] + '</p>'

  // the TODO's state. It is interchangeable
  body += '<p id="stateParagraph"></p>'

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
  // add the TODO's state input, this is read later so that it can be converted to the opposite state once the user wants to change it
  body += '<input type="hidden" name="state" id="state" value="' + todo[TODO_STATE_KEY] + '">'
  // add the TODO's index
  body += '<input type="hidden" name="todoIndex" id="todoIndex" value="' + todo[TODO_INDEX_KEY] + '">'
  // the text area for the ability to add a comment to a TODO
  body += '<textarea rows="4" cols="50" name="comment">Enter comment here...</textarea>'
  // The button that changes the TODO's state and a comment the user has given
  body += '<button type="submit" onclick="changeState();" id="changeStateButton">Change to pending</button>'
  // in-html javascript script to change the displayed state and button text when the state is changed.
  body += '<script>'
  body += 'changeState();'  // call the function on HTML load in case the TODO's state has been previously changed
  body += '  function changeState(){'
  body += 'state = document.getElementById("stateParagraph").innerHTML;'
  body += 'if (state === "PENDING...") {'
  body += 'document.getElementById("stateParagraph").innerHTML = "DONE!";'  // change state paragraph
  body += 'document.getElementById("changeStateButton").innerHTML = "Change to pending";'  // change button text
  body += 'document.getElementById("state").value = "done";'
  body += 'document.getElementById("stateForm").submit();'
  body += '} else {'
  body += 'document.getElementById("stateParagraph").innerHTML = "PENDING...";'  // change state paragraph
  body += 'document.getElementById("changeStateButton").innerHTML = "DONE";'  // change button text
  body += 'document.getElementById("state").value = "pending";'  // change the state's value so that we can read it later in the post request
  body += 'document.getElementById("stateForm").submit();'
  body += '}'
  body += '}'
  body += '</script>'
  // END OF in-html javascript script to change the displayed state and button text when the state is changed.
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
