function getCurrentDate () {
  // returns the current date as a string
  let today = new Date()
  let hh = today.getHours()
  let min = today.getMinutes()
  let dd = today.getDate()
  let mm = today.getMonth() + 1  // January is 0!
  let yyyy = today.getFullYear()

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
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

function modifyTodo (todos, todoIndex, fields) {
  // this function modifies our TODO, changing it's state and possibly adding a comment
  let comment = fields['comment']
  let state = fields['state'][0]
  if (comment !== 'Enter comment here...' && comment !== '') {
    // user has posted a comment
    let commentDate = getCurrentDate()
    let commentObject = {'comment': comment, 'date': commentDate}

    todos[todoIndex].comments.push(commentObject)
  }
  // TODO: Reload details page
  todos[todoIndex].state = getOppositeState(state)
}

module.exports = modifyTodo
