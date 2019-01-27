import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { GlobalStyle } from '../theme/global-style.js'
import BackgroundImage from './background-image'

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 0.05;
`

const Footer = styled.p`
  text-align: center;
  margin-top: 64px;
`

const FooterLink = styled.a`
  color: #fff;

  &:visited {
    color: #fff;
  }
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <GlobalStyle />
        <Background>
          <BackgroundImage />
        </Background>
        {children}
        <footer>
          <Footer>
            © {new Date().getFullYear()}, Built by{' '}
            <FooterLink href="https://twitter.com/tvernon_tech">
              Timothy Vernon
            </FooterLink>
          </Footer>
        </footer>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
