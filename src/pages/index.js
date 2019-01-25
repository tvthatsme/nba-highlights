import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import GameContainer from '../components/game-container'

const getHighlightThumbnails = (game, images) => {
  return game.highlights.items.reduce((thumbnails, highlight) => {
    return thumbnails.concat(
      images.filter(image => {
        if (!image.node.childImageSharp) {
          return false
        } else {
          return image.node.childImageSharp.fixed.src.includes(
            highlight.id.videoId
          )
        }
      })
    )
  }, [])
}

const renderGameSections = data => {
  return (
    <>
      {data.allGameHighlights.edges.map(game => {
        const thumbnails = getHighlightThumbnails(game.node, data.allFile.edges)
        return (
          <GameContainer
            key={game.node.id}
            game={game.node}
            thumbnails={thumbnails}
          />
        )
      })}
    </>
  )
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <StaticQuery
      query={graphql`
        query pagesAllGameHighlightsQuery {
          allGameHighlights {
            edges {
              node {
                id
                title
                summary
                vTeam {
                  score
                }
                hTeam {
                  score
                }
                highlights {
                  items {
                    id {
                      kind
                      videoId
                    }
                    snippet {
                      description
                      thumbnails {
                        medium {
                          url
                          width
                          height
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          allFile(
            filter: { relativePath: { regex: "/highlight-thumbnails/" } }
          ) {
            edges {
              node {
                childImageSharp {
                  fixed(width: 320, height: 180, quality: 80) {
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              }
            }
          }
        }
      `}
      render={data => renderGameSections(data)}
    />
  </Layout>
)

export default IndexPage
