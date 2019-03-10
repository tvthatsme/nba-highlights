import React from 'react'

// components
import { H2 } from '../../theme/elements.js'
import Video from '../video/video.js'
import Carousel from '../carousel/carousel.js'

// styled-components
import { Score } from './styles.js'

const GameContainer = ({ game }) => {
  // TODO: Not all sports might have triCodes for the teams. In the future it
  // would be good to see if we can figure out a generic way to save this
  // data.
  return (
    <>
      <H2>{game.title}</H2>
      <Score>
        {game.vTeam.triCode} {game.vTeam.score} - {game.hTeam.triCode}{' '}
        {game.hTeam.score}
      </Score>
      <Carousel>
        {game.childrenHighlight.map(video => {
          return (
            <Video
              key={video.id}
              id={video.id}
              thumbnail={video.childrenFile[0].childImageSharp.fluid}
              video={video}
            />
          )
        })}
      </Carousel>
    </>
  )
}

export default GameContainer
