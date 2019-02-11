import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import playIcon from '../images/icons/play-circle.svg'

/**
 * Render a thumbnail for the highlight video. When the area is hovered, show a
 * play button so the user has a better idea that there is a video to watch.
 *
 * @param {Object} props - The properties for the function
 * @param {childImageSharp.fixed} props.src - Image types for gatsby-image
 * @param {string} props.alt - Alternate text for thumbnail image
 */
const HighlightThumbnail = ({ src, alt }) => (
  <Thumbnail>
    <Img fixed={src} alt={alt} />
    <PlayOverlay>
      <img src={playIcon} alt="play video" width={50} />
    </PlayOverlay>
  </Thumbnail>
)

export default HighlightThumbnail

// Define an overlay to bring focus to the play button
const PlayOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 3px;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`

// Define the area for the thumbnail and overlay
const Thumbnail = styled.div`
  position: relative;
  min-width: 320px;

  &:hover ${PlayOverlay} {
    opacity: 1;
  }
`
