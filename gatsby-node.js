const crypto = require('crypto')
const { getNBAHighlights } = require('./src/data/index.js')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const createContentDigest = obj =>
  crypto
    .createHash(`md5`)
    .update(JSON.stringify(obj))
    .digest(`hex`)

// Create the node object
// https://www.gatsbyjs.org/docs/actions/#createNode
const assembleNode = async ({
  createNode,
  createParentChildLink,
  node,
  type,
}) => {
  // Normal things
  const newNode = Object.assign({}, node, {
    parent: null,
    children: [],
    internal: {
      type, // name of the graphQL query
      // contentDigest will be added just after but it is required
    },
  })

  // add it to userNode
  newNode.internal.contentDigest = createContentDigest(newNode)

  await createNode(newNode)

  // Special recursion to look for highlights
  if (node.highlights) {
    const childNode = await assembleNode({
      createNode,
      createParentChildLink,
      node: Object.assign({}, node.highlights, { id: node.highlights.etag }),
      type: 'video',
    })

    createParentChildLink({ parent: newNode, child: childNode })
  }

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
  nbaHighlights.forEach(node => {
    assembleNode({ createNode, createParentChildLink, node, type: 'nba' })
  })
}

exports.onCreateNode = async ({ node, boundActionCreators, store, cache }) => {
  const {
    createNode,
    createNodeField,
    createParentChildLink,
  } = boundActionCreators

  // console.log(node)

  // we want this to look for
  // if (node.internal.type === 'video') {
  if (node.highlights) {
    // if (node.video) {
    await Promise.all(
      node.highlights.items.map(async video => {
        const localImageNode = await createRemoteFileNode({
          url: video.snippet.thumbnails.medium.url,
          store,
          cache,
          createNode,
          createNodeId: () => `highlight-${video.id.videoId}`,
        })

        createParentChildLink({
          parent: node,
          child: localImageNode,
          internal: {
            type: `highlightThumbnail`,
          },
        })
      })
    )
  }
}

// const createLocalImageNode = async ({
//   url,
//   parent,
//   store,
//   cache,
//   createNode,
// }) => {
//   const fileNode = await createRemoteFileNode({
//     url,
//     store,
//     cache,
//     createNode,
//   })

//   const localImageNode = {
//     id: `${parent} >>> LocalImage`,
//     url,
//     // expires: screenshotResponse.data.expires,
//     parent,
//     children: [],
//     internal: {
//       type: `LocalImage`,
//     },
//     localImageFile___NODE: fileNode.id,
//   }

//   localImageNode.internal.contentDigest = createContentDigest(localImageNode)

//   createNode(localImageNode)

//   return localImageNode
// }

// This was working on monday night
// {
//   nbaGames: allNba(limit: 1) {
//     edges {
//       node {
//         id
//         childrenVideo {
//           id
//           items {
//             id {
//               kind
//               videoId
//             }
//           }
//           childrenFile {
//             id
//             childImageSharp {
//               id
//               fluid {
//                 base64
//               }
//             }
//           }
//         }
//       }
//     }
//   }
}
