import React, { useState } from 'react'
import YouTube from 'react-youtube'
import styled from 'styled-components'
import Modal from 'react-modal'
import HighlightThumbnail from './highlight-thumbnail'
import { AriaOnlyH2 } from '../theme/aria.js'
import { trackEvent } from '../utilities/analytics.js'

Modal.setAppElement('#___gatsby')

const HighlightVideo = ({ id, thumbnail, video }) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const openVideoModal = () => {
    setModalOpen(true)
    document.body.style.overflow = 'hidden'
    trackEvent({ category: 'video', action: 'start', label: id })
  }

  const closeModal = e => {
    e.stopPropagation()
    setModalOpen(false)
    document.body.style.overflow = 'visible'
    trackEvent({ category: 'video', action: 'stop', label: id })
  }

  return (
    <HighlightCard onClick={openVideoModal}>
      <HighlightThumbnail src={thumbnail} alt={video.snippet.title} />
      <Description>{video.snippet.title.split('|')[0].trim()}</Description>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Highlight Video Modal"
        shouldCloseOnOverlayClick={true}
      >
        <AriaOnlyH2>{video.snippet.title}</AriaOnlyH2>
        <VideoWrapper>
          <YouTube videoId={id} opts={youtubeOptions} />
        </VideoWrapper>
      </Modal>
    </HighlightCard>
  )
}

export default HighlightVideo

// Define options for the YouTube video player
// https://developers.google.com/youtube/player_parameters
const youtubeOptions = {
  playerVars: {
    autoplay: 1,
    controls: 1,
    modestbranding: 1,
  },
}

// Define styles for the modal overlay and content
const customStyles = {
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

const HighlightCard = styled.div`
  width: calc(100% - 32px);
  height: 100%;
  margin: 0 auto;
  padding: 0 16px 16px;
`

const Description = styled.p`
  text-align: left;
  margin: 16px 0 0;
  padding: 0;
`

const VideoWrapper = styled.div`
  iframe {
    max-width: 100vw;
  }
`
