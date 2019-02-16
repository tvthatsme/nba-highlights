import styled from 'styled-components'

// Define an overlay to bring focus to the play button
export const PlayOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
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
export const Container = styled.div`
  position: relative;

  &:hover ${PlayOverlay} {
    opacity: 1;
  }
`
