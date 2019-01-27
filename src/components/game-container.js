import React from 'react'
import HighlightVideo from './highlight-video'
import styled from 'styled-components'

import { H2 } from '../theme/elements.js'

const HighlightRow = styled.div`
  display: flex;
  flex-direction: 'row';
  max-width: 100vw;
  overflow-x: scroll;
`

const Score = styled.p`
  text-align: center;
  margin: 0 0 16px;
`

const GameContainer = ({ game, thumbnails }) => {
  return (
    <>
      <H2>{game.title}</H2>
      <Score>
        {game.vTeam.triCode} {game.vTeam.score} - {game.hTeam.triCode}{' '}
        {game.hTeam.score}
      </Score>
      <HighlightRow>
        {game.highlights.items.map(video => {
          const thumbnail = thumbnails.filter(thumbnail => {
            return thumbnail.node.childImageSharp.fixed.src.includes(
              video.id.videoId
            )
          })[0].node.childImageSharp.fixed

          return (
            <HighlightVideo
              key={video.id.videoId}
              id={video.id.videoId}
              thumbnail={thumbnail}
              video={video}
            />
          )
        })}
      </HighlightRow>
    </>
  )
}

export default GameContainer
