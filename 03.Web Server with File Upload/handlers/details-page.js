/* this module creates the details.html page and handles the request to it */
let fs = require('fs')
let url = require('url')
let detailsPagePath = './details.html'

// when the user wants to enter it, we load the HTML
function buildListingHtml (images) {
  let body = ''

  // create the body
  for (let imageIndex in images) {
    let imageName = images[imageIndex]
    body += '<a href=' + '"/content/images/details/' + imageIndex + '/' + imageIndex + '">' + imageName + '</a>'
  }
  body += buildBackButtonHtml()

  return '<!DOCTYPE html><html><header></header><body>' + body + '</body></html>'
};

function buildBackButtonHtml () {
  // returns the html + js for a functioning back button
  return '<button onclick="goBack()">Back</button><script>function goBack() {window.history.back();}</script>'
}

module.exports = (req, res, images) => {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName === '/details') {
    // create the html file
    fs.writeFileSync(detailsPagePath, buildListingHtml(images))

    // open the html file
    fs.readFile(detailsPagePath, (err, data) => {
      if (err) {
        console.log(err.message)
      }

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
