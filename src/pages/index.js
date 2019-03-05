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
      {data.allNba.edges.map(game => {
        return <GameContainer key={game.node.id} game={game.node} />
      })}
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
