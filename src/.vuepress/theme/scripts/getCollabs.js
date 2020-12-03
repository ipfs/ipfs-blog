const path = require('path')
const fs = require('fs')

const directoryPath = path.join(__dirname, '../../public/images')

function pbcopy(data) {
  const proc = require('child_process').spawn('pbcopy')
  proc.stdin.write(data)
  proc.stdin.end()
}

const collabs = []
let data = ''
const hexStub = (file) => {
  const ext = path.extname(file)
  const fileName = path.basename(file, ext)
  return `
- component: Hexagon
  backgroundImage:
    alt: ${fileName}
    src: /images/${file}
    srcset:
      1x: /images/${file}
      2x: /images/${fileName}@2x${ext}
`
}
fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err)
  }

  files.forEach(function (file) {
    if (/^collab/.test(file)) {
      if (!file.includes('@2x')) {
        collabs.push(file)
      }
    }
  })

  collabs.map((collab) => (data += hexStub(collab)))
  pbcopy(data)
})
