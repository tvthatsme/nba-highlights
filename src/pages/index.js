import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout/layout.js'
import SEO from '../components/seo'
import GameContainer from '../components/game-container/game-container.js'
import { H1 } from '../theme/elements.js'
import { formatDate } from '../utilities/date.js'

const getHighlightThumbnails = (game, images) => {
  return game.highlights.items.reduce((thumbnails, highlight) => {
    return thumbnails.concat(
      images.filter(image => {
        if (!image.node.childImageSharp) {
          return false
        } else {
          return image.node.childImageSharp.fluid.src.includes(
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
      {data.allNba.edges.map(game => {
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

const IndexPage = () => {
  const data = useStaticQuery(pageQuery)
  return (
    <Layout>
      <SEO title="Home" keywords={[`nba`, `highlights`, `full game`]} />
      <H1>
        All The NBA Highlights{' '}
        <SubTitle>
          from {formatDate(data.allNba.edges[0].node.startDateEastern)}
        </SubTitle>
      </H1>
      <Tagline>
        Catch up on all the action around the league in one place. Scores and
        full-game highlights from last night's games compiled for you daily.
      </Tagline>
      {renderGameSections(data)}
    </Layout>
  )
}

export default IndexPage

const pageQuery = graphql`
  query indexPageQuery {
    allNba {
      edges {
        node {
          id
          title
          startDateEastern
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
                videoId
              }
              snippet {
                title
              }
            }
          }
        }
      }
    }
    allFile(filter: { relativePath: { regex: "/highlight-thumbnails/" } }) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 500, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`

const SubTitle = styled.span`
  display: block;
  font-size: 16px;
  margin-top: 16px;
  font-weight: 200;
`

const Tagline = styled.p`
  text-align: center;
  font-size: 24px;
  font-weight: 200;
  margin: 0 auto;
  max-width: 732px;
  padding: 0 16px;
  font-style: italic;
`
