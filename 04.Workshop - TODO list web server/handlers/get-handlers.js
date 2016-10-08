/* this module returns an array of all our GET request handlers */
let homePage = require('./GET/home-page/index')
let createTodoPage = require('./GET/create-task/index')
let allTodosPage = require('./GET/all-todos/index')
let todoDetailsPage = require('./GET/details-page/index')
let todoCommentsPage = require('./GET/todo-comments/index')
let todoImage = require('./GET/todo-image/index')
let statsPage = require('./GET/statistics-page/index')

module.exports = [
  statsPage,
  todoImage,
  homePage,
  createTodoPage,
  allTodosPage,
  todoCommentsPage,
  todoDetailsPage
]
