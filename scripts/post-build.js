// a script to re-organize the dist folder after webpack is done building

const fs = require('fs')
const path = require('path')

const distFolder = path.resolve(__dirname, '../dist')
const demoFolder = path.resolve(__dirname, '../dist/demo')

function moveFile(fileName, source, destination) {
  fs.rename(`${source}/${fileName}`, `${destination}/${fileName}`, err => {
    if (err) throw err
  })
}

// create folders
fs.mkdirSync(demoFolder)
fs.mkdirSync(`${demoFolder}/js`)
fs.mkdirSync(`${demoFolder}/css`)

// move files
moveFile('index.html', distFolder, demoFolder)
moveFile('main.js', distFolder, `${demoFolder}/js`)
moveFile('style.css', distFolder, `${demoFolder}/css`)

// copy vue-ish.js to demo/js
fs.copyFile(`${distFolder}/vue-ish.js`, `${demoFolder}/js/vue-ish.js`, err => {
  if (err) throw err
})
