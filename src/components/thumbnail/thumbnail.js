import React from 'react'
import Img from 'gatsby-image'

// components
import PlayCircle from '../../icons/play-circle.js'

// styled-components
import { Container, PlayOverlay } from './styles.js'

/**
 * Render a thumbnail for the highlight video. When the area is hovered, show a
 * play button so the user has a better idea that there is a video to watch.
 *
 * @param {Object} props - The properties for the function
 * @param {childImageSharp.fluid} props.src - Image types for gatsby-image
 * @param {string} props.alt - Alternate text for thumbnail image
 */
const Thumbnail = ({ src, alt }) => (
  <Container>
    <Img fluid={src} alt={alt} />
    <PlayOverlay>
      <PlayCircle width="50" height="50" />
    </PlayOverlay>
  </Container>
)

export default Thumbnail
