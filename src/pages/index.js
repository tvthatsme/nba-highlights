import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import GameContainer from '../components/game-container'
import { H1 } from '../theme/elements.js'

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
                  triCode
                }
                hTeam {
                  score
                  triCode
                }
                highlights {
                  items {
                    id {
                      kind
                      videoId
                    }
                    snippet {
                      title
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
                  fixed(width: 320, height: 180, quality: 90) {
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        return (
          <>
            <H1>
              NBA Highlights{' '}
              <span style={{ display: 'block', fontSize: 16 }}>
                from January 23rd, 2019
              </span>
            </H1>
            {renderGameSections(data)}
          </>
        )
      }}
    />
  </Layout>
)

export default IndexPage
