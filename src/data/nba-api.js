const axios = require('axios')

// Define the endpoint for obtaining nba data
const nbaEndpoint = 'http://data.nba.net/10s/prod/v1/'

/**
 * Get results of past games and create a JSON object of what we are interested in.
 */
exports.getResults = async function(date = dateString) {
  const url = `${nbaEndpoint}${date}/scoreboard.json`
  try {
    const { data } = await axios.get(url)
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

    // Only return the franchise teams (not world teams, all-star, etc.)
    return data.league.standard.filter(team => team.isNBAFranchise)
  } catch (error) {
    console.log(`Error getting teams: ${error}`)
    return []
  }
}
