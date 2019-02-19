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

/**
 * Get results of past games and create a JSON object of what we are interested in.
 */
exports.getResults = async function() {
  try {
    const { data } = await getLastScoreboard(new Date())
    // TODO: The year won't always be 2018 but 2019 doesn't start until summer league?
    const seasonYear = data.games.length ? data.games[0].seasonYear : '2018'
    const teams = await exports.getTeams(seasonYear)

    // Get the relevant data from the response
    const relevantData = data.games.map(game => {
      const { vTeam, hTeam, arena, startTimeUTC, endTimeUTC } = game

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
        startTimeUTC,
        endTimeUTC,
      })
    })

    return relevantData
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
