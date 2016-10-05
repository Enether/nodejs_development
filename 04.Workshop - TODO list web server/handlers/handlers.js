/* this module returns an array of all our handers */
let homePage = require('./home-page/index')
let createTodoPage = require('./create-task/index')
let allTodosPage = require('./all-todos/index')
let todoDetailsPage = require('./details-page/index')
let todoCommentsPage = require('./todo-comments')


module.exports = [
  homePage,
  createTodoPage,
  allTodosPage,
  todoCommentsPage,
  todoDetailsPage
]
