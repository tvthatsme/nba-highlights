import React from 'react'
import Img from 'gatsby-image'

const GameContainer = ({ game, thumbnails }) => {
  return (
    <>
      <h2>{game.title}</h2>
      <p>{game.summary}</p>
      <div>
        {game.highlights.items.map(video => {
          const thumbnail = thumbnails.filter(thumbnail => {
            return thumbnail.node.childImageSharp.fixed.src.includes(
              video.id.videoId
            )
          })[0].node.childImageSharp.fixed

          return (
            <Img
              fixed={thumbnail}
              key={video.id.videoId}
              alt={video.snippet.description}
            />
          )
        })}
      </div>
    </>
  )
}

export default GameContainer
