/* this module handles GET requests to the homepage, effectively displaying our homepage */
let url = require('url')
let HOMEPAGE_PATHNAME = '/'
let showHomePage = require('./show-home-page')

module.exports = (req, res) => {
  req.pathName = req.pathName || url.parse(req.url).pathname
  if (req.pathName === HOMEPAGE_PATHNAME) {
    showHomePage(res)
  } else {
    return true
  }
}
