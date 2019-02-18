module.exports = {
  siteMetadata: {
    title: `All The Highlights`,
    description: `Watch all of yesterday's NBA highlights in one place`,
    author: `@tvernon_tech`,
    url: `https://allthehighlights.com`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `All The Highlights`,
        short_name: `All The Highlights`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/favicon.png`,
        include_favicon: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-133543876-1`,
        head: false,
      },
    },
  ],
}
