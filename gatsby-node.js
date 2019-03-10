const crypto = require('crypto')
const path = require('path')
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

  // TODO: Refactor this section to be less about nba highlights
  // and more generic for an array of sport types.
  nbaHighlights.forEach(async node => {
    const gameNode = await makeNewNode({
      createNode,
      node: {
        ...node,
        highlights: null,
        sport: 'nba',
      },
      type: 'Game',
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

/**
 * Create a page for highlights by sport
 */
exports.createPages = ({ actions }) => {
  const template = path.resolve(`src/templates/highlights-by-sport.js`)
  const sports = ['nba']

  // For now we only have one sport with highlights, so having index plus
  // a named page is overkill. But in the future, the index page will be
  // more of an overview and we will want to generate a seperate page per
  // sport.
  if (sports.length > 1) {
    sports.forEach(sport => {
      actions.createPage({
        path: `/${sport}`,
        component: template,
        context: {
          sport,
        },
      })
    })
  }
}
