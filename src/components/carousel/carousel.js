import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'

// components
import ChevronLeft from '../../icons/chevron-left.js'
import ChevronRight from '../../icons/chevron-right.js'
import useWindowSize from '../../hooks/useWindowSize.js'

// styled-components
import {
  Container,
  ControlArea,
  Button,
  CarouselArea,
  CarouselItem,
} from './styles.js'

// Animate the carousel area
const AnimatedCarousel = animated(CarouselArea)

const Carousel = ({ children }) => {
  const [offset, setOffset] = useState(0)
  let { width } = useWindowSize()

  // Define the number of slides and the width for each
  const slides = Math.floor(width / 300)
  const slideWidth = 100 / slides

  // Define the animation for the carousel
  const slideAnimation = useSpring({
    transform: `translateX(${(offset * -1 * width) / slides}px)`,
  })

  return (
    <Container>
      <ControlArea back>
        <Button onClick={() => setOffset(offset - 1)} disabled={offset === 0}>
          <ChevronLeft />
        </Button>
      </ControlArea>
      <AnimatedCarousel style={slideAnimation}>
        {children.map(child => (
          <CarouselItem
            key={`carousel-slide-${child.key}`}
            style={{ width: `${slideWidth}vw` }}
          >
            {child}
          </CarouselItem>
        ))}
      </AnimatedCarousel>
      <ControlArea forward>
        <Button
          onClick={() => setOffset(offset + 1)}
          disabled={offset === children.length - slides}
        >
          <ChevronRight />
        </Button>
      </ControlArea>
    </Container>
  )
}

export default Carousel
