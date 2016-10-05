/* this module returns an array of all our GET request handlers */
let homePage = require('./GET/home-page/index')
let createTodoPage = require('./GET/create-task/index')
let allTodosPage = require('./GET/all-todos/index')
let todoDetailsPage = require('./GET/details-page/index')
let todoCommentsPage = require('./GET/todo-comments')


module.exports = [
  homePage,
  createTodoPage,
  allTodosPage,
  todoCommentsPage,
  todoDetailsPage
]
