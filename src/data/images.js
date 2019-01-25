const fs = require('fs')
const request = require('request')

exports.downloadImage = async function(uri, filename) {
  return new Promise(function(resolve) {
    if (fs.existsSync(filename)) {
      resolve(true)
      return // Don't go any further in execution
    }

    request.head(uri, () => {
      request(uri)
        .pipe(fs.createWriteStream(filename))
        .on('close', () => {
          console.log(`Finished downloading image ${uri}`)
          resolve(true)
        })
    })
  })
}
