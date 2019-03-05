const crypto = require('crypto')
const { getNBAHighlights } = require('./src/data/index.js')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

/**
 * Create a content digest to be used in a new node creation
 */
const createContentDigest = obj =>
  crypto
    .createHash(`md5`)
    .update(JSON.stringify(obj))
    .digest(`hex`)

/**
 * Helper function for creating a new node
 */
const makeNewNode = async ({ createNode, node, type, description }) => {
  const newNode = Object.assign({}, node, {
    parent: null,
    children: [],
    internal: {
      type,
      ...(description && { description }),
    },
  })

  newNode.internal.contentDigest = createContentDigest(newNode)

  // Wait for the node to be created before returning
  await createNode(newNode)

  return newNode
}

/**
 * Set the data for Gatsby
 * https://www.gatsbyjs.org/docs/node-apis/#sourceNodes
 */
exports.sourceNodes = async ({ actions }) => {
  const { createNode, createParentChildLink } = actions
  const nbaHighlights = await getNBAHighlights()

  // Create nodes for each item in nba highlights
  nbaHighlights.forEach(async node => {
    const gameNode = await makeNewNode({
      createNode,
      node,
      type: 'nba',
      description: 'nba game data and highlights',
    })

    node.highlights.items.forEach(async highlight => {
      const highlightNode = await makeNewNode({
        createNode,
        node: {
          ...highlight,
          id: highlight.id.videoId,
        },
        type: 'highlight',
        description: 'video highlight of sports game',
      })

      createParentChildLink({
        parent: gameNode,
        child: highlightNode,
      })
    })
  })
}

/**
 * Check for a video/highlight node and create remote file node for
 * the video thumbnail
 */
exports.onCreateNode = async ({ node, actions, store, cache }) => {
  const { createNode, createParentChildLink } = actions

  if (node.internal.type === 'highlight') {
    const localImageNode = await createRemoteFileNode({
      url: node.snippet.thumbnails.medium.url,
      store,
      cache,
      createNode,
      createNodeId: () => `highlight-${node.id}`,
    })

    createParentChildLink({
      parent: node,
      child: localImageNode,
      internal: {
        type: `highlightThumbnail`,
      },
    })
  }
}
