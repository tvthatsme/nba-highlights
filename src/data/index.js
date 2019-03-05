const { getResults } = require('./nba-api.js')
const { getVideos } = require('./youtube-api.js')

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

  return gamesAndHighlights
}
