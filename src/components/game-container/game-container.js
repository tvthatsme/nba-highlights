import React from 'react'

// components
import { H2 } from '../../theme/elements.js'
import Video from '../video/video.js'
import Carousel from '../carousel/carousel.js'

// styled-components
import { Score } from './styles.js'

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
            <Video
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
