import React, { useState } from 'react'
import YouTube from 'react-youtube'
import Modal from 'react-modal'

// components
import Thumbnail from '../thumbnail/thumbnail.js'
import { AriaOnlyH2 } from '../../theme/aria.js'
import { trackEvent } from '../../utilities/analytics.js'

// styled-components
import {
  ModalStyles,
  HighlightCard,
  Description,
  VideoWrapper,
} from './styles.js'

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
      <Thumbnail src={thumbnail} alt={video.snippet.title} />
      <Description>{video.snippet.title.split('|')[0].trim()}</Description>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={ModalStyles}
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
