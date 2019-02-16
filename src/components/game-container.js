import React from 'react'
import styled from 'styled-components'

import { H2 } from '../theme/elements.js'
import HighlightVideo from './highlight-video'
import Carousel from './carousel/carousel.js'

const GameContainer = ({ game, thumbnails }) => {
  return (
    <>
      <H2>{game.title}</H2>
      <Score>
        {game.vTeam.triCode} {game.vTeam.score} - {game.hTeam.triCode}{' '}
        {game.hTeam.score}
      </Score>
      <Carousel>
        {game.highlights.items.map(video => {
          const thumbnail = thumbnails.filter(thumbnail => {
            return thumbnail.node.childImageSharp.fluid.src.includes(
              video.id.videoId
            )
          })[0].node.childImageSharp.fluid

          return (
            <HighlightVideo
              key={video.id.videoId}
              id={video.id.videoId}
              thumbnail={thumbnail}
              video={video}
            />
          )
        })}
      </Carousel>
    </>
  )
}

export default GameContainer

const Score = styled.p`
  text-align: center;
  margin: 0 0 16px;
`
