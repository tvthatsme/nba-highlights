const { getResults } = require('./nba-api.js')
const { getVideos } = require('./youtube-api.js')
const { downloadImages } = require('./images.js')

// Define the default path to store thumbnails at
const thumbnailsPath = 'src/images/highlight-thumbnails/'

exports.getNBAHighlights = async function() {
  // Get the game results
  const games = await getResults()

  // Get the YouTube highlights from the games
  const gamesAndHighlights = await Promise.all(
    games.map(async game => {
      // The NBA timestamps have milliseconds but YouTube only wants down to seconds
      const gameEndTime = game.endTimeUTC.split('.')[0] + 'Z'
      const highlights = await getVideos({
        query: game.title,
        publishedAfter: gameEndTime,
      })

      return Object.assign({}, game, {
        highlights,
      })
    })
  )

  // Create an array of the thumbnails we will need to download
  // for gatsby-image later in the build stage.
  const thumbnails = gamesAndHighlights.reduce(
    (thumbnails, game) =>
      thumbnails.concat(
        game.highlights.items.map(highlight => {
          return {
            filename: thumbnailsPath + highlight.id.videoId + '.jpg',
            url: highlight.snippet.thumbnails.medium.url,
          }
        })
      ),
    []
  )

  // Download the thumbnails for the YouTube videos
  await downloadImages(thumbnails)

  return gamesAndHighlights
}
