/*
Module returns the lsit of all the handlers for us to iterate through
*/
let favicon = require('./favicon')
let homePage = require('./home-page')
let detailsPage = require('./details-page')
let staticFiles = require('./static-files')

module.exports = [
  favicon,
  homePage,
  detailsPage,
  staticFiles
]
