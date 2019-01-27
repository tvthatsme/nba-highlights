import React, { Component } from 'react'
import Img from 'gatsby-image'
import YouTube from 'react-youtube'
import styled from 'styled-components'

const HighlightCard = styled.div`
  background-color: #111;
  margin: 0 8px;
  padding: 8px 8px 16px;

  &:hover {
    cursor: pointer;
  }
`

const Description = styled.p`
  text-align: center;
  margin: 16px 0 0;
  padding: 0 24px;
`

class HighlightVideo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      video: false,
    }
  }

  handleClick = () => {
    this.setState({
      video: true,
    })
  }

  opts = {
    height: '180',
    width: '320',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  render() {
    return (
      <HighlightCard onClick={this.handleClick}>
        {!this.state.video && (
          <Img
            fixed={this.props.thumbnail}
            alt={this.props.video.snippet.title}
          />
        )}
        {this.state.video && (
          <YouTube videoId={this.props.id} opts={this.opts} />
        )}
        <Description>
          {this.props.video.snippet.title.split('|')[0].trim()}
        </Description>
      </HighlightCard>
    )
  }
}

export default HighlightVideo
