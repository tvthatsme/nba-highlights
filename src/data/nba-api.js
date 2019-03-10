const axios = require('axios')
const subDays = require('date-fns/sub_days')
const format = require('date-fns/format')

// Define the endpoint for obtaining nba data
const nbaEndpoint = 'http://data.nba.net/10s/prod/v1/'

/**
 * Get the last valid scoreboard, recursively if needed
 *
 * @param {Date} date - Date object to get scoreboard from
 */
const getLastScoreboard = async function(date) {
  const formattedDate = format(date, 'YYYYMMDD')
  const url = `${nbaEndpoint}${formattedDate}/scoreboard.json`
  try {
    const result = await axios.get(url)
    if (result.data && result.data.numGames > 0) {
      console.log('Got results from ' + date.toString())
      return result
    } else {
      const nextPreviousDate = subDays(date, 1)
      return getLastScoreboard(nextPreviousDate)
    }
  } catch (error) {
    console.log(`Error fetching nba scoreboard results:
    - url: ${url}
    - reason: ${error}`)
  }
}

const choseFeaturedGame = games => {
  // There are a lot of options for how to chose a game to feature:
  // - Closest game?
  // - Teams with the best records playing each other?
  // - Star power?

  // Over time, it might make sense to adjust this, but for now, the
  // game with the closest score seems to be something worth featuring.
  let closestIndex = 0
  let closestDiff = 1000
  for (let i = 0; i < games.length; i++) {
    const { hTeam, vTeam } = games[i]
    const gameDiff = Math.abs(hTeam.score - vTeam.score)
    if (gameDiff < closestDiff) {
      closestIndex = i
      closestDiff = gameDiff
    }
  }

  const featuredGameId = games[closestIndex].id

  // Now that we have the featured game, map through the array of games
  // and create a new array, this time with the featured flag
  return games.map(game => {
    return {
      ...game,
      featured: game.id === featuredGameId,
    }
  })
}

/**
 * Get results of past games and create a JSON object of what we are interested in.
 */
exports.getResults = async function() {
  try {
    const { data } = await getLastScoreboard(subDays(new Date(), 1))

    // Get the season year so we can get the right teams
    const seasonYear = data.games[0].seasonYear

    // Get the teams so that can get the full name instead of just a triCode
    const teams = await exports.getTeams(seasonYear)

    // Get the relevant data from the response
    const relevantData = data.games.map(game => {
      const { vTeam, hTeam, arena, startDateEastern, endTimeUTC } = game

      // Get the full team name for both home and visiting teams
      const { fullName: vTeamName } = teams.find(
        team => team.tricode === vTeam.triCode
      )
      const { fullName: hTeamName } = teams.find(
        team => team.tricode === hTeam.triCode
      )

      // Create a game object with what we are interested in
      return Object.assign({
        id: game.gameId,
        title: `${vTeamName} vs. ${hTeamName}`,
        summary: game.nugget.text,
        vTeam: Object.assign({}, vTeam, {
          fullName: vTeamName,
        }),
        hTeam: Object.assign({}, hTeam, {
          fullName: hTeamName,
        }),
        arena,
        startDateEastern,
        endTimeUTC,
      })
    })

    return choseFeaturedGame(relevantData)
  } catch (error) {
    console.log(`Error getting results: ${error}`)
    return []
  }
}

exports.getTeams = async function(seasonYear) {
  const url = `${nbaEndpoint}${seasonYear}/teams.json`
  try {
    const { data } = await axios.get(url)

    // Return all the teams in one flattened array
    return Object.values(data.league).reduce(
      (all, league) => all.concat(league),
      []
    )
  } catch (error) {
    console.log(`Error getting teams: ${error}`)
    return []
  }
}
