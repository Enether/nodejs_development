/* this module returns an array of all our handers */
let homePage = require('./home-page')
let createTodoPage = require('./create-task')
let allTodosPage = require('./all-todos')
let todoDetailsPage = require('./details-page')

module.exports = [
  homePage,
  createTodoPage,
  allTodosPage,
  todoDetailsPage
]
