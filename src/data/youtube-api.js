const { google } = require('googleapis')
const fs = require('fs')

const devFilePath = 'src/data/youtube-data.json'
const key = require('./auth.json')
const scopes = 'https://www.googleapis.com/auth/youtube.readonly'
const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes)

exports.getVideos = async function({ query, publishedAfter, maxResults = 10 }) {
  if (process.env.NODE_ENV === 'development' && fs.existsSync(devFilePath)) {
    // In development mode, don't go to YouTube so that the query limit is saved
    // for actual production needs.
    // TODO: Figure out why the query numbers are way more than expected
    console.log('Fetching cached YouTube data for development')
    return JSON.parse(fs.readFileSync(devFilePath, 'utf8'))
  } else {
    try {
      const { data } = await google.youtube('v3').search.list({
        auth: jwt,
        q: query,
        maxResults,
        publishedAfter,
        part: 'snippet',
        type: 'video',
        videoEmbeddable: true,
        videoSyndicated: true, // not sure about this one but might need it
      })

      // If we are in development mode but there was no development file saved,
      // create one now for use later.
      if (process.env.NODE_ENV === 'development') {
        try {
          fs.writeFile(devFilePath, JSON.stringify(data), 'utf8', () => {
            console.log(`wrote data for development to ${devFilePath}`)
          })
        } catch (e) {
          console.warn(`there was a problem writing to the ${devFilePath}`)
        }
      }

      // TODO: Figure out what parts of the data we are interested in and return only that
      // console.log(data)
      return data
    } catch (e) {
      console.warn(
        'Unable to search YouTube. Maybe the rate limit was exceeded?'
      )
      return {}
    }
  }
}
