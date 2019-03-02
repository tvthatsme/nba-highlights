const fs = require('fs')
const request = require('request')

/**
 * Download an image to the file system.
 *
 * @param {string} uri - The original image source url.
 * @param {string} filename - The filepath to write the image to.
 */
const downloadImage = async function(uri, filename) {
  return new Promise(function(resolve) {
    // First check if the image has already been stored to the file system.
    // If so, resolve and return.
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

/**
 * Download an array of images to the file system.
 *
 * @param {Object[]} images - The images to download to the file system.
 * @param {string} images[].url - The url to fetch the image from.
 * @param {string} images[].filename - The path and filename to store the image at.
 */
const downloadImages = async function(images) {
  return Promise.all(
    images.map(async image => downloadImage(image.url, image.filename))
  )
}

// Export the public methods
module.exports = {
  downloadImage,
  downloadImages,
}
