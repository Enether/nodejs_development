let http = require('http')
let qs = require('querystring')

let handlers = require('./handlers/handlers')
let port = 1337
let todos = []  // array that will hold our TODO objects

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
http.createServer((req, res) => {
  if (req.method === 'GET') {
    // iterate through the handlers, when we get to the correct one we break the for loop
    for (let handler of handlers) {
      let toContinue = handler(req, res, todos)
      if (!toContinue) {
        break
      }
    }
  } else if (req.method === 'POST') {
    let body = ''

    req.on('data', (data) => {
      body += data
    })

    req.on('end', () => {
      let post = qs.parse(body)
      let todoTitle = post['todoname']

      if (todoTitle === undefined) {
        // we're chaning the state of a TODO in the todos array
        let todoIndex = parseInt(post['todoIndex'])
        let comment = post['comment']
        if (comment !== 'Enter comment here...' && comment !== '') {
          // user has posted a comment
          let commentDate = getCurrentDate()
          let commentObject = {'comment': comment, 'date': commentDate}

          todos[todoIndex].comments.push(commentObject)
        }
        // TODO: Move logic to a separate module :)
        // TODO: Reload details page
        todos[todoIndex].state = getOppositeState(todos[todoIndex].state)
      } else {
        // we're adding a TODO
        let todoTitle = post['todoname']
        let todoDescription = post['tododesc']
        let todoState = 'Pending'
        let todoComments = [] // array that will hold separate comment objects
        let todoIndex = todos.length

        if (todoTitle.length === 0 || todoDescription.length === 0) {
        // Invalid data
          res.writeHead(404)
          res.write('The title and description of a TODO cannot be empty!')
          res.end()
          return
        }

        todos[todoIndex] = {'title': todoTitle, 'description': todoDescription, 'state': todoState, 'index': todoIndex, 'comments': todoComments}
        // TODO: REDIRECT
      }
    })
  }
}).listen(port)
