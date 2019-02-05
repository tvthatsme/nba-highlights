import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { GlobalStyle } from '../theme/global-style.js'
import BackgroundImage from './background-image'

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <Background>
      <BackgroundImage />
    </Background>
    {children}
    <footer>
      <Footer>
        © {new Date().getFullYear()}, Built by{' '}
        <FooterLink href="https://tvernon.tech/">Timothy Vernon</FooterLink>
      </Footer>
    </footer>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

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
