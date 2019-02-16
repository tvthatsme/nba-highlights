import styled from 'styled-components'

// Define styles for the modal overlay and content
export const ModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#000',
    border: 'none',
  },
}

export const HighlightCard = styled.div`
  width: calc(100% - 32px);
  height: 100%;
  margin: 0 auto;
  padding: 0 16px 16px;
`

export const Description = styled.p`
  text-align: left;
  margin: 16px 0 0;
  padding: 0;
`

export const VideoWrapper = styled.div`
  iframe {
    max-width: 100vw;
  }
`
