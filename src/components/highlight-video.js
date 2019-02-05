import React, { Component } from 'react'
import YouTube from 'react-youtube'
import styled from 'styled-components'
import Modal from 'react-modal'
import HighlightThumbnail from './highlight-thumbnail'
import { AriaOnlyH2 } from '../theme/aria.js'
import { trackEvent } from '../utilities/analytics.js'

class HighlightVideo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
    }
  }

  openVideoModal = () => {
    this.setState({ modalIsOpen: true })
    trackEvent({ category: 'video', action: 'start', label: this.props.id })
  }

  closeModal = e => {
    e.stopPropagation()
    this.setState({ modalIsOpen: false })
    trackEvent({ category: 'video', action: 'stop', label: this.props.id })
  }

  componentDidMount() {
    Modal.setAppElement('#___gatsby')
  }

  render() {
    return (
      <HighlightCard onClick={this.openVideoModal}>
        <HighlightThumbnail
          src={this.props.thumbnail}
          alt={this.props.video.snippet.title}
        />
        <Description>
          {this.props.video.snippet.title.split('|')[0].trim()}
        </Description>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Highlight Video Modal"
          shouldCloseOnOverlayClick={true}
        >
          <AriaOnlyH2>{this.props.video.snippet.title}</AriaOnlyH2>
          <YouTube videoId={this.props.id} opts={youtubeOptions} />
        </Modal>
      </HighlightCard>
    )
  }
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
  background-color: #111;
  margin: 0 8px;
  padding: 8px 8px 16px;
`

const Description = styled.p`
  text-align: center;
  margin: 16px 0 0;
  padding: 0 24px;
`
