const { getResults } = require('./nba-api.js')
const { getVideos } = require('./youtube-api.js')
const { downloadImage } = require('./images.js')

const thumbnailsPath = 'src/images/highlight-thumbnails/'

function downloadThumbnails(gamesAndHighlights) {
  const thumbnails = gamesAndHighlights
    .reduce(
      (thumbnails, game) =>
        thumbnails.concat(
          game.highlights.items.map(highlight => {
            return {
              filename: highlight.id.videoId,
              url: highlight.snippet.thumbnails.medium.url,
            }
          })
        ),
      []
    )
    .filter(
      (obj, pos, arr) =>
        arr.map(mapObj => mapObj['filename']).indexOf(obj['filename']) === pos
    )

  return Promise.all(
    thumbnails.map(async thumbnail =>
      downloadImage(thumbnail.url, `${thumbnailsPath}${thumbnail.filename}.jpg`)
    )
  )
}

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

  // Download the thumbnails for the YouTube videos
  await downloadThumbnails(gamesAndHighlights)

  return gamesAndHighlights
}
