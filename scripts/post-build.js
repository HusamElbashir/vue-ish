const fs = require('fs')
const path = require('path')

// make a copy of the vue-ish bundle at the root of
// the dist folder
fs.copyFile(
  path.resolve(__dirname, '../dist/demo/js/vue-ish.js'),
  path.resolve(__dirname, '../dist/vue-ish.js'),
  err => {
    if (err) throw err
  }
)
