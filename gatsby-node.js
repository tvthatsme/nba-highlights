const crypto = require('crypto')
const { getNBAHighlights } = require('./src/data/index.js')

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions
  const nbaHighlights = await getNBAHighlights()

  // map into these results and create nodes
  nbaHighlights.map(game => {
    // Create your node object
    const gameNode = Object.assign({}, game, {
      // Required fields
      parent: `__SOURCE__`,
      internal: {
        type: `GameHighlights`, // name of the graphQL query --> allGameHighlights {}
        // contentDigest will be added just after but it is required
      },
      children: [],
    })

    // Get content digest of node. (Required field)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(gameNode))
      .digest(`hex`)

    // add it to userNode
    gameNode.internal.contentDigest = contentDigest

    // Create node with the gatsby createNode() API
    createNode(gameNode)
  })

  return
}
