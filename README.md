# All The Highlights

*Catch up on all the action around the league in one place. Scores and full-game highlights from last night's games compiled for you daily.* 

Live at [allthehighlights.com](https://allthehighlights.com)

## Motivation

I live in a timezone where NBA games often happen in the middle of the night. In order to keep up with the games, I enjoy watching full-game highlights and other highlight clips on the internet. However, I haven't been able to find anywhere online that has both highlights and scores of all the games together in a nice, explorable format. This project is my attempt to "scratch my own itch" while experimenting with different JavaScript libraries and features.

## Sourcing data

Data for the website comes from different places. The first step is to fetch the latest scores and results from the previous night's games. Then, using that scoreboard data, highlights are queried from YouTube with [Google's API client for Node](https://github.com/googleapis/google-api-nodejs-client). There is some local caching performed in development setups in order to keep the API request quota as low as possible. All of the JavaScript associated with fetching data from external sources lives in the [/src/data/](./src/data/) directory.

Once all this game and highlight data is successfully fetched, all the json data is run through Gatsby and transformed into GraphQL nodes for page queries. You can dig through the [gatsby-node.js](./gatsby-node.js) file for more details on this.

## Building

The site hosted on Netlify and is built 3 times daily: at 7am, 9am, and 12 noon CEST in order to catch the best recent highlight videos from the games. Builds are triggered automatically through Zapier. You can read more about automating the build process in [this article I wrote](https://tvernon.tech/blog/automating-netlify-deployments).

## Performance

The performance of this site is something that is very important to me. With as many as ten or more games a night, the images and videos per page can quickly bring the browser to a standstill if not loaded in properly. At the time of this writing, the [lighthouse](https://developers.google.com/web/tools/lighthouse/) audit of this site shows performance metrics of 96%. The goal for future development is to keep performance metrics as high as possible in order to provide the best user experience for the site's visitors.

There are a couple of key-contributors to keeping this site fast:
- Using [gatsby](https://www.gatsbyjs.org/) to generate a static site.
- Using [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/) to optimize images and use smaller, "blurred" images as placeholders until the actual image asset loads.
- Loading the YouTube iFrame player on demand only when the user clicks to watch a video.

## Contributing

Contributions of any size are very welcome! While I consider this a personal project and am interested mainly in NBA highlights, I would like to see this grow into a platform where other sports highlights can be consumed.

## Roadmap

This project is live now, but is in no way complete. There are a lot of things that I'd like to add or improve:

- [ ] Add tests.
- [ ] Figure out a better way to play YouTube videos so that the player will accept changes to the quality setting (or, just start playing on the highest quality available).
- [ ] Make it easy to generate pages by sport. There is currently some NBA specific content that would be better generated in the [nba-api file](/src/data/nba-api.js).
- [ ] After more sports are added, turn the `index.js` page file into more of a landing page with featured content from each sport supported.
- [ ] Continue refining the GraphQL schema generation so that we can filter on highlights of games (e.g. `limit`).
- [ ] Improve on the design and fonts.

## License

MIT
