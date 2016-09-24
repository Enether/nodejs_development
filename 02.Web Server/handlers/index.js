/*
Module returns the lsit of all the handlers for us to iterate through
*/
let favicon = require('./favicon')
let homePage = require('./home-page')
let addImagePage = require('./add-image')
let detailsPage = require('./details-page')
let imageDetail = require('./open-image-details')
let staticFiles = require('./static-files')

module.exports = [
  favicon,
  homePage,
  addImagePage,
  detailsPage,
  imageDetail,
  staticFiles
]
