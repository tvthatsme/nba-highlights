import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const BackgroundImage = () => (
  <StaticQuery
    query={graphql`
      query {
        backgroundImage: file(relativePath: { eq: "swish.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 1400, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => <Img fluid={data.backgroundImage.childImageSharp.fluid} />}
  />
)

export default BackgroundImage
