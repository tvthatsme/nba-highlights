import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout/layout.js'
import SEO from '../components/seo'
import GameContainer from '../components/game-container/game-container.js'
import { H1 } from '../theme/elements.js'
import { formatDate } from '../utilities/date.js'

const IndexPage = () => {
  const data = useStaticQuery(pageQuery)
  const image =
    data.featured.edges[0].node.childrenHighlight[0].snippet.thumbnails.medium
      .url
  return (
    <Layout>
      <SEO
        title="NBA"
        keywords={[`nba`, `highlights`, `full game`]}
        image={image}
      />
      <H1>
        All The NBA Highlights{' '}
        <SubTitle>
          from {formatDate(data.games.edges[0].node.startDateEastern)}
        </SubTitle>
      </H1>
      <Tagline>
        Catch up on all the action around the league in one place. Scores and
        full-game highlights from last night's games compiled for you daily.
      </Tagline>
      {data.games.edges.map(game => {
        return <GameContainer key={game.node.id} game={game.node} />
      })}
    </Layout>
  )
}

export default IndexPage

const pageQuery = graphql`
  query indexPageQuery {
    # Get the featured nba game
    featured: allGame(
      filter: { featured: { eq: true }, sport: { eq: "nba" } }
    ) {
      edges {
        node {
          id
          childrenHighlight {
            snippet {
              thumbnails {
                medium {
                  url
                }
              }
            }
          }
        }
      }
    }
    # Get all the nba games
    games: allGame(filter: { sport: { eq: "nba" } }) {
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
          childrenHighlight {
            id
            snippet {
              title
            }
            childrenFile {
              id
              childImageSharp {
                fluid(maxWidth: 500, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
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
