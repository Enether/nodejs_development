/* this module modifies a TODO task, changing it's state and possibly adding a comment to it */
let FIELDS_COMMENT_KEY = 'comment'
let FIELDS_STATE_KEY = 'state'

let reloadPage = require('../../GET/details-page/show-details-page')

function getCurrentDate () {
  // returns the current date as a string
  // ex: 18:36	08/10/2016
  let today = new Date()
  let hh = today.getHours()
  let min = today.getMinutes()
  let dd = today.getDate()
  let mm = today.getMonth() + 1  // January is 0!
  let yyyy = today.getFullYear()

  if (dd < 10) {  // add 0 in front of the day if needed
    dd = '0' + dd
  }

  if (mm < 10) {  // add 0 in front of the month if needed
    mm = '0' + mm
  }

  return hh + ':' + min + '\t' + dd + '/' + mm + '/' + yyyy
}

function getOppositeState (state) {
  if (state === 'pending') {
    return 'done'
  } else {
    return 'pending'
  }
}

function modifyTodo (res, todos, todoIndex, fields) {
  // this function modifies our TODO, changing it's state and possibly adding a comment
  let comment = fields[FIELDS_COMMENT_KEY]
  let state = fields[FIELDS_STATE_KEY][0]
  if (comment !== 'Enter comment here...' && comment !== '') {
    // user has posted a comment
    let commentDate = getCurrentDate()
    let commentObject = {'comment': comment, 'date': commentDate}

    todos[todoIndex].comments.push(commentObject)  // add the comment to the array of comments
    // Reload details page
    reloadPage(res, todos[todoIndex], true)  // true because we want to reload the page
  }
  todos[todoIndex].state = getOppositeState(state)
}

module.exports = modifyTodo
